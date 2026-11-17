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

// The projects section renders the non-featured entries by grouping them on
// `category`, so an entry whose category is missing or misspelled matches no
// group and disappears from the page without any build error.
const projectNames = readFileSync('_data/projects.yml', 'utf8')
  .split(/\r?\n/)
  .flatMap((line) => line.match(/^- name:\s*(.+?)\s*$/)?.slice(1) ?? [])
  // A quoted name is valid YAML, and the obvious fix if one ever contains a
  // colon, so unquote it rather than failing the build on the quotes.
  .map((name) => name.replace(/^(['"])(.*)\1$/, '$2'));
// Guards the check below: if the pattern ever stops matching, `unrendered` is
// empty and 'every project renders' passes without having compared anything.
check('projects.yml has entries', projectNames.length > 0, 'found no `- name:` entries');
// Matched against the rendered element, not the whole document: several project
// names (Moodle, Quasar) also appear in prose elsewhere on the page and would
// pass a bare substring check while missing from the projects section.
const unrendered = projectNames.filter(
  (name) => !html.includes(`<span class="projects__name">${name}</span>`),
);
check('every project renders', unrendered.length === 0, unrendered.join(', '));

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

console.log('\nFavicon matches the palette');
// The whole icon set sat on the pre-2026-05 blue palette for months because the
// SVG was an unreadable LFS pointer and nothing compared it to the design tokens.
const BRAND_HEX = '#a94e00'; // resolved oklch(53% 0.14 50)
const PAPER_HEX = '#fdf7f3'; // resolved oklch(98% 0.008 60)
const faviconSvg = existsSync(svg) ? readFileSync(svg, 'utf8') : '';
check('favicon.svg uses the brand ground', faviconSvg.includes(BRAND_HEX));
const manifestPath = join(SITE, 'assets/favicon/site.webmanifest');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
// The manifest and the meta tag both colour browser chrome, so a mismatch shows
// up as the toolbar changing shade when the site is installed.
check(
  'manifest theme_color is --paper',
  manifest.theme_color === PAPER_HEX,
  `got ${manifest.theme_color}`,
);
check(
  'meta theme-color agrees with the manifest',
  html.includes(`content="${PAPER_HEX}" media="(prefers-color-scheme: light)"`),
);
check('no legacy blue in the icon set', !/#(3b82f6|1f4ed8|0b1220)/i.test(faviconSvg + JSON.stringify(manifest)));

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
  'agent-code-review.md',
  'agent-review-summary.md',
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
