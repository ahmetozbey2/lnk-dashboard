import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth0 session cookie'si (standart olarak adları `appSession` değil `auth0.*` olur)
  const isLoggedIn = request.cookies.get('appSession') || request.cookies.get('auth0.is.authenticated');

  // Eğer giriş yapılmamışsa ve login sayfasında değilse => login'e yönlendir
  if (!isLoggedIn && !pathname.startsWith('/login')) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Sadece korumalı sayfalar (login, api gibi şeyleri dahil etme!)
    '/dashboard/:path*',
    '/payroll/:path*',
    '/',
  ],
};
