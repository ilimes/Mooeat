/* middleware.ts */
import { NextRequest, NextResponse } from 'next/server';
 
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  let ip = req.ip ?? req.headers.get('x-real-ip')
  const forwardedFor = req.headers.get('x-forwarded-for')
  if(!ip && forwardedFor){
    ip = forwardedFor.split(',').at(0) ?? 'Unknown'
  }
  console.log(ip)
  return res;
  // nextUrl.searchParams.set('clientIp', ip);
  
  // return NextResponse.rewrite(nextUrl);
  // return NextResponse.redirect(new URL('/home', req.url))
}
 
export const config = {
  matcher: '/api/:path*',
}