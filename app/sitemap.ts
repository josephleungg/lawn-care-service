import type { MetadataRoute } from "next";

import { locales } from "@/content/locales";
import { siteUrl, sitemapAlternates } from "@/content/seo";
import { serviceSlugs } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    "/privacy",
  ];

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path === "/" ? "" : path}`,
      alternates: sitemapAlternates(path === "/" ? "" : path),
    })),
  );
}
