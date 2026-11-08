import type { Locale } from "./locales";

export const business = {
  name: "Natural Lawn Care Service",
  nameZh: "然藝",
  contact: "Leung",
  phoneDisplay: "(416) 319-3838",
  phoneE164: "+14163193838",
  phoneHref: "tel:+14163193838",
} as const;

export const cities: { en: string; "zh-Hant": string }[] = [
  { en: "Toronto", "zh-Hant": "多倫多" },
  { en: "North York", "zh-Hant": "北約克" },
  { en: "Scarborough", "zh-Hant": "士嘉堡" },
  { en: "Etobicoke", "zh-Hant": "怡陶碧谷" },
  { en: "Markham", "zh-Hant": "萬錦" },
  { en: "Richmond Hill", "zh-Hant": "列治文山" },
  { en: "Vaughan", "zh-Hant": "旺市" },
  { en: "Mississauga", "zh-Hant": "密西沙加" },
  { en: "Brampton", "zh-Hant": "賓頓" },
  { en: "Oakville", "zh-Hant": "奧克維爾" },
  { en: "Pickering", "zh-Hant": "皮克靈" },
  { en: "Ajax", "zh-Hant": "阿積士" },
];

export const cityNames = (lang: Locale) => cities.map((city) => city[lang]);
