import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { type DefaultSession, type DefaultUser } from 'next-auth';
import axios from 'axios';
import https from 'https';

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
          new URL(nextAuthUrl).hostname === '127.0.0.1'
            ? '127.0.0.1'
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
          if (result?.data?.success) {
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
    async signIn({ user, account, profile }) {
      try {
        const token = user?.data?.token;
        const type = user?.id ? 'oAuth' : undefined;
        const formData: any = { token, type, user: type ? user : undefined };
        const result = await getUser(formData);
        if (result?.data?.success) {
          user.userInfo = result?.data?.user_info;
          return true;
        }
        return false;
      } catch (error) {
        console.error('signIn 콜백 에러:', error);
        return false;
      }
    },
    async redirect({ url }) {
      return url;
    },
    async jwt({ token, user, profile }) {
      const newProfile: any = { ...profile };
      const oAuthType = newProfile?.id ? 'kakao' : newProfile?.sub ? 'google' : undefined;

      if (user) {
        token.user = user;
      }
      if (oAuthType) {
        const result = await login(
          { user_id: newProfile.id ?? newProfile?.sub, password: '' },
          true,
          user?.userInfo,
        );
        token.user = { ...user, data: { token: `${result?.data?.token}`, type: oAuthType } };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.info = token?.user;
      return session;
    },
  },
};

// 유저 정보 가져오는 함수
const getUser = async (formData: any) => {
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // 이 옵션은 보안상 좋지 않으므로 테스트 용도로만 사용
    });

    const res = await axios.post(`${nextAuthUrl}/api/userInfo`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${formData?.token}`, // Bearer 토큰 사용
      },
      httpsAgent,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `getUser 요청 실패: ${error.response.status} ${error.response.statusText}, 응답 내용: ${error.response.data}`,
      );
      throw new Error(`getUser 요청 실패: ${error.response.status} ${error.response.statusText}`);
    }
    console.error('getUser 에러:', error);
    throw error;
  }
};

// 로그인 함수
const login = async (
  credentials: Record<'user_id' | 'password', string> | undefined,
  isOauth?: boolean,
  oauthInfo?: any,
) => {
  try {
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

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`login 요청 실패: ${res.status} ${res.statusText}, 응답 내용: ${errorText}`);
      throw new Error(`login 요청 실패: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('login 에러:', error);
    throw error;
  }
};
