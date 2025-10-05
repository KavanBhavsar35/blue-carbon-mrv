import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import { isAuthRoute, isPublicRoute } from "./utils/utils";

import {
  allowedApiRoutes,
  apiAuthPrefix,
  DEFAULT_REDIRECT_URL,
} from "@/lib/route";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  // const isAllowedApiRoute = allowedApiRoutes.includes(pathname);
  // TODO: temoporary allow all api's fix it later
  const isAllowedApiRoute = true;
  const isPublic = isPublicRoute(pathname);
  const isAuth = isAuthRoute(pathname);

  const session = getSessionCookie(req);
  const isLoggedIn = !!session;

  console.log({
    isApiAuthRoute,
    isAllowedApiRoute,
    isPublic,
    isAuth,
    isLoggedIn,
  });

  if (isApiAuthRoute || isAllowedApiRoute) {
    return NextResponse.next(); // Let auth APIs always pass
  }

  if (isAuth) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_URL, req.url));
    }

    return NextResponse.next(); // Allow access to login/register
  }

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT_URL, req.url));
  }

  return NextResponse.next(); // All good
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
