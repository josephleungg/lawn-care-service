import Link from "next/link";

import { business } from "@/content/business";
import type { Locale } from "@/content/locales";
import { services } from "@/content/services";
import type { Dictionary } from "@/dictionaries";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { footer } = dict;

  return (
    <footer className="on-dark bg-forest pt-16 pb-10 text-bone">
      <div className="shell grid gap-10 border-t border-bone/20 pt-10 md:grid-cols-3">
        <div>
          <p lang="zh-Hant" className="font-display text-3xl">
            {business.nameZh}
          </p>
          <p className="mt-1">{business.name}</p>
          <p className="mt-1 text-bone/70">{footer.area}</p>
        </div>
        <div>
          <h2 className="eyebrow mb-3 text-lime">{footer.services}</h2>
          <ul className="flex flex-col gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/${lang}/services/${service.slug}`}
                  className="link-grow"
                >
                  {service.copy[lang].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-3 text-lime">{footer.contact}</h2>
          <p>{business.contact}</p>
          <a href={business.phoneHref} className="link-grow">
            {business.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="shell mt-10 flex flex-col gap-2 text-sm text-bone/70 sm:flex-row sm:justify-between">
        <p>{footer.credit}</p>
        <Link href={`/${lang}/privacy`} className="link-grow">
          {footer.privacy}
        </Link>
      </div>
    </footer>
  );
}
