import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSafeRedirectPath } from "@/lib/auth";
import { updateSession } from "@/lib/supabase/middleware";

const protectedRoutes = ["/dashboard", "/admin"];
const publicAuthRoutes = ["/login", "/signup", "/reset-password"];

export async function proxy(request: NextRequest) {
  const { user, response } = await updateSession(request);
  const pathname = request.nextUrl.pathname;
  const currentPath = `${pathname}${request.nextUrl.search}`;

  if (protectedRoutes.some((prefix) => pathname.startsWith(prefix)) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", currentPath);
    return NextResponse.redirect(url);
  }

  if (user && publicAuthRoutes.includes(pathname) && request.nextUrl.searchParams.get("mode") !== "recovery") {
    const destination = new URL(
      getSafeRedirectPath(request.nextUrl.searchParams.get("next"), "/dashboard"),
      request.url,
    );

    return NextResponse.redirect(destination);
  }

  if (pathname.startsWith("/admin") && user) {
    const role = user.user_metadata.role ?? "student";
    if (role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup", "/reset-password"],
};
