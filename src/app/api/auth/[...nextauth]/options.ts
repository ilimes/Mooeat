import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { type DefaultSession, type DefaultUser } from 'next-auth';
import { loginApi } from '../../../../../api/Api';

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

// NextAuth 옵션 지정 객체
export const options: NextAuthOptions = {
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
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        user_id: {
          label: '이메일',
          type: 'text',
        },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(credentials, req) {
        let msg = null;
        try {
          console.log('로그인', credentials);
          const result = await login(credentials);
          if (result?.data?.success) {
            // Any object returned will be saved in `user` property of the JWT
            return result;
          }

          msg = result?.data?.message || '에러';
          throw new Error(msg || '에러');
          // return null
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
        // // 데이터베이스에 유저가 있는지 확인
        const token = user?.data?.token;
        const type = user?.id ? 'oAuth' : undefined;
        const formData: any = {
          token,
          type,
        };
        if (type) {
          formData.user = user;
        }
        // TODO: axios
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
      return Promise.resolve(url);
    },
    /**
     * JWT Callback
     * 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
     * 반환된 값은 암호화되어 쿠키에 저장됨
     */
    async jwt({ token, user, trigger, account, profile, isNewUser }) {
      // 초기 로그인 시 user 정보 가공하여 변환함
      if (user) {
        token.user = user;
      }
      const newProfile: any = { ...profile };
      if (newProfile?.kakao_account) {
        const result = await login(
          { user_id: newProfile?.id, password: null },
          true,
          user?.userInfo,
        );
        token.user = { ...user, data: { token: result?.data?.token } };
      }
      return token;
    },
    /**
     * Session Callback
     * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
     * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
     * JWT 토큰의 정보를 Session에 유지 시킨다.
     */
    async session({ session, trigger, user, token }) {
      session.user.info = token?.user;
      return session;
    },
  },
};

const getUser = async (formData: any) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/userInfo`, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  const result = await res.json();
  return result;
};

const login = async (
  credentials: Record<'user_id' | 'password', string> | undefined | any,
  isOauth?: any,
  oauthInfo?: any,
) => {
  // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     user_id: credentials?.user_id,
  //     password: credentials?.password,
  //     isOauth,
  //     oauthInfo,
  //   }),
  // });
  // const result = await res.json();
  const formData = {
    user_id: credentials?.user_id,
    password: credentials?.password,
    isOauth,
    oauthInfo,
  };
  const result = await loginApi(formData);
  console.log('result-api', result);
  return result;
};
