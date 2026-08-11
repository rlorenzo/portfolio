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

/** Bricolage Grotesque "R" at wght 700, opsz 12, wdth 100, extracted with
 *  opentype.js from the variable TTF at 1000 units/em with the baseline at y=0.
 *  opsz 12 rather than the font's 96 default: the small optical size has sturdier
 *  strokes and more open counters, which is what survives being drawn at 16px.
 *  Re-derive this only if the site's typeface changes. */
const R_PATH =
  'M202 0L40 0L40-660L314-660Q358-660 397.50-652.50Q437-645 469.50-630Q502-615 526-592Q550-569 563-537.50Q576-506 576-466Q576-435 565.50-407.50Q555-380 532.50-358Q510-336 474.50-321.50Q439-307 390-301L390-293Q454-290 489-268Q524-246 541.50-212.50Q559-179 568-140L603 0L424 0L399-131Q393-165 380.50-186Q368-207 345-217Q322-227 284-227L202-227L202 0M202-530L202-352L296-352Q351-352 380-373Q409-394 409-437Q409-484 382-507Q355-530 300-530';
const R_BOX = { x1: 40, y1: -660, x2: 603, y2: 0 };

const CANVAS = 512;
/** Corner radius only on the tab icons. apple-touch and android-chrome are left
 *  square: both platforms apply their own mask, and a pre-rounded source would
 *  show the page behind the corners once masked again. */
const TAB_RADIUS = 64;

function buildSvg({ radius, capFraction }) {
  const scale = (capFraction * CANVAS) / (R_BOX.y2 - R_BOX.y1);
  const tx = CANVAS / 2 - ((R_BOX.x1 + R_BOX.x2) / 2) * scale;
  const ty = CANVAS / 2 - ((R_BOX.y1 + R_BOX.y2) / 2) * scale;
  const round = (n) => Number(n.toFixed(3));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}" role="img" aria-label="Rex Lorenzo">
  <rect width="${CANVAS}" height="${CANVAS}"${radius ? ` rx="${radius}"` : ''} fill="${BRAND}"/>
  <path transform="translate(${round(tx)} ${round(ty)}) scale(${round(scale)})" fill="${PAPER}" d="${R_PATH}"/>
</svg>
`;
}

const tabSvg = buildSvg({ radius: TAB_RADIUS, capFraction: 0.6 });
// Slightly smaller inside the platform masks, which crop toward a squircle.
const maskedSvg = buildSvg({ radius: 0, capFraction: 0.54 });

const RASTERS = [
  { file: 'favicon-16x16.png', size: 16, svg: tabSvg, transparent: true },
  { file: 'favicon-32x32.png', size: 32, svg: tabSvg, transparent: true },
  { file: 'apple-touch-icon.png', size: 180, svg: maskedSvg, transparent: false },
  { file: 'android-chrome-192x192.png', size: 192, svg: maskedSvg, transparent: false },
  { file: 'android-chrome-512x512.png', size: 512, svg: maskedSvg, transparent: false },
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
writeFileSync(join(outDir, 'favicon.svg'), tabSvg);
console.log('  favicon.svg');

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
    console.log(`  ${file}`);
  }

  const icoImages = [];
  for (const size of ICO_SIZES) {
    icoImages.push({ size, data: await rasterize(browser, tabSvg, size, true) });
  }
  writeFileSync(join(outDir, 'favicon.ico'), buildIco(icoImages));
  console.log(`  favicon.ico (${ICO_SIZES.join(', ')})`);
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
