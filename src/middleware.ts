import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('privy-token');
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/market') || pathname.startsWith('/contact') || pathname.startsWith('/stake');

  if (sessionToken) {
    if (pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!sessionToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/market/:path*',
    '/contact/:path*',
    '/stake/:path*',
    '/auth',
  ],
};