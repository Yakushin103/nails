import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Защищенные роуты
const protectedRoutes = ["/account", "/checkout"];
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  console.log("Middleware - pathname:", pathname);
  console.log("Middleware - token exists:", !!token);

  // Проверка защищенных роутов
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      console.log("No token, redirecting to login");
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Если пользователь авторизован, не пускаем на страницы входа/регистрации
  if (authRoutes.includes(pathname)) {
    if (token) {
      console.log("Has token, redirecting to account");
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/login", "/register"],
};
