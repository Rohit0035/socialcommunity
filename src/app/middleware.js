import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {

    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // ADMIN ROUTES
    if (
      path.startsWith("/admin") &&
      token?.role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL("/admin/auth/login", req.url)
      )
    }

    // STUDENT ROUTES
    if (
      path.startsWith("/user") &&
      token?.role !== "user"
    ) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/admin/:path*",
    "/main/:path*",
  ],
}