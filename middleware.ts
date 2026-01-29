import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Session Checks
    const hasUserSession = request.cookies.has('auth_session');
    const hasAdminSession = request.cookies.has('admin_auth_session');

    // 2. Admin Protection
    if (pathname.startsWith('/admin') && !hasAdminSession) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. Define User App Protection
    const isAuthPage = pathname === '/login';
    const isUserProtectedRoute =
        pathname === '/' ||
        pathname.startsWith('/inbox') ||
        pathname.startsWith('/starred') ||
        pathname.startsWith('/sent') ||
        pathname.startsWith('/drafts');

    if (isUserProtectedRoute && !hasUserSession) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthPage && hasUserSession) {
        return NextResponse.redirect(new URL('/inbox', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
