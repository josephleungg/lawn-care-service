"use client";

import { usePathname } from "next/navigation";

import { LOCALE_COOKIE, type Locale } from "@/content/locales";

export function LanguageSwitch({
  lang,
  label,
  text,
}: {
  lang: Locale;
  label: string;
  text: string;
}) {
  const pathname = usePathname();
  const target: Locale = lang === "en" ? "zh-Hant" : "en";
  const href = pathname.replace(/^\/[^/]+/, `/${target}`);

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      className="btn btn-line !min-h-10 !min-w-10 !px-3 !py-1 text-sm"
      onClick={(event) => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
        event.currentTarget.href = href + window.location.hash;
      }}
    >
      {text}
    </a>
  );
}
