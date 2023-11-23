/* middleware.ts */
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

const withAuthList = ["/friends", "/share", "/myPage", "/service"]
const withOutAuthList = ["/auth/login", "/auth/login/email", "/auth/join", "/auth/join/email"]

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret, raw: true })
  const pathname = req.nextUrl.pathname;

  const isWithAuth = withAuthList.includes(pathname);
  const isWithOutAuth = withOutAuthList.includes(pathname);

  const isPersonal = req.nextUrl.searchParams.get('page') === 'personal';

  const goLogin = NextResponse.redirect(new URL('/auth/login/?required=true', req.url));
  const goHome = NextResponse.redirect(new URL('/', req.url));

  if (isWithAuth) {
    if (pathname === '/service') {
      if (!session && isPersonal) {
        return goLogin;
      }
    } else {
      if (!session) {
        return goLogin;
      }
    }
  }

  if (isWithOutAuth) {
    if (session) {
      return goHome;
    }
  }
}

export const config = {
  matcher: [...withAuthList, ...withOutAuthList]
}