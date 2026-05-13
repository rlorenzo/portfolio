#!/usr/bin/env node
// Generates an inline SVG representation of the site title set in the
// signature font. Re-run this when the title or signature font changes:
//   node scripts/generate-signature-svg.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import opentype from 'opentype.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const TEXT = 'Rex Lorenzo';
const FONT_SIZE = 100;
const fontPath = resolve(projectRoot, 'assets/fonts/Tritopani.otf');
const outPath = resolve(projectRoot, '_includes/signature.svg');

const font = opentype.parse(readFileSync(fontPath).buffer);
const path = font.getPath(TEXT, 0, 0, FONT_SIZE);
const pathData = path.toPathData(1);
const { x1, y1, x2, y2 } = path.getBoundingBox();
const pad = 2;
const vbX = (x1 - pad).toFixed(3);
const vbY = (y1 - pad).toFixed(3);
const vbW = (x2 - x1 + pad * 2).toFixed(3);
const vbH = (y2 - y1 + pad * 2).toFixed(3);

// Pen path: a single continuous curve that snakes through the signature
// area with up-and-down rhythm, mimicking cursive pen motion. Animating its
// stroke from 0 to full length progressively reveals the filled signature
// underneath (via the SVG mask below).
const penPath = 'M -10 -30 Q 30 -55 60 -30 Q 100 -10 140 -30 Q 180 -55 220 -30 Q 260 -10 300 -30 Q 340 -55 380 -30 L 410 -30';

const svg = `<svg class="signature" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" role="img" aria-label="${TEXT}" xmlns="http://www.w3.org/2000/svg">
  <title>${TEXT}</title>
  <defs>
    <mask id="signature-pen-mask" maskUnits="userSpaceOnUse" x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}">
      <path class="signature__pen signature__pen--pending" pathLength="1" d="${penPath}"
            fill="none" stroke="white" stroke-width="110" stroke-linecap="round" stroke-linejoin="round"/>
    </mask>
  </defs>
  <path class="signature__stroke" d="${pathData}" mask="url(#signature-pen-mask)"/>
</svg>
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, svg);
console.log(`Wrote ${outPath} (${svg.length} bytes, viewBox ${vbX} ${vbY} ${vbW} ${vbH})`);
