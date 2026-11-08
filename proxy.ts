import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/content/locales";

export function proxy(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const accepted = request.headers.get("accept-language") ?? "";
  const locale =
    saved && isLocale(saved)
      ? saved
      : /^\s*zh/i.test(accepted)
        ? "zh-Hant"
        : defaultLocale;

  request.nextUrl.pathname = `/${locale}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/"],
};
