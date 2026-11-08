"use client";

import { useRef, type ReactNode } from "react";

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export function PathDraw({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-path]",
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <svg
        data-path
        aria-hidden="true"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      >
        <path
          d="M 88 0 C 96 110, 96 210, 70 300 S 8 400, 8 500 S 30 620, 62 700 S 96 860, 88 1000"
          fill="none"
          stroke="#B7D433"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {children}
    </div>
  );
}
