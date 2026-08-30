import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIX = "/app";
const SIGNIN_PATH = "/signin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  // Allow the signin page itself and static assets through
  if (pathname === SIGNIN_PATH || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Check for session cookie (placeholder until auth backend is integrated)
  const sessionToken =
    request.cookies.get("session")?.value ??
    request.cookies.get("__session")?.value;

  if (!sessionToken) {
    const signinUrl = new URL(SIGNIN_PATH, request.url);
    signinUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
