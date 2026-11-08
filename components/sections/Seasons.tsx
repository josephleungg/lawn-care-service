import { HorizontalSeasons } from "@/components/motion/HorizontalSeasons";
import type { Dictionary } from "@/dictionaries";

import { SectionHeading } from "./SectionHeading";

export function Seasons({ dict }: { dict: Dictionary }) {
  const { seasons } = dict;

  return (
    <section id="seasons" className="on-dark relative z-10 overflow-hidden bg-forest text-bone">
      <HorizontalSeasons
        heading={
          <SectionHeading
            className="shell"
            eyebrow={seasons.eyebrow}
            eyebrowClassName="text-lime"
            title={seasons.title}
          />
        }
      >
        {seasons.items.map((season, index) => (
          <article
            key={season.name}
            className="season-card flex min-h-64 flex-col justify-between rounded-md bg-forest-soft p-6 md:p-10"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="display text-5xl md:text-7xl">{season.name}</h3>
              <span className="tabular-nums text-lime">0{index + 1}</span>
            </div>
            <div className="mt-10">
              <p className="eyebrow mb-2 text-lime">{season.months}</p>
              <p className="max-w-lg text-lg leading-relaxed text-bone/85">
                {season.body}
              </p>
            </div>
          </article>
        ))}
      </HorizontalSeasons>
    </section>
  );
}
