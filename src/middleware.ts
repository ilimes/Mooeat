/* middleware.ts */
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"
 
const secret = process.env.NEXTAUTH_SECRET

const withAuthList = ["/friends", "/share"]
const withOutAuthList = ["/auth/login", "/auth/login/email", "/auth/join", "/auth/join/email"]

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret, raw: true })
  const pathname = req.nextUrl.pathname;
  const isWithAuth = withAuthList.includes(pathname);
  const isWithOutAuth = withOutAuthList.includes(pathname);

  if (isWithAuth) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login/?required=true', req.url))
    }
  }

  if (isWithOutAuth) {
    if (session) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}

export const config = {
  matcher: [...withAuthList, ...withOutAuthList]
}



// const res = NextResponse.next();
// let ip = req.ip ?? req.headers.get('x-real-ip')
// const forwardedFor = req.headers.get('x-forwarded-for')
// if(!ip && forwardedFor){
//   ip = forwardedFor.split(',').at(0) ?? 'Unknown'
// }
// console.log(ip)
// return res;
// nextUrl.searchParams.set('clientIp', ip);

// return NextResponse.rewrite(nextUrl);
// return NextResponse.redirect(new URL('/home', req.url))