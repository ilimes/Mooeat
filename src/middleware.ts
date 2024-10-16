/* middleware.ts */
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

const withAuthList = ['/friends', '/share', '/myPage', '/service', '/attendance', '/feed'];
const withOutAuthList = ['/auth/login', '/auth/login/email', '/auth/join', '/auth/join/email'];

export async function middleware(req: NextRequest) {
  const session: any = await getToken({ req, secret /* raw: true */ });
  const { pathname } = req.nextUrl;

  const isWithAuth = withAuthList.includes(pathname);
  const isWithOutAuth = withOutAuthList.includes(pathname);

  const isPersonal = req.nextUrl.searchParams.get('page') === 'personal';

  const goLogin = NextResponse.redirect(new URL('/auth/login/?required=true', req.url));
  const goHome = NextResponse.redirect(new URL('/', req.url));
  const goHome2 = NextResponse.redirect(new URL('/notAccepted', req.url));

  const isAdminPage = pathname?.split('/')?.[1] === 'admin';
  const userInfo = session?.user?.userInfo;

  /**
   * 로그인이 필요한 경우
   */
  if (isWithAuth) {
    if (pathname === '/service') {
      if (!session && isPersonal) {
        return goLogin;
      }
    } else if (!session) {
      return goLogin;
    }
  }

  /**
   * 로그인 시 접근 불가능
   */
  if (isWithOutAuth) {
    if (session) {
      return goHome;
    }
  }

  /**
   * 관리자 페이지
   */
  if (isAdminPage) {
    if (userInfo?.role_rank < 3 || userInfo === undefined) {
      return goHome2;
    }
  }
}

/**
 * 아래 경로 제외하고 middleware 적용
 * ------
 * api: 경로에 api가 포함된 경우
 * _next/static: 경로에 _next/static이 포함된 경우
 * _next/image: 경로에 _next/image가 포함된 경우
 * robot: 경로에 robot이 포함된 경우
 * sitemap: 경로에 sitemap이 포함된 경우
 * images: 경로에 images가 포함된 경우
 * fonts: 경로에 fonts가 포함된 경우
 * assets: 경로에 assets가 포함된 경우
 * favicon.ico: 경로에 favicon.ico가 포함된 경우
 * sw.js: 경로에 sw.js가 포함된 경우
 * manifest.webmanifest: 경로에 manifest.webmanifest가 포함된 경우
 * ------
 */

export const config = {
  matcher: [
    ...withAuthList,
    ...withOutAuthList,
    '/((?!api|_next/static|_next/image|robot|sitemap|images|fonts|assets|favicon.ico|sw.js|manifest.webmanifest).*)',
  ],
};
