"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import "lenis/dist/lenis.css";

import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

export function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOTION_OK);
    const sync = () => setEnabled(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.12, anchors: true }}
    >
      <ScrollTriggerSync />
    </ReactLenis>
  );
}
