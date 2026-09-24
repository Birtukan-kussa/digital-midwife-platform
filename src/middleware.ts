import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // getToken securely reads the NextAuth VIP wristband (cookie)
  const token = await getToken({ req });
  const path = req.nextUrl.pathname;

  // 1. If the user is on an auth page...
  if (path.startsWith("/login") || path.startsWith("/forgot-password")) {
    // ...and they are already logged in, bounce them to the dashboard
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // ...otherwise, let them log in
    return NextResponse.next();
  }

  // 2. For every other protected page, if they DO NOT have a token, kick them to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. If they have a token and are allowed, let the request proceed
  return NextResponse.next();
}

export const config = {
  // This tells Next.js to run this middleware on every route EXCEPT background API calls and static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};