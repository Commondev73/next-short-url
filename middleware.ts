import { AUTH_TOKEN_COOKIE } from '@/lib/auth/constants'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/short-url/:path*'],
}