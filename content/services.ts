import type { Locale } from "./locales";

export const serviceSlugs = [
  "regular-lawn-cutting",
  "lawn-care",
  "aeration",
  "lawn-repairing",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const isServiceSlug = (value: string): value is ServiceSlug =>
  (serviceSlugs as readonly string[]).includes(value);

type ServiceCopy = {
  name: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string }[];
  imageAlt: string;
};

export type Service = {
  slug: ServiceSlug;
  image: string;
  nameEn: string;
  nameZh: string;
  copy: Record<Locale, ServiceCopy>;
};

export const services: Service[] = [
  {
    slug: "regular-lawn-cutting",
    image: "/images/services/regular-lawn-cutting.jpg",
    nameEn: "Regular Lawn Cutting",
    nameZh: "定期剪草",
    copy: {
      en: {
        name: "Regular Lawn Cutting",
        summary:
          "Cutting on a steady schedule keeps the lawn even and stops growth from getting away from you.",
        metaTitle: "Regular Lawn Cutting in Toronto and the GTA",
        metaDescription:
          "Regular lawn cutting for homes across Toronto and the GTA. Call Natural Lawn Care Service at (416) 319-3838 for a quote.",
        intro:
          "A lawn stays healthier when it is cut little and often. Taking off a lot of height at once stresses the grass, so a regular schedule does more than keep things tidy.",
        sections: [
          {
            heading: "Why regular cutting matters",
            body: "Cutting often encourages thicker growth and leaves less room for weeds. It also avoids the scalped, yellow look of a lawn that has been left too long and then cut hard.",
          },
          {
            heading: "Is it right for your lawn?",
            body: "If you would rather not think about the mower from spring to fall, regular cutting is the place to start. Call to talk through your property and how often it needs cutting.",
          },
        ],
        imageAlt:
          "Illustrative image of freshly cut grass meeting a band of taller uncut grass",
      },
      "zh-Hant": {
        name: "定期剪草",
        summary: "按時修剪，草地平整好看，也不怕草長得太快難以收拾。",
        metaTitle: "多倫多及大多區定期剪草服務",
        metaDescription:
          "然藝 Natural Lawn Care Service 為多倫多及大多區住宅提供定期剪草服務。請致電 (416) 319-3838 查詢報價。",
        intro:
          "草地要健康，最好是少量多次地修剪。一次剪掉太多會傷害草皮，所以定期修剪不只是為了整齊。",
        sections: [
          {
            heading: "為甚麼要定期剪草",
            body: "經常修剪能讓草長得更密，雜草也較難生長，還可避免草長得太高後一次剪短，令草地發黃。",
          },
          {
            heading: "適合您的草地嗎？",
            body: "如果您不想從春天到秋天都為剪草操心，可以從定期剪草開始。歡迎致電，談談您的物業和需要修剪的次數。",
          },
        ],
        imageAlt: "示意圖片：剛修剪的草地與未修剪的長草相接",
      },
    },
  },
  {
    slug: "lawn-care",
    image: "/images/services/lawn-care.jpg",
    nameEn: "Lawn Care",
    nameZh: "草地護理",
    copy: {
      en: {
        name: "Lawn Care",
        summary:
          "Ongoing attention to the condition of your lawn, so small problems are caught before they spread.",
        metaTitle: "Lawn Care in Toronto and the GTA",
        metaDescription:
          "Lawn care for homes across Toronto and the GTA from Natural Lawn Care Service. Call (416) 319-3838 to talk about your lawn.",
        intro:
          "Every lawn has its own soil, shade and history. Good lawn care starts with looking closely at what yours needs and looking after it through the season.",
        sections: [
          {
            heading: "Looking after the whole lawn",
            body: "Thin areas, discoloured patches and tired soil rarely fix themselves. Regular attention means they get noticed early, when they are easier to put right.",
          },
          {
            heading: "Tell us about your lawn",
            body: "Call and describe what you are seeing. We will talk through what your lawn needs.",
          },
        ],
        imageAlt: "Illustrative close-up of healthy grass blades covered in morning dew",
      },
      "zh-Hant": {
        name: "草地護理",
        summary: "持續留意草地狀況，在小問題擴大之前及早發現。",
        metaTitle: "多倫多及大多區草地護理服務",
        metaDescription:
          "然藝 Natural Lawn Care Service 為多倫多及大多區住宅提供草地護理服務。請致電 (416) 319-3838 查詢。",
        intro:
          "每片草地的泥土、日照和狀況都不一樣。好的護理，要從細看您的草地需要甚麼開始，再在整個生長季節細心照顧。",
        sections: [
          {
            heading: "照顧整片草地",
            body: "草地變薄、變色或泥土狀況變差，很少會自行好轉。定期留意就能及早發現，處理起來也更容易。",
          },
          {
            heading: "告訴我們您的草地狀況",
            body: "歡迎致電告訴我們您看到的情況，我們會一起談談您的草地需要甚麼。",
          },
        ],
        imageAlt: "示意圖片：帶有晨露的健康草葉特寫",
      },
    },
  },
  {
    slug: "aeration",
    image: "/images/services/aeration.jpg",
    nameEn: "Aeration",
    nameZh: "打孔加泥",
    copy: {
      en: {
        name: "Aeration",
        summary:
          "Opening up compacted soil lets air, water and nutrients reach the roots again.",
        metaTitle: "Lawn Aeration in Toronto and the GTA",
        metaDescription:
          "Lawn aeration across Toronto and the GTA. Natural Lawn Care Service loosens compacted soil so your grass can root deeper. Call (416) 319-3838.",
        intro:
          "Over time, foot traffic and rain press the soil under a lawn together. Aeration punches small holes through the surface and adds soil, giving roots room to grow.",
        sections: [
          {
            heading: "Signs your lawn needs it",
            body: "Water that pools or runs off, ground that feels hard underfoot, and grass that thins out despite regular care can all point to compacted soil.",
          },
          {
            heading: "When to aerate",
            body: "Aeration works best while grass is actively growing, which in Ontario usually means spring or fall. Fall is a popular choice because the lawn has time to recover before winter.",
          },
        ],
        imageAlt: "Illustrative image of a lawn with soil plugs and holes after aeration",
      },
      "zh-Hant": {
        name: "打孔加泥",
        summary: "鬆開壓實的泥土，讓空氣、水分和養分重新到達草根。",
        metaTitle: "多倫多及大多區草地打孔加泥服務",
        metaDescription:
          "然藝 Natural Lawn Care Service 在多倫多及大多區提供草地打孔加泥服務，鬆開壓實的泥土，讓草根長得更深。請致電 (416) 319-3838。",
        intro:
          "經過長時間的踩踏和雨水，草地下的泥土會逐漸壓實。打孔加泥是在草地上打出小孔，再加入新泥，讓草根有空間生長。",
        sections: [
          {
            heading: "草地需要打孔的跡象",
            body: "積水或雨水流走、地面踩起來很硬，或者一直有打理但草仍然變薄，都可能表示泥土已被壓實。",
          },
          {
            heading: "甚麼時候打孔",
            body: "打孔最好在草生長旺盛的時候進行，在安大略省通常是春天或秋天。很多人選擇秋天，因為草地在入冬前有時間恢復。",
          },
        ],
        imageAlt: "示意圖片：打孔後留有泥芯和小孔的草地",
      },
    },
  },
  {
    slug: "lawn-repairing",
    image: "/images/services/lawn-repairing.jpg",
    nameEn: "Lawn Repairing",
    nameZh: "修補草皮",
    copy: {
      en: {
        name: "Lawn Repairing",
        summary:
          "Bare, thin or damaged patches are restored so the lawn reads as one even surface again.",
        metaTitle: "Lawn Repair in Toronto and the GTA",
        metaDescription:
          "Lawn repair across Toronto and the GTA. Natural Lawn Care Service restores bare and damaged patches. Call (416) 319-3838 for a quote.",
        intro:
          "Winter, pets, heavy use and dry summers can all leave marks on a lawn. Repairing those areas brings the lawn back to one even surface.",
        sections: [
          {
            heading: "What can be repaired",
            body: "Bare spots, thin areas and damaged patches are all worth repairing. Leaving them open gives weeds an easy place to move in.",
          },
          {
            heading: "When to repair",
            body: "Repairs take best in the mild, moist weather of spring and fall, when new grass can settle in before heat or frost arrives.",
          },
        ],
        imageAlt:
          "Illustrative image of a fresh square of turf fitted into an older lawn",
      },
      "zh-Hant": {
        name: "修補草皮",
        summary: "修補光禿、稀薄或受損的地方，讓草地恢復平整一致。",
        metaTitle: "多倫多及大多區修補草皮服務",
        metaDescription:
          "然藝 Natural Lawn Care Service 在多倫多及大多區提供修補草皮服務，修復光禿和受損的草地。請致電 (416) 319-3838 查詢報價。",
        intro:
          "冬天、寵物、頻繁踩踏和乾燥的夏天，都可能在草地上留下痕跡。修補這些地方，草地就能恢復平整一致。",
        sections: [
          {
            heading: "哪些地方可以修補",
            body: "光禿、稀薄和受損的地方都值得修補。如果置之不理，雜草很容易趁機生長。",
          },
          {
            heading: "甚麼時候修補",
            body: "修補最適合在春秋兩季溫和濕潤的天氣進行，新草能在炎熱或霜凍來臨前扎根。",
          },
        ],
        imageAlt: "示意圖片：一塊新草皮鋪在舊草地上",
      },
    },
  },
];

export const getService = (slug: ServiceSlug) =>
  services.find((service) => service.slug === slug)!;
