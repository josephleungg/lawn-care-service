import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/content/locales";
import { pageMetadata } from "@/content/seo";
import { getDictionary } from "@/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { metaTitle, metaDescription } = getDictionary(lang).privacy;
  return pageMetadata(lang, "/privacy", metaTitle, metaDescription);
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { title, paragraphs } = getDictionary(lang).privacy;

  return (
    <section className="shell max-w-3xl pt-36 pb-24">
      <h1 className="display mb-8 text-5xl md:text-7xl">{title}</h1>
      <div className="flex flex-col gap-4 text-lg leading-relaxed">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
