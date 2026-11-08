import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { business } from "@/content/business";
import { isLocale, locales } from "@/content/locales";
import { localBusinessJsonLd, siteUrl } from "@/content/seo";
import { getDictionary } from "@/dictionaries";

import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
const notoSerif = localFont({
  src: "../fonts/noto-serif-tc-subset.woff2",
  variable: "--font-noto-serif-tc",
  display: "swap",
  preload: false,
});

// Marks that JS can run, and reveals the hero copy if the bundle never arrives.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js','js-intro');setTimeout(function(){d.classList.remove('js-intro')},2000)})()`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const name = lang === "en" ? business.name : `${business.nameZh} ${business.name}`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: name, template: `%s | ${name}` },
    applicationName: business.name,
    formatDetection: { telephone: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrument.variable} ${lang === "zh-Hant" ? notoSerif.variable : ""}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.nav.skip}
        </a>
        <JsonLd data={localBusinessJsonLd(lang, dict.meta.description)} />
        <SmoothScroll />
        <Nav lang={lang} dict={dict} />
        <main id="main">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
