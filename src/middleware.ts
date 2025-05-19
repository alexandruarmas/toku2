import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Protect routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/features',
  '/pricing',
  '/support',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook/clerk',
  '/debug',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // For routes that aren't public, enforce authentication
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[^?/]+$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}; 