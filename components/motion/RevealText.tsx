"use client";

import { useRef, type ReactNode } from "react";

import {
  EASE_OUT,
  gsap,
  MOTION_OK,
  SplitText,
  useGSAP,
} from "@/lib/gsap";

type RevealTextProps = {
  children: ReactNode;
  /** "rise" plays once on entry; "scrub" brightens word by word with scroll. */
  mode?: "rise" | "scrub";
  /** Starts on load, for text already in the first viewport. */
  immediate?: boolean;
  className?: string;
};

export function RevealText({
  children,
  mode = "rise",
  immediate = false,
  className,
}: RevealTextProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heading = root.current?.firstElementChild;
      if (!heading) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const byChar = document.documentElement.lang.startsWith("zh");
        const unit = byChar ? "chars" : "words";

        const split = SplitText.create(heading, {
          type: unit,
          aria: "auto",
          wordsClass: "split-unit",
          charsClass: "split-unit",
          autoSplit: !byChar,
          ...(mode === "rise" ? { mask: unit } : {}),
          onSplit(self) {
            const targets = byChar ? self.chars : self.words;

            if (mode === "scrub") {
              return gsap.fromTo(
                targets,
                { opacity: 0.16 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.1,
                  scrollTrigger: {
                    trigger: heading,
                    start: "top 78%",
                    end: "bottom 45%",
                    scrub: true,
                  },
                },
              );
            }

            return gsap.from(targets, {
              yPercent: 110,
              duration: 1,
              ease: EASE_OUT,
              stagger: byChar ? 0.025 : 0.04,
              ...(immediate
                ? {}
                : {
                    scrollTrigger: {
                      trigger: heading,
                      start: "top 88%",
                      once: true,
                    },
                  }),
            });
          },
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
