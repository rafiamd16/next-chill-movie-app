import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('user-store')?.value

  // Jika user belum login, larang akses halaman /profile

  if (request.nextUrl.pathname.startsWith('/profile') && !userCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Jika user sudah login, larang akses ke /login dan /register
  if (
    userCookie &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register'))
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/register'],
}
