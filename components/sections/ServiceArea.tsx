import { Reveal } from "@/components/motion/Reveal";
import { cityNames } from "@/content/business";
import type { Locale } from "@/content/locales";
import type { Dictionary } from "@/dictionaries";

import { SectionHeading } from "./SectionHeading";

export function ServiceArea({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section id="area" className="shell relative z-10 bg-bone py-24 md:py-40">
      <SectionHeading
        className="mb-12"
        eyebrow={dict.area.eyebrow}
        title={dict.area.title}
      />
      <Reveal>
        <ul className="display flex flex-wrap gap-x-6 gap-y-2 text-3xl md:gap-x-10 md:text-6xl">
          {cityNames(lang).map((city) => (
            <li key={city}>{city}</li>
          ))}
        </ul>
        <p className="mt-10 text-lg">{dict.area.body}</p>
      </Reveal>
    </section>
  );
}
