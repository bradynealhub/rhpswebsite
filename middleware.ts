import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gates the entire site behind a single shared password (HTTP Basic Auth)
// for the founders' internal review period — set SITE_PASSWORD as a
// Worker secret in production and in .env.local for local testing. Any
// username is accepted; only the password is checked. Remove this file
// (and the SITE_PASSWORD secret) once the site is ready to go fully public.
//
// Deliberately using the "middleware.ts" convention (not Next.js 16's new
// "proxy.ts" rename): OpenNext Cloudflare 1.20.1 doesn't yet correctly
// recognize proxy.ts as edge-compatible and misclassifies it as Node.js
// middleware (unsupported), while middleware.ts still builds correctly.
export function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice("Basic ".length));
    const suppliedPassword = decoded.slice(decoded.indexOf(":") + 1);
    if (suppliedPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="RHPS Preview"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
