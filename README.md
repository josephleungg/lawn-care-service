# Natural Lawn Care Service (然藝)

Bilingual marketing site built with Next.js, GSAP and Lenis.

## Development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in the values. The quote form needs the Resend values; until they are set it shows the phone number instead of sending.

## Editing content

- Business name, phone and cities: `content/business.ts`
- Services: `content/services.ts`
- All other text, in both languages: `dictionaries/`
- After adding new Chinese text, run `node scripts/subset-zh-font.mjs` to update the display font.
- Images: `public/images/`. Keep the same filenames to replace one. Sources are in `public/images/CREDITS.md`.
