import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('auth')?.value

  if (!auth && !request.nextUrl.pathname.startsWith('/sign-in')) {
    return Response.redirect(new URL('/sign-in', request.url))
  }

}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}