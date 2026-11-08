import Link from "next/link";

import { Icon } from "@/components/Icon";
import { business } from "@/content/business";
import type { Locale } from "@/content/locales";
import type { Dictionary } from "@/dictionaries";

import { LanguageSwitch } from "./LanguageSwitch";
import { NavShell } from "./NavShell";

export function Nav({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { nav } = dict;
  const links = [
    { href: `/${lang}#services`, label: nav.services },
    { href: `/${lang}#process`, label: nav.process },
    { href: `/${lang}#seasons`, label: nav.seasons },
    { href: `/${lang}#area`, label: nav.area },
    { href: `/${lang}#faq`, label: nav.faq },
  ];

  return (
    <NavShell
      labels={{ menu: nav.menu, close: nav.close, nav: nav.label }}
      bar={
        <>
          <Link
            href={`/${lang}`}
            aria-label={business.name}
            className="flex items-baseline gap-2"
          >
            <span lang="zh-Hant" className="font-display text-xl">
              {business.nameZh}
            </span>
            <span className="hidden text-sm sm:inline">{business.name}</span>
          </Link>
          <nav aria-label={nav.label} className="hidden lg:block">
            <ul className="flex gap-6 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-grow">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      }
      actions={
        <>
          <LanguageSwitch
            lang={lang}
            label={nav.switchLabel}
            text={nav.switchText}
          />
          <a
            href={business.phoneHref}
            className="btn btn-lime !min-h-10 !px-4 !py-1 text-sm"
          >
            <Icon name="phone-bold" size={16} />
            <span className="hidden sm:inline">{business.phoneDisplay}</span>
            <span className="sr-only sm:hidden">{business.phoneDisplay}</span>
          </a>
        </>
      }
      menu={
        <>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="display py-1 text-4xl"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${lang}#quote`}
            className="btn btn-lime mt-6 self-start"
          >
            {nav.quote}
          </Link>
        </>
      }
    />
  );
}
