export const locales = ["en", "zh-Hant"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "preferred-locale";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
