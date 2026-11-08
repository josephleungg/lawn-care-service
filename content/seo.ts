import type { Metadata } from "next";

import { business, cities } from "./business";
import { locales, type Locale } from "./locales";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

const localePath = (lang: Locale, path: string) =>
  path === "/" ? `/${lang}` : `/${lang}${path}`;

export function pageMetadata(
  lang: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = localePath(lang, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: localePath("en", path),
        "zh-Hant": localePath("zh-Hant", path),
        "x-default": localePath("en", path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: business.name,
      locale: lang === "en" ? "en_CA" : "zh_TW",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const sitemapAlternates = (path: string) => ({
  languages: Object.fromEntries(
    locales.map((lang) => [lang, `${siteUrl}${localePath(lang, path)}`]),
  ),
});

export const localBusinessJsonLd = (lang: Locale, description: string) => ({
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${siteUrl}/#business`,
  name: business.name,
  alternateName: business.nameZh,
  description,
  url: `${siteUrl}/${lang}`,
  telephone: business.phoneE164,
  image: `${siteUrl}/images/hero/after.jpg`,
  knowsLanguage: ["en", "zh-Hant"],
  areaServed: cities.map((city) => ({ "@type": "City", name: city.en })),
});

export const serviceJsonLd = (
  lang: Locale,
  slug: string,
  name: string,
  description: string,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `${siteUrl}/${lang}/services/${slug}`,
  provider: { "@id": `${siteUrl}/#business` },
  areaServed: cities.map((city) => ({ "@type": "City", name: city.en })),
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${item.path}`,
  })),
});
