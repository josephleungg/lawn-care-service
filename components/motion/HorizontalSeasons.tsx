"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

export function HorizontalSeasons({
  heading,
  children,
}: {
  heading: ReactNode;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const distance = () =>
            Math.max(track.current!.scrollWidth - window.innerWidth, 0);

          gsap.to(track.current, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="flex flex-col justify-center gap-10 py-20 lg:min-h-svh">
      {heading}
      <div className="seasons-viewport">
        <div ref={track} className="seasons-track px-4 md:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
