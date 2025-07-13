import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth_token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isHomePage = request.nextUrl.pathname === '/';

  // Allow access to home page without authentication
  if (isHomePage) {
    return NextResponse.next();
  }

  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isAuthenticated && isAuthPage) {
    // Redirect to appropriate dashboard based on user role
    // This is a simplified version - you'll need to implement proper role checking
    return NextResponse.redirect(new URL('/dashboard/client', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};