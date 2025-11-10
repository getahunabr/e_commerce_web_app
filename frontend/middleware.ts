import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value; // simple token check
  const { pathname } = request.nextUrl;

  // 1. Redirect login/register pages to homepage if token exists
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Protect routes: homepage, cart, orders
  const protectedRoutes = ["/", "/cart", "/orders"];
  if (
    !token &&
    protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    )
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Otherwise, continue
  return NextResponse.next();
}

// export const middleware = middleware;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
