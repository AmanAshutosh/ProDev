import { NextResponse } from 'next/server'

const PROTECTED = [
  '/dashboard', '/practice', '/roadmap', '/interview',
  '/resume', '/progress', '/livestream', '/ai', '/profile',
]

export function middleware(request) {
  const { pathname } = request.nextUrl
  const auth = request.cookies.get('prodev-auth')?.value

  const isProtected = PROTECTED.some(p => pathname.startsWith(p))

  if (isProtected && !auth) {
    const url = new URL('/auth', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  if (pathname === '/auth' && auth) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
