import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Пропускаем API роуты и статические файлы
  const { pathname } = request.nextUrl
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Все остальные запросы → страница обслуживания
  return NextResponse.rewrite(new URL('/maintenance', request.url))
}

export const config = {
  matcher: ['/((?!maintenance|api|_next/static|_next/image|favicon.ico).*)'],
}
