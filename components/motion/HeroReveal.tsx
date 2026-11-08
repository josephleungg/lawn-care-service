"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";

import { EASE_OUT, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const ROWS = 8;
const BONE = "#F3F0E6";

type Labels = {
  before: string;
  after: string;
  scroll: string;
  beforeAlt: string;
  afterAlt: string;
  illustrative: string;
  sliderLabel: string;
};

/** Where the mower is: the row it's on, and its x position within that row. */
function mowerAt(progress: number) {
  const travelled = progress * ROWS;
  const row = Math.min(Math.floor(travelled), ROWS - 1);
  const along = progress >= 1 ? 1 : travelled - row;
  const edge = row % 2 === 0 ? along * 100 : 100 - along * 100;

  return { row, edge };
}

/** Finished rows, plus the part of the current row, as one clip shape. */
function mowedShape(progress: number) {
  const { row, edge } = mowerAt(progress);
  const top = (row / ROWS) * 100;
  const bottom = ((row + 1) / ROWS) * 100;

  return row % 2 === 0
    ? `polygon(0 0, 100% 0, 100% ${top}%, ${edge}% ${top}%, ${edge}% ${bottom}%, 0 ${bottom}%)`
    : `polygon(0 0, 100% 0, 100% ${bottom}%, ${edge}% ${bottom}%, ${edge}% ${top}%, 0 ${top}%)`;
}

export function HeroReveal({
  copy,
  labels,
}: {
  copy: ReactNode;
  labels: Labels;
}) {
  const root = useRef<HTMLElement>(null);
  const [wipe, setWipe] = useState<number | null>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setWipe(50);
        return () => setWipe(null);
      });

      mm.add(MOTION_OK, () => {
        const after = q<HTMLElement>(".hero-after")[0];
        const track = q<HTMLElement>(".mow-track")[0];
        const percent = q<HTMLElement>("[data-percent]")[0];
        const bar = q<HTMLElement>("[data-bar]")[0];

        const render = (progress: number) => {
          const { row, edge } = mowerAt(progress);
          after.style.clipPath = mowedShape(progress);
          track.style.transform = `translate(${edge}%, ${row * 100}%)`;
          track.style.opacity = progress > 0 && progress < 1 ? "1" : "0";
          percent.textContent = `${Math.round(progress * 100)}%`;
          bar.style.transform = `scaleX(${progress})`;
        };
        render(0);

        document.documentElement.classList.remove("js-intro");
        gsap.from(q("[data-intro]"), {
          y: 24,
          autoAlpha: 0,
          duration: 1,
          ease: EASE_OUT,
          stagger: 0.09,
          delay: 0.15,
        });

        const mower = { progress: 0 };
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.35,
            },
          })
          .fromTo(
            q(".hero-square"),
            { rotate: -2.5, scale: 0.95 },
            { rotate: 0, scale: 1, duration: 10 },
            0,
          )
          .to(
            mower,
            {
              progress: 1,
              duration: 65,
              onUpdate: () => render(mower.progress),
            },
            10,
          )
          .to(q(".hero-after img"), { scale: 1.04, duration: 15 }, 75)
          .to(q(".hero-square"), { scale: 0.8, duration: 10 }, 90)
          .to(q("[data-copy]"), { autoAlpha: 0, y: -32, duration: 7 }, 90)
          .to(q("[data-readout]"), { autoAlpha: 0, duration: 4 }, 90)
          .to(q(".hero-stage"), { backgroundColor: BONE, duration: 10 }, 90);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero on-dark" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div data-copy>{copy}</div>

        <figure className="hero-figure">
          <div className="hero-square">
            <div className="hero-layer">
              <Image
                src="/images/hero/before.jpg"
                alt={labels.beforeAlt}
                width={1264}
                height={1264}
                sizes="(min-width: 1024px) 44vw, 90vw"
                preload
              />
            </div>
            <div
              className="hero-layer hero-after"
              style={
                wipe === null
                  ? undefined
                  : { clipPath: `inset(0 ${100 - wipe}% 0 0)` }
              }
            >
              <Image
                src="/images/hero/after.jpg"
                alt={labels.afterAlt}
                width={1264}
                height={1264}
                sizes="(min-width: 1024px) 44vw, 90vw"
                loading="eager"
              />
            </div>
            <div className="mow-track" aria-hidden="true">
              <span className="mow-line" />
            </div>
            {wipe !== null && (
              <input
                type="range"
                min={0}
                max={100}
                value={wipe}
                aria-label={labels.sliderLabel}
                className="hero-range"
                onChange={(event) => setWipe(Number(event.target.value))}
              />
            )}
          </div>

          <figcaption className="mt-3 text-sm" data-readout>
            <div className="flex items-center gap-3">
              <span>{labels.before}</span>
              <span className="h-px flex-1 bg-bone/30" aria-hidden="true">
                <span
                  data-bar
                  className="block h-full origin-left bg-lime"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
              <span>{labels.after}</span>
              <span
                data-percent
                aria-hidden="true"
                className="w-10 text-right tabular-nums text-lime"
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-bone/60">
              <span>{labels.illustrative}</span>
              {wipe === null && (
                <span className="hidden motion-safe:inline">
                  {labels.scroll}
                </span>
              )}
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
