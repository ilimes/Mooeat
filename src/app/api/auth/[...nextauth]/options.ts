import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { type DefaultSession, type DefaultUser } from 'next-auth';
import axios from 'axios';
import { stringify } from 'flatted';
import axiosInstance from '@/utils/axiosInstance';

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

const nextAuthUrl: any = process.env.NEXTAUTH_URL;

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
        user_id: {
          label: '이메일',
          type: 'text',
        },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials, req): Promise<any> {
        let msg = null;
        try {
          const result = await login(credentials);
          if (result?.data?.success) {
            return JSON.parse(stringify(result));
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
    async signIn({ user, profile }) {
      try {
        const token = user?.data?.token;
        const type = user?.id ? 'oAuth' : undefined;
        const formData: any = { token, type };
        if (type) {
          formData.user = user;
        }
        const result = await getUser(formData);
        if (result?.data?.success) {
          user.userInfo = result?.data?.user_info;
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
    async jwt({ token, user, trigger, account, profile, isNewUser }) {
      if (user) {
        // user 객체에서 필요한 정보만 선택하여 저장
        token.user = {
          data: user.data,
          userInfo: user.userInfo,
        };
      }
      const newProfile: any = { ...profile };
      if (newProfile?.kakao_account) {
        const result = await login(
          { user_id: newProfile?.id, password: null },
          true,
          user?.userInfo,
        );
        token.user = {
          data: { token: result?.data?.token },
          userInfo: user.userInfo,
        };
      }
      return token;
    },
    async session({ session, trigger, user, token }) {
      session.user.info = token?.user;
      return session;
    },
  },
};

const getUser = async (formData: any) =>
  axios
    .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/info`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: formData?.token,
      },
    })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });

const login = async (
  credentials: Record<'user_id' | 'password', string> | undefined | any,
  isOauth?: any,
  oauthInfo?: any,
) =>
  axiosInstance
    .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/login`, {
      user_id: credentials?.user_id,
      password: credentials?.password,
      isOauth,
      oauthInfo,
    })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw err;
    });
