// Rebuilds app/fonts/noto-serif-tc-subset.woff2 with only the Chinese characters
// the site uses. Run `node scripts/subset-zh-font.mjs` after adding new Chinese copy.
import { readFileSync, writeFileSync } from "node:fs";

const sources = [
  "dictionaries/zh-Hant.ts",
  "content/services.ts",
  "content/business.ts",
];
const text = sources.map((file) => readFileSync(file, "utf8")).join("");
const chars = [...new Set(text.match(/[　-〿㐀-鿿＀-￯]/gu))];

const css = await fetch(
  `https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400&text=${encodeURIComponent(chars.join(""))}`,
  { headers: { "User-Agent": "Mozilla/5.0 (Macintosh) Chrome/120 Safari/537.36" } },
).then((response) => response.text());

const url = css.match(/url\((https:[^)]+)\)/)?.[1];
if (!url) throw new Error(`No font URL in response:\n${css}`);

const font = await fetch(url).then((response) => response.arrayBuffer());
writeFileSync("app/fonts/noto-serif-tc-subset.woff2", Buffer.from(font));
console.log(`${chars.length} characters, ${Math.round(font.byteLength / 1024)}KB`);
