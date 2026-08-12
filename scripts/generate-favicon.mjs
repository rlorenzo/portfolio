/**
 * Generates the whole favicon set from the design tokens.
 *
 * The mark is a single "R" on the brand amber ground. One letter rather than the
 * old "REX" because a favicon lives at 16px, where three letters merge into a
 * smudge.
 *
 * The letterform is a Bricolage Grotesque outline, embedded below as path data
 * rather than typeset with <text>. An SVG favicon that names a font renders in
 * whatever the viewer happens to have installed, which is exactly how the
 * previous icon ended up in a different typeface on most machines.
 *
 * Rasterizing goes through Chromium (already present for Playwright) so the PNGs
 * come from the same renderer that draws the SVG in a browser tab. The .ico is
 * assembled here too: the format is just a small header wrapping PNG payloads,
 * which avoids a system ImageMagick dependency.
 *
 *   node scripts/generate-favicon.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(projectRoot, 'assets/favicon');

/** Resolved from the oklch tokens in DESIGN.md by painting them to a canvas in
 *  Chrome, so these are exactly what the site renders. Paper on brand measures
 *  5.2:1, so the mark clears WCAG AA against its own ground. */
const BRAND = '#a94e00'; // oklch(53% 0.14 50)
const PAPER = '#fdf7f3'; // oklch(98% 0.008 60)

/** Bricolage Grotesque at wght 700, opsz 12, wdth 100, extracted with opentype.js
 *  from the variable TTF at 1000 units/em with the baseline at y=0. opsz 12 rather
 *  than the font's 96 default: the small optical size has sturdier strokes and more
 *  open counters, which is what survives being drawn small.
 *
 *  The wordmark is composed from per-glyph advances rather than font.getPath(),
 *  which routes through GSUB shaping that this font trips ("lookupType 6
 *  substFormat 2 not supported"), with -20/1000em tracking to tighten it.
 *  Re-derive both only if the site's typeface changes. */
const MARKS = {
  R: {
    box: { x1: 40, y1: -660, x2: 603, y2: 0 },
    path: 'M202 0L40 0L40-660L314-660Q358-660 397.50-652.50Q437-645 469.50-630Q502-615 526-592Q550-569 563-537.50Q576-506 576-466Q576-435 565.50-407.50Q555-380 532.50-358Q510-336 474.50-321.50Q439-307 390-301L390-293Q454-290 489-268Q524-246 541.50-212.50Q559-179 568-140L603 0L424 0L399-131Q393-165 380.50-186Q368-207 345-217Q322-227 284-227L202-227L202 0M202-530L202-352L296-352Q351-352 380-373Q409-394 409-437Q409-484 382-507Q355-530 300-530',
  },
  REX: {
    box: { x1: 40, y1: -660, x2: 1727, y2: 0 },
    path: 'M202 0L40 0L40-660L314-660Q358-660 397.50-652.50Q437-645 469.50-630Q502-615 526-592Q550-569 563-537.50Q576-506 576-466Q576-435 565.50-407.50Q555-380 532.50-358Q510-336 474.50-321.50Q439-307 390-301L390-293Q454-290 489-268Q524-246 541.50-212.50Q559-179 568-140L603 0L424 0L399-131Q393-165 380.50-186Q368-207 345-217Q322-227 284-227L202-227L202 0M202-530L202-352L296-352Q351-352 380-373Q409-394 409-437Q409-484 382-507Q355-530 300-530M797 0L635 0L635-660L797-660L797 0M1107 0L756 0L756-135L1107-135L1107 0M1061-272L756-272L756-393L1061-393L1061-272M1107-525L756-525L756-660L1107-660M1318 0L1126 0L1319-327L1126-660L1318-660L1424-413L1426-413L1529-660L1726-660L1534-329L1727 0L1529 0L1427-253L1425-253',
  },
};

/** The wordmark wherever it is readable, the single letter only where it is not.
 *  Threshold picked by rendering both marks at 16/24/32/40/48/64 and looking:
 *  "REX" is mush at 16, soft at 24, and cleanly legible from 32 up. So 16 is the
 *  only raster that falls back to the monogram. */
const WORDMARK_MIN_PX = 32;
const markFor = (size) => (size >= WORDMARK_MIN_PX ? 'REX' : 'R');

const CANVAS = 512;
/** Corner radius only on the tab icons. apple-touch and android-chrome are left
 *  square: both platforms apply their own mask, and a pre-rounded source would
 *  show the page behind the corners once masked again. */
const TAB_RADIUS = 64;

/** Fits the mark inside the canvas at the given fractions, preserving its aspect.
 *  Whichever axis runs out first governs, so the wide wordmark is bound by width
 *  and the near-square letter by height. */
function buildSvg({ mark, radius, widthFraction, heightFraction }) {
  const { path, box } = MARKS[mark];
  const scale = Math.min(
    (widthFraction * CANVAS) / (box.x2 - box.x1),
    (heightFraction * CANVAS) / (box.y2 - box.y1),
  );
  const tx = CANVAS / 2 - ((box.x1 + box.x2) / 2) * scale;
  const ty = CANVAS / 2 - ((box.y1 + box.y2) / 2) * scale;
  const round = (n) => Number(n.toFixed(3));
  const label = mark === 'REX' ? 'Rex Lorenzo' : 'Rex Lorenzo monogram';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}" role="img" aria-label="${label}">
  <rect width="${CANVAS}" height="${CANVAS}"${radius ? ` rx="${radius}"` : ''} fill="${BRAND}"/>
  <path transform="translate(${round(tx)} ${round(ty)}) scale(${round(scale)})" fill="${PAPER}" d="${path}"/>
</svg>
`;
}

/** Tab icons keep a corner radius. apple-touch and android-chrome stay square and
 *  sit slightly tighter, since both platforms crop toward a squircle themselves. */
const tabSvg = (size) =>
  buildSvg({ mark: markFor(size), radius: TAB_RADIUS, widthFraction: 0.78, heightFraction: 0.6 });
const maskedSvg = (size) =>
  buildSvg({ mark: markFor(size), radius: 0, widthFraction: 0.7, heightFraction: 0.54 });

const RASTERS = [
  { file: 'favicon-16x16.png', size: 16, svg: tabSvg(16), transparent: true },
  { file: 'favicon-32x32.png', size: 32, svg: tabSvg(32), transparent: true },
  { file: 'apple-touch-icon.png', size: 180, svg: maskedSvg(180), transparent: false },
  { file: 'android-chrome-192x192.png', size: 192, svg: maskedSvg(192), transparent: false },
  { file: 'android-chrome-512x512.png', size: 512, svg: maskedSvg(512), transparent: false },
];
const ICO_SIZES = [16, 32, 48];

async function rasterize(browser, svg, size, transparent) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(
    `<!doctype html><style>html,body{margin:0;padding:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
  );
  const buffer = await page.screenshot({ omitBackground: transparent });
  await page.close();
  return buffer;
}

/** ICO is a 6-byte header, one 16-byte directory entry per image, then the
 *  payloads. Modern icons embed PNG directly, so no BMP encoding is needed. */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

mkdirSync(outDir, { recursive: true });
/** The SVG has to commit to one mark: it is resolution-independent, and there is
 *  no reliable way for a favicon to switch artwork by rendered size.
 *
 *  It carries the monogram because modern browsers prefer the SVG over every PNG
 *  in head.html, and the place they use it is the tab, at ~16-20 CSS px, where
 *  three letters do not resolve. The wordmark still reaches every larger surface:
 *  the 32px raster, the 48px entry in the .ico, apple-touch, and android-chrome. */
writeFileSync(join(outDir, 'favicon.svg'), tabSvg(16));
console.log('  favicon.svg (R, tab-sized)');

let browser;
try {
  browser = await chromium.launch();
} catch (error) {
  console.error(
    '\nCould not launch Chromium. Playwright downloads browsers separately from\n' +
      'the npm package; run `npx playwright install` (or `npm run setup`).\n',
  );
  throw error;
}
try {
  for (const { file, size, svg, transparent } of RASTERS) {
    writeFileSync(join(outDir, file), await rasterize(browser, svg, size, transparent));
    console.log(`  ${file} (${markFor(size)})`);
  }

  const icoImages = [];
  for (const size of ICO_SIZES) {
    icoImages.push({ size, data: await rasterize(browser, tabSvg(size), size, true) });
  }
  writeFileSync(join(outDir, 'favicon.ico'), buildIco(icoImages));
  console.log(`  favicon.ico (${ICO_SIZES.map((s) => `${s}:${markFor(s)}`).join(", ")})`);
} finally {
  await browser.close();
}

const manifest = {
  name: 'Rex Lorenzo Portfolio',
  short_name: 'Rex Lorenzo',
  icons: [
    { src: 'android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: 'android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
  // Chrome colour, not brand colour: this is the installed app's toolbar and
  // splash, and it has to agree with the <meta name="theme-color"> in head.html.
  // The amber lives in the mark, not the surrounding UI.
  theme_color: PAPER,
  background_color: PAPER,
  display: 'standalone',
};
writeFileSync(join(outDir, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log('  site.webmanifest');
