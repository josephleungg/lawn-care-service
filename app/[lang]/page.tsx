import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Quote } from "@/components/sections/Quote";
import { Seasons } from "@/components/sections/Seasons";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Services } from "@/components/sections/Services";
import { Statement } from "@/components/sections/Statement";
import { isLocale } from "@/content/locales";
import { pageMetadata } from "@/content/seo";
import { getDictionary } from "@/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { title, description } = getDictionary(lang).meta;
  return {
    ...pageMetadata(lang, "/", title, description),
    title: { absolute: title },
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <Hero dict={dict} />
      <Statement text={dict.statement} />
      <Services lang={lang} dict={dict} />
      <Process dict={dict} />
      <Seasons dict={dict} />
      <ServiceArea lang={lang} dict={dict} />
      <Faq dict={dict} />
      <Quote lang={lang} dict={dict} />
    </>
  );
}
