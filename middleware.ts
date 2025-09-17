import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Permettre l'accès à la page de maintenance
  if (request.nextUrl.pathname === '/maintenance') {
    return NextResponse.next();
  }

  // Permettre l'accès aux fichiers statiques (images, CSS, JS, etc.)
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.') // fichiers avec extension
  ) {
    return NextResponse.next();
  }

  // Rediriger toutes les autres routes vers la page de maintenance
  return NextResponse.redirect(new URL('/maintenance', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
