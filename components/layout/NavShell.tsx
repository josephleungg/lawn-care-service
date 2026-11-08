"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";

type NavShellProps = {
  bar: ReactNode;
  actions: ReactNode;
  menu: ReactNode;
  labels: { menu: string; close: string; nav: string };
};

export function NavShell({ bar, actions, menu, labels }: NavShellProps) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setHidden(self.direction === 1 && self.scroll() > 120),
    });
  });

  useEffect(() => {
    if (!open) return;

    if (lenis) lenis.stop();
    else document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  return (
    <>
      <header
        className="site-nav on-dark"
        data-hidden={hidden && !open}
      >
        <div className="flex items-center justify-between gap-3 rounded-full bg-forest py-2 pr-2 pl-5 text-bone">
          {bar}
          <div className="flex items-center gap-2">
            {actions}
            <button
              ref={toggle}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="btn btn-line !min-h-10 !px-4 !py-1 text-sm lg:!hidden"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? labels.close : labels.menu}
            </button>
          </div>
        </div>
      </header>
      <nav
        id="mobile-menu"
        aria-label={labels.nav}
        className="mobile-menu on-dark lg:hidden"
        data-open={open}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        {menu}
      </nav>
    </>
  );
}
