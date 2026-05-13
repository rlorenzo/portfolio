---
name: Rex Lorenzo Portfolio
description: Personal site for a 20+ year engineer and engineering leader; the design is the work sample.
colors:
  brand: "oklch(58% 0.14 50)"
  brand-deep: "oklch(38% 0.11 50)"
  brand-soft: "oklch(96% 0.025 60)"
  paper: "oklch(98% 0.008 60)"
  paper-soft: "oklch(95% 0.014 60)"
  rule: "oklch(88% 0.012 60)"
  ink: "oklch(22% 0.012 50)"
  ink-soft: "oklch(46% 0.012 50)"
  brand-dark: "oklch(75% 0.13 55)"
  brand-deep-dark: "oklch(85% 0.10 55)"
  brand-soft-dark: "oklch(28% 0.045 50)"
  paper-dark: "oklch(18% 0.008 50)"
  paper-soft-dark: "oklch(22% 0.011 50)"
  rule-dark: "oklch(30% 0.013 50)"
  ink-dark: "oklch(95% 0.008 50)"
  ink-soft-dark: "oklch(72% 0.012 50)"
typography:
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontWeight: 600
    lineHeight: 1.1
rounded:
  control: "4px"
  card: "0.5rem"
spacing:
  transitionFast: "0.15s"
  transitionNormal: "0.3s"
  transitionSlow: "0.5s"
components:
  primary-button:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.body}"
---

<!-- markdownlint-disable-next-line MD025 -->
# Design System: Rex Lorenzo Portfolio

> **Snapshot of what currently ships.** This file records the tokens defined in `src/tailwind.css` and the component patterns currently shipped in `_includes/sections/`. The previous design system (Azure/Emerald/Violet palette, Montserrat + Poppins typography, gradient hero, wave dividers) has been removed. Run `/impeccable document` to regenerate `.impeccable/design.json` and refresh this snapshot when tokens change.

## 1. Overview

<!-- markdownlint-disable-next-line MD036 -->
**Creative North Star: "The Practitioner's Portfolio"**

This is the personal site of a 20+ year engineer. The design is the work sample, not the chrome around it. A senior engineer's portfolio should read like the work of someone who ships production software: typography that breathes, spacing that has rhythm, motion that earns its frame budget, copy in one confident voice. Every detail is either evidence Rex builds quality software or evidence against it.

**Key Characteristics:**

- Brand register. The site IS the product; visual choices ARE the work sample.
- Light theme is the default; dark theme is opt-in via a persisted toggle.
- Mobile-credible, desktop-impressive. Recruiters scan on phones; engineering leaders read on laptops.
- Motion respects `prefers-reduced-motion`. Transitions opt out under the reduce-motion query.
- WCAG 2.1 AA is the floor, not the ceiling, in both themes.

## 2. Colors

The palette is intentionally narrow: a single warm brand hue plus warm-tinted neutrals. There is no separate "secondary" or "accent" hue; emphasis comes from weight, scale, and rule lines rather than additional colors. Defined in `oklch` so light and dark themes share a hue and only the lightness shifts.

### Brand

- **Brand** (`oklch(58% 0.14 50)`): The single brand hue, a deep warm amber. Used for the primary button background, the skip-link, the chapter numeral underline, and the focus-ring color.
- **Brand Deep** (`oklch(38% 0.11 50)`): Darker tone of the same hue. Used for hover states and emphasis where the lighter brand would lack contrast on `--paper`.
- **Brand Soft** (`oklch(96% 0.025 60)`): Tinted-paper background for subtle brand surfaces (e.g. button hover tint, callout fills).

### Neutrals (Light)

- **Paper** (`oklch(98% 0.008 60)`): Page background. Warm-tinted near-white.
- **Paper Soft** (`oklch(95% 0.014 60)`): Sunken surface for alternating sections and card fills.
- **Rule** (`oklch(88% 0.012 60)`): Hairline rules, dividers, card borders.
- **Ink** (`oklch(22% 0.012 50)`): Body text and headings.
- **Ink Soft** (`oklch(46% 0.012 50)`): Secondary text, dates, captions.

### Neutrals (Dark)

Same token names, redefined under the `.dark` class on `<html>`:

- **Paper** (`oklch(18% 0.008 50)`), **Paper Soft** (`oklch(22% 0.011 50)`), **Rule** (`oklch(30% 0.013 50)`).
- **Ink** (`oklch(95% 0.008 50)`), **Ink Soft** (`oklch(72% 0.012 50)`).
- **Brand** lifts to `oklch(75% 0.13 55)` for legible contrast on the darker paper.

<!-- markdownlint-disable-next-line MD024 -->
### Named Rules

**The Single-Hue Rule.** One brand color per screen. No status palette is defined because no status messaging is rendered. If status is added later, choose semantic colors then; do not pre-allocate them.

**The Tint-Over-Color Rule.** When a surface needs emphasis short of a brand fill, use `--brand-soft` or `--paper-soft` rather than introducing a second hue.

## 3. Typography

**Body and display:** Bricolage Grotesque (variable, 400 to 700) with `system-ui, sans-serif` fallbacks. A single family carries everything; weight and size do the hierarchy.

### Hierarchy

- **Display** (Bricolage 600, fluid clamp on hero name, line-height 1.1): Hero only.
- **Headline** (Bricolage 600, section-heading size, paired with a chapter numeral): Section titles ("Projects", "Experience", "About").
- **Title** (Bricolage 500-600, ~1.125rem): Card titles (project name, role title, FAQ question).
- **Body** (Bricolage 400, ~1rem, line-height ~1.5): Paragraph copy.
- **Label** (Bricolage 500, smaller scale, set in all caps with widened tracking): The chapter numeral above each section heading.

<!-- markdownlint-disable-next-line MD024 -->
### Named Rules

**The One Voice Rule.** Hero, About, and Contact copy are written as the same person. First-person, plainspoken, no marketing verbs.

**The No-Repeat Rule.** A section's intro paragraph never restates the section heading.

**The No-Em-Dash Rule.** Site copy uses commas, semicolons, periods, or parentheses, never em-dashes. Carried over from PRODUCT.md.

## 4. Elevation

Flat by default. There is no shadow vocabulary; surfaces separate via `--rule` hairlines and `--paper-soft` fills. The sticky header crosses a 1px `--rule` border-bottom only after the page has scrolled past 50px (`.site-header.scrolled`).

<!-- markdownlint-disable-next-line MD024 -->
### Named Rules

**The Flat-First Rule.** Use a hairline, a tint, or whitespace before reaching for a shadow. If a card needs a shadow to read as a card, it usually needs better spacing first.

## 5. Components

### Buttons and Links

- **Primary surface:** `background-color: var(--brand)`, `color: var(--paper)`. Used on the skip-link.
- **Inline links:** Plain ink with a `--brand` underline that animates in on hover. No box around the link.
- **Focus:** Visible focus ring; do not remove it from any interactive element.

### Cards

- **Background:** `--paper` (light) / `--paper` (dark, redefined).
- **Border:** 1px `--rule`.
- **Corners:** 0.5rem.
- **Padding:** Section-driven; cards inherit the section's rhythm rather than defining their own.

### Navigation

- **Site header:** Fixed top, `--paper` background, transparent border-bottom that becomes `--rule` once the page has scrolled (`.site-header.scrolled`). Font-family inherits from `--font-body`.
- **Skip link:** Visible on focus, `--brand` background, anchored to the top-left corner.
- **Theme toggle:** Single button with two stacked SVG icons; visibility flips on the `.dark` class on `<html>`. Persists in `localStorage` with FOUC prevention in `head.html`.

### Section Pattern

Each section in `_includes/sections/` shares:

- A chapter numeral (`01`, `02`, ...) above the heading, set as a small label with a short `--brand` rule.
- An H2 heading in display weight.
- A lede paragraph in body voice.
- Section-specific content; no shared card layout is imposed globally.

## 6. Do's and Don'ts

### Do

- **Do** keep the palette to one brand hue plus warm neutrals. If a new color is needed, justify it against "The Single-Hue Rule".
- **Do** respect `prefers-reduced-motion`. Any new motion must opt out under the reduce-motion media query, as the existing transitions do.
- **Do** cap body measure at a readable line length (~75ch). Long-form copy already holds this; preserve it.
- **Do** keep the focus ring on every interactive element. It is the keyboard-accessibility floor.
- **Do** keep PRODUCT.md's no-em-dash rule in copy. Use commas, colons, semicolons, periods, or parentheses.

### Don't

- **Don't** introduce gradient heroes, wave dividers, glow rings, or hero-metric counter rows (PRODUCT.md anti-references).
- **Don't** add a second brand hue or status palette unless real status messaging is introduced.
- **Don't** add FontAwesome or other inline icon fonts. Inline SVG icons that are decorative must carry `aria-hidden`; icons that are the sole content of a control need an accessible name.
- **Don't** nest cards.
- **Don't** use `background-clip: text` with a gradient.
- **Don't** ship without running `npm run lint` and `npm test`. CLAUDE.md requires both.
- **Don't** mock data or simplify components to bypass an issue. Fix the root cause instead.
