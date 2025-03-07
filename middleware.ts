import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This is where you would add authentication checks
  // For example, redirecting unauthenticated users away from protected routes

  // For now, we'll just pass through all requests
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Add protected routes here when you implement authentication
    // '/dashboard/:path*',
    // '/admin/:path*',
  ],
}

