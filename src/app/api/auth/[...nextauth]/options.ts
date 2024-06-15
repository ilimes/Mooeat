import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { type DefaultSession, type DefaultUser } from 'next-auth';

// 타입 확장 선언
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      info: any;
    };
  }
  interface User extends DefaultUser {
    data: any;
    userInfo: any;
  }
}

const nextAuthUrl = process.env.NEXTAUTH_URL as string;

// NextAuth 옵션 지정 객체
export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `${nextAuthUrl.startsWith('https://') ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        domain:
          new URL(nextAuthUrl).hostname === 'localhost'
            ? 'localhost'
            : `.${new URL(nextAuthUrl).hostname}`,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: nextAuthUrl.startsWith('https://'),
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        user_id: { label: '이메일', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        let msg = null;
        try {
          const result = await login(credentials);
          console.log('로그인 시도');
          if (result?.data?.success) {
            console.log('로그인 성공');
            return result;
          }
          msg = result?.data?.message || '에러';
          throw new Error(msg || '에러');
        } catch (error) {
          throw new Error(msg || '에러');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const token = user?.data?.token;
        const type = user?.id ? 'oAuth' : undefined;
        const formData: any = { token, type, user: type ? user : undefined };
        const result = await getUser(formData);
        console.log('정보얻기 시도');
        if (result?.data?.success) {
          console.log('정보얻기 성공');
          user.userInfo = result?.data?.user_info;
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async redirect({ url }) {
      return url;
    },
    async jwt({ token, user, profile }) {
      if (user) {
        token.user = user;
      }
      const newProfile: any = { ...profile };
      if (newProfile?.kakao_account) {
        const result = await login({ user_id: newProfile?.id, password: '' }, true, user?.userInfo);
        token.user = { ...user, data: { token: `${result?.data?.token}` } };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.info = token?.user;
      console.log('session', session);
      return session;
    },
  },
};

// 유저 정보 가져오는 함수
const getUser = async (formData: any) => {
  const res = await fetch(`${nextAuthUrl}/api/userInfo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${formData?.token}`, // Bearer 토큰 사용
    },
    body: JSON.stringify(formData),
  });
  const result = await res.json();
  return result;
};

// 로그인 함수
const login = async (
  credentials: Record<'user_id' | 'password', string> | undefined,
  isOauth?: boolean,
  oauthInfo?: any,
) => {
  const res = await fetch(`${nextAuthUrl}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      user_id: credentials?.user_id,
      password: credentials?.password,
      isOauth,
      oauthInfo,
    }),
  });
  const result = await res.json();
  return result;
};
