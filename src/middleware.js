import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/protected') && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}


//It checks if a token is present for protected routes and redirects to /login if not authenticated.