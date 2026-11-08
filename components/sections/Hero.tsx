import { Icon } from "@/components/Icon";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { RevealText } from "@/components/motion/RevealText";
import { business } from "@/content/business";
import type { Dictionary } from "@/dictionaries";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;

  return (
    <HeroReveal
      labels={hero}
      copy={
        <>
          <p className="eyebrow mb-3 text-lime lg:mb-5" data-intro>
            {hero.eyebrow}
          </p>
          <RevealText immediate>
            <h1 id="hero-title" className="display hero-title">
              {hero.title}
            </h1>
          </RevealText>
          <p
            className="mt-3 max-w-xl text-base leading-relaxed text-bone/85 lg:mt-6 lg:text-xl"
            data-intro
          >
            {hero.body}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 lg:mt-8" data-intro>
            <a href={business.phoneHref} className="btn btn-lime">
              <Icon name="phone-bold" size={18} />
              {business.phoneDisplay}
            </a>
            <a href="#quote" className="btn btn-line">
              {hero.quote}
            </a>
          </div>
        </>
      }
    />
  );
}
