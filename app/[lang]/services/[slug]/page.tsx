import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { business } from "@/content/business";
import { isLocale, type Locale } from "@/content/locales";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/content/seo";
import {
  getService,
  isServiceSlug,
  serviceSlugs,
  services,
} from "@/content/services";
import { getDictionary } from "@/dictionaries";

type Props = PageProps<"/[lang]/services/[slug]">;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isServiceSlug(slug)) notFound();

  const { metaTitle, metaDescription } = getService(slug).copy[lang];
  return pageMetadata(lang, `/services/${slug}`, metaTitle, metaDescription);
}

const secondaryName = (lang: Locale, nameEn: string, nameZh: string) =>
  lang === "en" ? nameZh : nameEn;

export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isServiceSlug(slug)) notFound();

  const dict = getDictionary(lang);
  const service = getService(slug);
  const copy = service.copy[lang];

  return (
    <article>
      <JsonLd
        data={serviceJsonLd(lang, slug, copy.name, copy.metaDescription)}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.servicePage.home, path: `/${lang}` },
          { name: copy.name, path: `/${lang}/services/${slug}` },
        ])}
      />

      <header className="on-dark bg-forest pt-32 pb-16 text-bone md:pt-40 md:pb-24">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm">
            <Link href={`/${lang}`} className="link-grow">
              {dict.servicePage.home}
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href={`/${lang}#services`} className="link-grow">
              {dict.servicePage.services}
            </Link>
          </nav>
          <p className="eyebrow mb-4 text-lime">
            {secondaryName(lang, service.nameEn, service.nameZh)}
          </p>
          <RevealText>
            <h1 className="display max-w-5xl text-5xl md:text-8xl">
              {copy.name}
            </h1>
          </RevealText>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-bone/85">
            {copy.intro}
          </p>
        </div>
      </header>

      <div className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
        <figure>
          <Image
            src={service.image}
            alt={copy.imageAlt}
            width={1280}
            height={960}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-md object-cover"
            preload
          />
        </figure>
        <Reveal className="flex flex-col gap-10">
          {copy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="display mb-3 text-3xl">{section.heading}</h2>
              <p className="text-lg leading-relaxed text-forest/85">
                {section.body}
              </p>
            </section>
          ))}
        </Reveal>
      </div>

      <section className="on-dark bg-forest py-16 text-bone md:py-20">
        <div className="shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="display text-4xl md:text-5xl">
            {dict.servicePage.ctaTitle}
          </h2>
          <a href={business.phoneHref} className="btn btn-lime">
            <Icon name="phone-bold" size={18} />
            {business.phoneDisplay}
          </a>
        </div>
      </section>

      <nav aria-label={dict.servicePage.other} className="shell py-16">
        <h2 className="eyebrow mb-6">{dict.servicePage.other}</h2>
        <ul>
          {services
            .filter((other) => other.slug !== slug)
            .map((other) => (
              <li key={other.slug} className="border-t border-forest/20">
                <Link
                  href={`/${lang}/services/${other.slug}`}
                  className="flex items-center justify-between gap-4 py-5 text-2xl"
                >
                  {other.copy[lang].name}
                  <Icon name="arrow-right-linear" size={24} />
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </article>
  );
}
