// middleware.ts
import { NextResponse } from 'next/server'


export function middleware(request) {
    const jwt = request.cookies.get('token')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value

    const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

    if (!refreshToken && !jwt && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if ((refreshToken || jwt) && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|static|favicon.ico).*)'],
}
