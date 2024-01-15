import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'

import {
    type DefaultSession,
    type DefaultUser,
} from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            token: string | any;
            userInfo: any;
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
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
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
                    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
                    // const res = await fetch(`/api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: credentials?.user_id,
                            password: credentials?.password,
                        }),
                    })
                    const user = await res.json()
    
                    if (user?.data?.success) {
                        // Any object returned will be saved in `user` property of the JWT
                        return user
                    } 
                    else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        msg = user?.data?.message || '에러';
                        throw new Error(msg || '에러')
                        // return null
                        
                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    } 
                } catch (error) {
                    throw new Error(msg || '에러')
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async signIn({ user, profile }) {
            try {
                // // 데이터베이스에 유저가 있는지 확인
                const token = user?.data?.token;
                const type = user?.id ? 'oAuth' : undefined;
                let formData: any = {
                    token,
                    type
                }
                if (type) {
                    formData.user = user;
                }
                // TODO: axios
                const res = await fetch(
                    `${process.env.NEXTAUTH_URL}/api/userInfo`,
                    {
                        method: 'POST',
                        body: JSON.stringify(formData)
                    }
                );
                const result = await res.json();
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
        async jwt({ token, user, account, profile, isNewUser }) {
            // 초기 로그인 시 user 정보 가공하여 변환함
            if (user) {
                token.user = user;
            }
            return token;
        },
        /**
         * Session Callback
         * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
         * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
         * JWT 토큰의 정보를 Session에 유지 시킨다.
         */
        async session({ session, user, token }) {
            session.user.token = token?.user;
            session.user.userInfo = token?.userInfo;
            return session;
        },
    },
}