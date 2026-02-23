# Dependency Upgrades & Tooling Modernization

## Context

All npm packages are outdated, some with known vulnerabilities (glob,
minimatch). The goal is to upgrade everything to latest, replace ESLint with
Biome (linting + formatting), migrate to Tailwind CSS v4, and use Playwright
visual regression testing to verify no regressions after each phase. Husky +
lint-staged already exist and will be updated for Biome.

Phase 0 (Playwright visual regression baseline) is complete.
Phase 1 (safe semver upgrades) is complete.
Phase 2 (major dependency upgrades) is complete.

---

## ~~Phase 1: Safe semver upgrades~~ DONE

Updated packages within their current version ranges (no breaking changes):
autoprefixer, concurrently, postcss, rollup, stylelint,
stylelint-config-tailwindcss, stylelint-scss. Browserslist DB updated.

---

## ~~Phase 2: Major dependency upgrades (non-tooling)~~ DONE

Upgraded cssnano 6→7, lint-staged 15→16, @rollup/plugin-node-resolve 15→16,
stylelint 16→17, stylelint-scss 6→7. No config changes required — all existing
configs compatible with new major versions.

---

## Phase 3: Replace ESLint with Biome

Biome replaces ESLint for linting AND adds Prettier-like formatting. The
current ESLint config is minimal (`eslint:recommended` + 4 rules), making
migration straightforward.

**Install:**

- `npm install -D @biomejs/biome`
- `npm remove eslint`

**Delete:** `.eslintrc.js`

**Create:** `biome.json`

```json
{
  "$schema": "https://biomejs.dev/schemas/latest/schema.json",
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineEnding": "lf",
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always"
    }
  },
  "files": {
    "include": ["assets/js/**/*.js"]
  }
}
```

**Update `package.json` scripts:**

- `lint:js` → `biome check assets/js/`
- `fix:js` → `biome check --fix assets/js/`

**Update `lint-staged` in `package.json`:**

- `"*.js": "eslint --fix"` → `"*.js": "biome check --fix"`

**Update `.github/workflows/linting.yml`:**

- Change the JS lint step to use `biome check`

**Verify:** `npm run lint:js` passes, `npm run lint` passes, pre-commit hook
works on a JS file

---

## Phase 4: Tailwind CSS v4 Migration

Tailwind v4 is a CSS-first configuration rewrite with 5x faster builds,
container queries, and native CSS nesting.

### Step 1: Run the automated upgrade tool

```bash
npx @tailwindcss/upgrade
```

This will:

- Update `tailwindcss` dependency to v4
- Migrate `tailwind.config.js` → CSS `@theme` directives in `src/tailwind.css`
- Update template files (class name changes)
- Update PostCSS config

### Step 2: Manual review and fixes

- `src/tailwind.css` — verify `@theme` block has all custom colors, fonts,
  transitions
- `tailwind.config.js` — may be removed or simplified
- `postcss.config.js` — Tailwind v4 may change PostCSS plugin usage
- `_includes/sections/*.html` — check for deprecated utility syntax:
  - Arbitrary values: `bg-[--var]` → `bg-(--var)`
  - Any removed/renamed utilities
- `assets/js/modules/theme.js` — verify dark mode toggle still works (v4
  still supports `darkMode: 'class'`)
- Safelist handling — v4 handles content detection differently

### Step 3: Verify CSS output

- `npm run build:css` — builds without errors
- Compare screenshots — light mode, dark mode, all sections
- Check responsive breakpoints (mobile, tablet, desktop)

**Files affected:**

- `src/tailwind.css`
- `tailwind.config.js` (may be deleted)
- `postcss.config.js`
- `_includes/sections/*.html` (template syntax changes)
- `package.json`

**Verify:** Full build passes, `npm test` screenshots match baseline, dark
mode works

---

## Phase 5: Cleanup & Final Verification

1. Include the existing unstaged `npm audit fix` changes
2. Run `npm audit` — check remaining vulnerabilities
3. Run `npm outdated` — should be clean or only intentional holds
4. Run full lint suite: `npm run lint`
5. Run full build: `npm run build:css && npm run build:js`
6. Final screenshot comparison: `npm test`
7. Update `CLAUDE.md` — document Biome usage, updated commands

---

## Files Modified (Summary)

| File | Change |
| --- | --- |
| `package.json` | Dependencies, scripts, lint-staged config |
| `package-lock.json` | Regenerated |
| `.eslintrc.js` | **Deleted** |
| `biome.json` | **Created** — Biome linting + formatting config |
| `.stylelintrc.json` | Verify/update for stylelint 17 |
| `postcss.config.js` | Update for cssnano 7 and Tailwind v4 |
| `src/tailwind.css` | Tailwind v4 `@theme` migration |
| `tailwind.config.js` | May be deleted (migrated to CSS) |
| `_includes/sections/*.html` | Tailwind v4 syntax updates |
| `.github/workflows/linting.yml` | Update JS lint step for Biome |
| `CLAUDE.md` | Update tooling documentation |

## Verification Strategy

- **After each phase:** `npm run lint && npm run build:css && npm run build:js`
- **Screenshot comparison:** `npm test` runs Playwright across 5 browsers
  (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)
- **Dark mode:** Explicitly tested in screenshots
- **Pre-commit hook:** Test with a dummy JS change to verify Biome runs via
  lint-staged
- **CI:** Push to a branch, verify GitHub Actions linting workflow passes
