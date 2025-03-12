import { NextRequest, NextResponse } from 'next/server';

// This is a simplified middleware example
// In a real application, you would use a more robust authentication system
export function middleware(request: NextRequest) {
  // Check if the request is for the admin area
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // For demo purposes, we're using a simple query parameter for auth
    // In a real app, you'd use cookies, JWT tokens, etc.
    const adminAuth = request.cookies.get('adminAuth')?.value;
    
    // If not authenticated, redirect to login
    if (!adminAuth) {
      const loginUrl = new URL('/admin/login', request.url);
      // Add the original URL as a parameter to redirect back after login
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

// Specify which paths should be processed by this middleware
export const config = {
  matcher: ['/admin/:path*'],
};