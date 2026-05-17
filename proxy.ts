import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const sessionToken = request.cookies.get("better-auth.session_token")

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // fetch session from backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`, {
    headers: {
      cookie: `better-auth.session_token=${sessionToken.value}`,
    },
  })

  const data = await res.json()
  const user = data?.user

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const role = user.role

  // if MEMBER tries to access admin dashboard → redirect to member
  if (role === "MEMBER" && pathname.startsWith("/dashboard/admin")) {
    return NextResponse.redirect(new URL("/dashboard/member", request.url))
  }

  // if ADMIN tries to access member dashboard → redirect to admin
  if (role === "ADMIN" && pathname.startsWith("/dashboard/member")) {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
}