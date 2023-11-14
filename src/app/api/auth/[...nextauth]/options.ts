import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'

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

export const options: NextAuthOptions = {
    providers: [
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
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
                const res = await fetch(
                    `${process.env.NEXTAUTH_URL}/api/userInfo`,
                    {
                        method: 'POST',
                        body: JSON.stringify(token)
                    }
                );
                const result = await res.json();
                if (result?.data?.success) {
                    user.userInfo = result?.data?.user_info;
                }

                return true;
            } catch (error) {
                console.log("로그인 도중 에러가 발생했습니다. " + error);
                return false;
            }
        },
        async redirect({ url, baseUrl }) {
            return Promise.resolve(url);
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, user, token }) {
            session.user.token = token?.user;
            session.user.userInfo = token?.userInfo;
            return session;
        },
    },
}