import type { Metadata } from "next";

import Link from "next/link";

import { en } from "@/dictionaries/en";

import "./globals.css";

export const metadata: Metadata = {
  title: en.notFound.title,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="shell flex min-h-svh flex-col items-start justify-center gap-6">
          <h1 className="text-5xl font-semibold">{en.notFound.title}</h1>
          <Link href="/en" className="underline underline-offset-4">
            {en.notFound.home}
          </Link>
        </main>
      </body>
    </html>
  );
}
