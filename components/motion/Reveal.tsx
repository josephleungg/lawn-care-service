"use client";

import { useRef, type ReactNode } from "react";

import { EASE_OUT, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = root.current?.children;
      if (!items?.length) return;

      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(items, {
          y: 28,
          autoAlpha: 0,
          duration: 0.9,
          ease: EASE_OUT,
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });
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
