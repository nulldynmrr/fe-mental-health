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
  const token = request.cookies.get("token");

  // Pastikan hanya match jika route diawali oleh path yang dilindungi
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Kalau butuh login dan token tidak ada
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Ini memastikan middleware tidak kena untuk file static, API, atau Next internals.
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
