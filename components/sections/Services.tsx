import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/Icon";
import { ServiceIndex } from "@/components/motion/ServiceIndex";
import type { Locale } from "@/content/locales";
import { services } from "@/content/services";
import type { Dictionary } from "@/dictionaries";

import { SectionHeading } from "./SectionHeading";

export function Services({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section id="services" aria-label={dict.nav.services}>
      <SectionHeading
        className="shell pb-12 md:pb-20"
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
      />
      <ServiceIndex
        label={dict.nav.services}
        names={services.map((service) => service.copy[lang].name)}
      >
        {services.map((service, index) => {
          const copy = service.copy[lang];
          const secondary = lang === "en" ? service.nameZh : service.nameEn;

          return (
            <article key={service.slug} className="svc-item">
              <div className="svc-media">
                <Image
                  data-svc-image
                  src={service.image}
                  alt={copy.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 44vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div
                className="svc-text"
                data-index={index}
                data-active={index === 0}
              >
                <div className="svc-name-mask text-[2.75rem] md:text-7xl">
                  <h3 data-svc-name className="display">
                    {copy.name}
                  </h3>
                </div>
                <div data-svc-details className="mt-3 lg:mt-5">
                  <p className="flex items-baseline gap-3">
                    <span className="tabular-nums text-lime">
                      0{index + 1}
                    </span>
                    <span
                      lang={lang === "en" ? "zh-Hant" : "en"}
                      className="font-display text-xl"
                    >
                      {secondary}
                    </span>
                  </p>
                  <p className="mt-2 max-w-lg leading-relaxed text-bone/85 lg:mt-4 lg:text-lg">
                    {copy.summary}
                  </p>
                  <Link
                    href={`/${lang}/services/${service.slug}`}
                    className="btn btn-line mt-4 lg:mt-7"
                  >
                    {dict.services.more} {copy.name}
                    <Icon name="arrow-right-linear" size={18} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </ServiceIndex>
    </section>
  );
}
