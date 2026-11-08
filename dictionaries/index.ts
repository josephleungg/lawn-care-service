import type { Locale } from "@/content/locales";

import { en, type Dictionary } from "./en";
import { zhHant } from "./zh-Hant";

const dictionaries: Record<Locale, Dictionary> = { en, "zh-Hant": zhHant };

export const getDictionary = (lang: Locale) => dictionaries[lang];
export type { Dictionary };
