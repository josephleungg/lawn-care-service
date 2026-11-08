"use client";

import { useLenis } from "lenis/react";
import { useRef, type ReactNode } from "react";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Each service holds for one unit, then takes one unit to hand over to the next.
const HOLD = 1;
const CHANGE = 1;

const hiddenClip = (index: number) =>
  index % 2 === 1 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";
const shownClip = "inset(0% 0% 0% 0%)";
// Far enough to carry descenders fully past the title mask.
const TITLE_TRAVEL = 135;

export function ServiceIndex({
  names,
  label,
  children,
}: {
  names: string[];
  label: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const lenis = useLenis();

  const scrollToService = (index: number) => {
    const scroll = trigger.current;
    if (!scroll) return;

    const total = names.length * HOLD + (names.length - 1) * CHANGE;
    const position = (index * (HOLD + CHANGE) + HOLD / 2) / total;
    const top = scroll.start + (scroll.end - scroll.start) * position;

    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top });
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      gsap.matchMedia().add(MOTION_OK, () => {
        const media = q<HTMLElement>(".svc-media");
        const images = q<HTMLElement>("[data-svc-image]");
        const texts = q<HTMLElement>(".svc-text");
        const titles = q<HTMLElement>("[data-svc-name]");
        const details = q<HTMLElement>("[data-svc-details]");
        const tabs = q<HTMLElement>("[data-svc-tab]");
        const edge = q<HTMLElement>(".svc-edge")[0];
        const bar = q<HTMLElement>("[data-svc-bar]")[0];
        const last = names.length - 1;

        media.forEach((item, index) =>
          gsap.set(item, { clipPath: index ? hiddenClip(index) : shownClip }),
        );
        gsap.set(titles.slice(1), { yPercent: TITLE_TRAVEL });
        gsap.set(details.slice(1), { opacity: 0, y: 20 });

        let active = 0;
        const setActive = (next: number) => {
          if (next === active) return;
          active = next;
          texts.forEach((text, index) => {
            text.dataset.active = String(index === next);
          });
          tabs.forEach((tab, index) => {
            if (index === next) tab.setAttribute("aria-current", "true");
            else tab.removeAttribute("aria-current");
          });
        };

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => {
            bar.style.transform = `scaleX(${timeline.progress()})`;
            setActive(
              Math.round((timeline.time() - HOLD / 2) / (HOLD + CHANGE)),
            );
          },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
          },
        });
        trigger.current = timeline.scrollTrigger ?? null;

        for (let index = 0; index < last; index += 1) {
          const next = index + 1;
          const at = HOLD + index * (HOLD + CHANGE);
          const fromLeft = next % 2 === 1;

          timeline
            .set(edge, { opacity: 1 }, at)
            .fromTo(
              edge,
              { xPercent: fromLeft ? 0 : 100 },
              {
                xPercent: fromLeft ? 100 : 0,
                duration: CHANGE,
                ease: "power2.inOut",
                immediateRender: false,
              },
              at,
            )
            .fromTo(
              media[next],
              { clipPath: hiddenClip(next) },
              {
                clipPath: shownClip,
                duration: CHANGE,
                ease: "power2.inOut",
                immediateRender: false,
              },
              at,
            )
            .fromTo(
              images[next],
              { scale: 1.2 },
              { scale: 1, duration: CHANGE + HOLD, immediateRender: false },
              at,
            )
            .set(edge, { opacity: 0 }, at + CHANGE)
            .to(
              titles[index],
              { yPercent: -TITLE_TRAVEL, duration: CHANGE / 2, ease: "power2.in" },
              at,
            )
            .to(
              details[index],
              { opacity: 0, y: -20, duration: CHANGE / 2 },
              at,
            )
            .to(
              titles[next],
              { yPercent: 0, duration: CHANGE / 2, ease: "power2.out" },
              at + CHANGE / 2,
            )
            .to(
              details[next],
              { opacity: 1, y: 0, duration: CHANGE / 2 },
              at + CHANGE / 2,
            );
        }

        timeline.to({}, { duration: HOLD });

        return () => {
          trigger.current = null;
        };
      });
    },
    { scope: root, dependencies: [names.length] },
  );

  return (
    <div
      ref={root}
      className="svc on-dark"
      onFocus={(event) => {
        // Hidden services stay reachable by keyboard, so bring them into view.
        const text = (event.target as HTMLElement).closest<HTMLElement>(
          ".svc-text",
        );
        if (text) scrollToService(Number(text.dataset.index));
      }}
    >
      <div className="svc-stage">
        <div className="svc-meta">
          <ol aria-label={label} className="svc-tabs">
            {names.map((name, index) => (
              <li key={name}>
                <button
                  type="button"
                  data-svc-tab
                  aria-current={index === 0 ? "true" : undefined}
                  onClick={() => scrollToService(index)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ol>
          <span className="svc-progress" aria-hidden="true">
            <span data-svc-bar style={{ transform: "scaleX(0)" }} />
          </span>
        </div>

        {children}

        <div className="svc-edge-frame" aria-hidden="true">
          <span className="svc-edge" />
        </div>
      </div>
    </div>
  );
}
