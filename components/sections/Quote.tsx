import { QuoteForm } from "@/components/QuoteForm";
import { business, cityNames } from "@/content/business";
import type { Locale } from "@/content/locales";
import { services } from "@/content/services";
import type { Dictionary } from "@/dictionaries";

import { SectionHeading } from "./SectionHeading";

export function Quote({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { quote } = dict;

  return (
    <section
      id="quote"
      className="on-dark relative z-10 bg-forest py-24 text-bone md:py-40"
    >
      <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={quote.eyebrow}
            eyebrowClassName="text-lime"
            title={quote.title}
          />
          <p className="mt-10 text-lg">{quote.callPrompt}</p>
          <a
            href={business.phoneHref}
            className="display link-grow mt-2 block text-4xl text-lime md:text-6xl"
          >
            {business.phoneDisplay}
          </a>
          <p className="mt-2 text-bone/70">{business.contact}</p>
        </div>
        <div>
          <h3 className="display mb-6 text-3xl">{quote.formTitle}</h3>
          <QuoteForm
            lang={lang}
            labels={quote}
            cities={cityNames(lang)}
            services={services.map((service) => ({
              value: service.slug,
              label: service.copy[lang].name,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
