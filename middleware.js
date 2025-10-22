import { NextResponse } from "next/server";

const protectedRoutes = [
  "/face-detection",
  "/meditasi",
  "/obrolanAnonim",
  "/smartJournaling",
  "/smartJournaling/addJournal",
  "/verify-email",
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
