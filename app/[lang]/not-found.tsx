import Link from "next/link";
import { lang } from "next/root-params";

import { defaultLocale, isLocale } from "@/content/locales";
import { getDictionary } from "@/dictionaries";

export default async function NotFound() {
  const value = await lang();
  const locale = isLocale(value) ? value : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <section className="shell flex min-h-[70svh] flex-col items-start justify-center gap-6 pt-28">
      <h1 className="display text-5xl md:text-7xl">{dict.notFound.title}</h1>
      <Link href={`/${locale}`} className="underline underline-offset-4">
        {dict.notFound.home}
      </Link>
    </section>
  );
}
