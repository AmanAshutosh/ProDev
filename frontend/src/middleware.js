import { NextResponse } from 'next/server'

const PROTECTED = [
  '/dashboard', '/profile', '/practice', '/resume',
  '/interview', '/roadmap', '/progress', '/livestream',
]

export function middleware(request) {
  const { pathname } = request.nextUrl
  const isAuth = request.cookies.has('prodev-auth')

  const isProtected = PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'))
  const isAuthPage  = pathname === '/auth' || pathname.startsWith('/auth/')

  // Unauthenticated user hitting a protected route → send to login
  if (isProtected && !isAuth) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // Authenticated user hitting the auth page → send to dashboard
  if (isAuthPage && isAuth) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.searchParams.delete('mode')
    url.searchParams.delete('from')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/practice/:path*',
    '/resume/:path*',
    '/interview/:path*',
    '/roadmap/:path*',
    '/progress/:path*',
    '/livestream/:path*',
    '/auth',
    '/auth/:path*',
  ],
}
