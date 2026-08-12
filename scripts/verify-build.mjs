/**
 * Smoke-checks the built _site/ directory.
 *
 * This is deliberately not a visual test. Screenshot baselines cannot run in CI
 * because they are generated on macOS and CI renders on Linux, so this asserts
 * the structural invariants that pixel diffing would otherwise be the only thing
 * protecting: that the page has its sections, that its assets are real files
 * rather than stubs, and that the publish boundary still holds.
 *
 * Every check here exists because the thing it checks has broken before.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE = '_site';
const SECTIONS = ['hero', 'about', 'projects', 'experience', 'presentations', 'faq', 'contact'];
// A Git LFS pointer's first line is exactly this. Compared as a whole line
// rather than searched for as a substring: substring matching would also flag
// any small file that merely mentions the URL, and reads to CodeQL as URL
// sanitization (js/incomplete-url-substring-sanitization).
const LFS_POINTER_VERSION_LINE = 'version https://git-lfs.github.com/spec/v1';

const failures = [];

function check(label, condition, detail) {
  if (condition) {
    console.log(`  ok    ${label}`);
    return;
  }
  console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`);
  failures.push(label);
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

if (!existsSync(SITE)) {
  console.error(`${SITE}/ not found. Run \`npm run build\` first.`);
  process.exit(1);
}

const html = readFileSync(join(SITE, 'index.html'), 'utf8');

console.log('\nPage structure');
for (const id of SECTIONS) {
  check(`section #${id} rendered`, html.includes(`id="${id}"`));
}

console.log('\nAssets are real files, not stubs');
const assets = [
  ['assets/js/bundle.js', 1024],
  ['assets/css/styles.min.css', 1024],
  ['assets/fonts/bricolage-grotesque-latin.woff2', 10_000],
  ['assets/fonts/bricolage-grotesque-latin-ext.woff2', 10_000],
];
for (const [path, minBytes] of assets) {
  const full = join(SITE, path);
  const size = existsSync(full) ? statSync(full).size : 0;
  check(`${path} >= ${minBytes}B`, size >= minBytes, `got ${size}B`);
}

// Both of these shipped as ~130-byte Git LFS pointer stubs until 4ba3a8b.
const pdf = join(SITE, 'assets/Rex Lorenzo - Resume.pdf');
check(
  'resume is a real PDF',
  existsSync(pdf) && readFileSync(pdf).subarray(0, 5).toString() === '%PDF-',
  'file is missing or not a PDF',
);
const svg = join(SITE, 'assets/favicon/favicon.svg');
check(
  'favicon.svg is real SVG',
  existsSync(svg) && readFileSync(svg, 'utf8').trimStart().startsWith('<svg'),
  'file is missing or not an SVG',
);

const pointers = walk(SITE)
  .filter((file) => statSync(file).size < 200)
  .filter((file) => readFileSync(file, 'utf8').split('\n', 1)[0].trimEnd() === LFS_POINTER_VERSION_LINE)
  .map((file) => relative(SITE, file));
check('no Git LFS pointer files published', pointers.length === 0, pointers.join(', '));

console.log('\nSelf-hosted fonts');
check('no Google Fonts requests', !/fonts\.(googleapis|gstatic)\.com/.test(html));
check('font preload present', html.includes('bricolage-grotesque-latin.woff2'));

console.log('\nPublish boundary');
// _config.yml `exclude` is the only thing keeping these out of the deploy, and
// they were all being served publicly until 7cbacd5. Listed explicitly rather
// than derived from _config.yml: the point is to catch an entry being dropped
// from that exclude list, which a config-derived list would silently stop
// checking at exactly the moment it started mattering.
const NEVER_PUBLISHED = [
  'tests',
  'playwright-report',
  'PRODUCT.md',
  'DESIGN.md',
  'CLAUDE.md',
  'AGENTS.md',
  'README.md',
  'LICENSE',
];
for (const path of NEVER_PUBLISHED) {
  check(`${path} not published`, !existsSync(join(SITE, path)));
}
check(
  'build-only OTF not published',
  !existsSync(join(SITE, 'assets/fonts/Tritopani.otf')),
);

if (failures.length > 0) {
  console.error(`\n${failures.length} check(s) failed.\n`);
  process.exit(1);
}
console.log('\nAll build checks passed.\n');
