import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Countries where French should be the automatic default on a first visit.
// Covers Francophone Africa (ACOSA's core member/partner region) plus France
// itself. Extend this list as the client adds more French-speaking partner
// countries — it's the only thing that needs editing to widen auto-French.
const FRENCH_SPEAKING_COUNTRIES = new Set([
  "FR", "BE", "CH", "LU", "MC", // Europe
  "SN", "CI", "ML", "BF", "NE", "TG", "BJ", "GN", "CM", "CD", "CG", "GA",
  "TD", "CF", "MG", "DJ", "RW", "BI", "KM", "MR", "MA", "DZ", "TN", // Africa
]);

const LOCALE_COOKIE = "ACOSA_LOCALE";

export default function proxy(request: NextRequest) {
  // 1. Respect an explicit choice the visitor already made (e.g. via the
  //    language switcher in the header), stored as a plain cookie so it
  //    survives across sessions.
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (!cookieLocale) {
    // 2. No stored preference yet -> auto-detect by location.
    //    `x-vercel-ip-country` is populated automatically on Vercel; most
    //    other hosts (e.g. behind Cloudflare) expose an equivalent
    //    `cf-ipcountry` header. We check both, then fall back to the
    //    browser's Accept-Language header, then to English.
    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      "";

    const detectedLocale = FRENCH_SPEAKING_COUNTRIES.has(country.toUpperCase())
      ? "fr"
      : undefined;

    if (detectedLocale) {
      const response = intlMiddleware(request);
      // Persist the detection so it's a one-time decision, and so the
      // visitor's manual override (if they switch languages) always wins
      // after this.
      response.cookies.set(LOCALE_COOKIE, detectedLocale, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
      // Re-run through next-intl with the detected locale forced via the
      // NEXT_LOCALE cookie it reads internally.
      request.cookies.set("NEXT_LOCALE", detectedLocale);
      return intlMiddleware(request);
    }
  } else {
    // Mirror the persisted choice into the cookie next-intl itself reads.
    request.cookies.set("NEXT_LOCALE", cookieLocale);
  }

  const response = intlMiddleware(request);
  return response ?? NextResponse.next();
}

export const config = {
  // Skip API routes, Next internals, and static/WordPress media files.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
