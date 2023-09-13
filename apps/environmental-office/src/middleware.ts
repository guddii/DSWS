import { middleware as i18nMiddleware } from "i18n/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return i18nMiddleware(request);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|icon|favicon.ico).*)"],
};
