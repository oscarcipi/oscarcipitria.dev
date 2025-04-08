import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs before the page is rendered
export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();

  // Add a header that will be used by our client-side script to identify and remove the badge
  response.headers.set('x-remove-vercel-badge', 'true');

  // Set environment variables that Next.js uses to determine whether to show the badge
  // This tricks Next.js into thinking we're in production mode
  response.headers.set('x-vercel-deployment-url', 'https://custom-domain.com');
  response.headers.set('x-vercel-production', '1');

  return response;
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
