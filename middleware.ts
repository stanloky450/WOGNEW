
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin", // Adjust if your signin page is different
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
}
