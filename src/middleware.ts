import { NextResponse } from "next/server"; 
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path.startsWith('/login') || path.startsWith('/signup');
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
   matcher: [
    '/',
    '/profile',
    '/profile/:id*',
    '/login',
    '/signup',
   ],
};
