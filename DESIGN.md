---
name: Rex Lorenzo Portfolio
description: Personal site for a 20+ year engineer and engineering leader; the design is the work sample.
colors:
  azure-primary: "#2563eb"
  emerald-secondary: "#10b981"
  violet-accent: "#8b5cf6"
  meadow-success: "#22c55e"
  amber-warning: "#f59e0b"
  crimson-danger: "#ef4444"
  cyan-info: "#06b6d4"
  surface-light: "#ffffff"
  surface-light-sunken: "#f3f4f6"
  ink-light: "#111827"
  ink-light-muted: "#4b5563"
  hairline-light: "#e5e7eb"
  surface-dark: "#111827"
  surface-dark-raised: "#1f2937"
  ink-dark: "#f9fafb"
  ink-dark-muted: "#d1d5db"
  hairline-dark: "#374151"
typography:
  display:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(2.25rem, 4vw + 1rem, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(1.875rem, 2.5vw + 0.5rem, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  button: "0.375rem"
  card: "0.5rem"
  pill: "9999px"
spacing:
  card-padding: "1.5rem"
  grid-gap: "2rem"
  section-y-tight: "4rem"
  section-y: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.azure-primary}"
    textColor: "{colors.surface-light}"
    rounded: "{rounded.button}"
    padding: "0.5rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.azure-primary}"
    textColor: "{colors.surface-light}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.azure-primary}"
    rounded: "{rounded.button}"
    padding: "0.5rem 1rem"
  button-outline-hover:
    backgroundColor: "{colors.azure-primary}"
    textColor: "{colors.azure-primary}"
  card:
    backgroundColor: "{colors.surface-light}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-padding}"
  skill-chip:
    textColor: "{colors.azure-primary}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.75rem"
  contribution-badge:
    textColor: "{colors.emerald-secondary}"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.625rem"
  nav-link:
    textColor: "{colors.ink-light-muted}"
    typography: "{typography.body}"
---

<!-- markdownlint-disable-next-line MD025 -->
# Design System: Rex Lorenzo Portfolio

> **Snapshot, not endorsement.** This file documents the tokens currently shipped in `src/tailwind.css` and the components currently shipped in `_includes/sections/`. PRODUCT.md flags the current visual language as a generic dev-portfolio template that the site should design away from, not toward. The frontmatter records the real implementation values so AI agents stop inventing alternates. The Do's and Don'ts encode the path forward.

## 1. Overview

<!-- markdownlint-disable-next-line MD036 -->
**Creative North Star: "The Practitioner's Portfolio"**

This is the personal site of a 20+ year engineer. The design is the work sample, not the chrome around it. A senior engineer's portfolio should read like the work of someone who ships production software: typography that breathes, spacing that has rhythm, motion that earns its frame budget, copy in one confident voice. Every detail is either evidence Rex builds quality software or evidence against it. There is no third option.

The current implementation leans on conventions the design should explicitly reject: a blue + purple gradient hero, an emerald success accent dropped in for variety, Poppins set on everything, FontAwesome icons inline with most headings, wave SVG dividers between every section, glow rings around the avatar. These are the things to design away from. The frontmatter below documents them as they currently exist so AI agents don't unknowingly reintroduce the same patterns under different names.

**Key Characteristics:**

- Brand register. The site IS the product; visual choices ARE the work sample.
- Light theme is the default; dark theme is opt-in via a persisted toggle.
- Mobile-credible, desktop-impressive. Recruiters scan on phones; engineering leaders read on laptops.
- Motion respects `prefers-reduced-motion`. Any animation that hides content when reduce-motion is on must still leave the content reachable.
- WCAG 2.1 AA is the floor, not the ceiling, in both themes.

## 2. Colors

The current palette is a five-color SaaS-template arrangement: a saturated blue primary, an emerald success accent, a violet brand accent, plus standard amber/red/cyan status colors. PRODUCT.md names this exact arrangement (blue primary + purple accent + green success) as an anti-reference. The values are documented because they're shipped; the strategic direction is to commit to fewer colors with more intent.

### Primary

- **Azure Primary** (`#2563eb`): Currently applied to buttons, links, hover states, the timeline gradient stop, the focus ring color, and the underline accents under each section heading. High visibility, high familiarity, low distinctiveness. If kept, it should be used on far less than the current surface area.

### Secondary

- **Emerald Secondary** (`#10b981`): Used on contribution badges, the timeline gradient mid-stop, and `text-secondary` link variants on the project cards. Functions as both a brand accent and a success-state color, which conflates two roles.

### Tertiary

- **Violet Accent** (`#8b5cf6`): Hero gradient endpoint and `hover:text-accent` for some links. Decorative. Currently has no semantic role distinct from the primary.

### Status

- **Meadow Success** (`#22c55e`): Reserved for state messaging; not currently rendered on any page.
- **Amber Warning** (`#f59e0b`): Reserved for state messaging.
- **Crimson Danger** (`#ef4444`): Reserved for state messaging.
- **Cyan Info** (`#06b6d4`): Reserved for state messaging.

### Neutral (Light Theme)

- **Surface Light** (`#ffffff`): Page background, card surface.
- **Surface Light Sunken** (`#f3f4f6`): Alternating section background (Projects, FAQ).
- **Ink Light** (`#111827`): Body text, headings.
- **Ink Light Muted** (`#4b5563`): Secondary text, dates, captions.
- **Hairline Light** (`#e5e7eb`): Card borders, theme-toggle border.

### Neutral (Dark Theme)

- **Surface Dark** (`#111827`): Page background.
- **Surface Dark Raised** (`#1f2937`): Card surface, mobile menu, raised UI.
- **Ink Dark** (`#f9fafb`): Body text, headings.
- **Ink Dark Muted** (`#d1d5db`): Secondary text.
- **Hairline Dark** (`#374151`): Card borders, dividers.

<!-- markdownlint-disable-next-line MD024 -->
### Named Rules

**The Restraint Rule.** No single screen should carry more than one strong accent. The current hero gradient (Azure to Violet) and the contribution-badge Emerald are two voices speaking over each other. Pick one and demote the other to neutrals.

**The Status-Is-Not-Brand Rule.** Success / warning / danger / info colors are for state messaging only. They are never decorative. Emerald on a contribution badge is borrowing a status color for branding, and it should not.

## 3. Typography

**Display Font:** Montserrat (700) with `sans-serif` fallback. Loaded via Google Fonts in `_includes/head.html`.
**Body Font:** Poppins (400/500/600/700) with `sans-serif` fallback. Same source.
**Label Font:** Poppins, uppercase, `letter-spacing: 0.05em`.

**Character:** Montserrat + Poppins is the default pairing of dozens of free portfolio templates, and PRODUCT.md names "Poppins everywhere" as an anti-reference. The current site reads competent but undistinguished. The pairing should change. Until it does, hierarchy is driven by weight contrast (400 body, 600 emphasis, 700 headings) and size (clamp-based fluid scale on display and headline).

### Hierarchy

- **Display** (Montserrat 700, `clamp(2.25rem, 4vw + 1rem, 3.75rem)`, line-height 1.1): Hero name only. One per page.
- **Headline** (Montserrat 700, `clamp(1.875rem, 2.5vw + 0.5rem, 2.25rem)`, line-height 1.2): Section titles ("Projects", "Experience", "About"). Always centered, with a 1px Azure underline that spans two-thirds of the title width.
- **Title** (Montserrat 600, `1.25rem`, line-height 1.4): Card titles (project name, role title, FAQ question).
- **Body** (Poppins 400, `1rem`, line-height 1.6): Paragraph copy and list items. Long-form copy caps at roughly `max-w-3xl` ( ~48rem) which keeps measure under 75ch at the body size.
- **Label** (Poppins 600, `0.75rem`, `letter-spacing: 0.05em`, uppercase): Group labels in the Skills and Background blocks ("LANGUAGES", "EDUCATION").

<!-- markdownlint-disable-next-line MD024 -->
### Named Rules

**The One Voice Rule.** Hero, About, and Contact copy are written as the same person. The current copy mostly holds this line (first-person, plainspoken, no marketing verbs). Any new section copy must read in the same voice. No "Building innovative solutions" filler.

**The No-Repeat Rule.** A section's intro paragraph never restates the section heading. The Projects section heading is "Projects"; the supporting copy must add information ("public work and contributions"), not restate the title.

## 4. Elevation

The system uses a flat-by-default surface model with hover-only elevation. Cards rest at `shadow-xs` (a 1px ambient shadow) and lift to a 12px / 24% opacity drop on hover, paired with a `translateY(-4px)` shift. The fixed header carries a persistent `shadow-lg`. Wave SVG dividers between sections are decorative, not structural, and do not contribute to depth.

### Shadow Vocabulary

- **Rest** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): Cards, FAQ items.
- **Hover** (`box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12)`): Project cards, timeline cards on hover.
- **Skill Chip Hover** (`box-shadow: 0 4px 8px rgba(59, 130, 246, 0.15)`): Tinted Azure glow under chips on hover.
- **Timeline Node Ring** (`box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15)`): Decorative Azure ring around timeline nodes, expanding to 8px on hover.
- **Header** (`shadow-lg`, Tailwind default): Persistent under the sticky header so scrolled content visually slides beneath it.

<!-- markdownlint-disable-next-line MD024 -->
### Named Rules

**The Lift-On-Hover Rule.** Every interactive card lifts 4px on hover with a shadow that grows from rest to 12px / 24% opacity. The lift is the only motion needed; do not add scale, rotation, or border-color swaps to the same hover.

**The Decorative Glow Ban.** Glow rings around the profile avatar, around buttons at rest, or as section dividers are prohibited. The timeline-node ring is the only glow currently kept, and only because it's load-bearing (it marks the node clearly against the timeline line).

## 5. Components

### Buttons

- **Shape:** Slightly rounded corners (0.375rem / `rounded-md`).
- **Primary** (`btn btn-primary`): Azure background, white text, `px-4 py-2`, font-weight 500. Hover drops opacity to 90%. Used on the hero CTA, Contact button, "Download resume", and the back-to-top FAB.
- **Outline** (`btn btn-outline`): Transparent background, Azure border, Azure text, same padding. Hover fills to a 10% Azure tint. Used on "View More Projects".
- **Focus:** Both variants render a 2px Azure ring at 50% opacity via Tailwind's `focus:ring-2 focus:ring-blue-500/50`.
- **Icon-in-button:** The current header Contact button has an envelope FontAwesome icon to the left of the label. PRODUCT.md flags inline FontAwesome icons as an anti-reference; the cleaner direction is a label-only button.

### Skill Chip

- **Style:** Rounded pill (`rounded-full`), 1px Azure border, Azure text, 8% Azure tinted background, `px-3 py-1.5`, body-weight 500 at 14px.
- **Hover:** Lifts 2px, background tint goes to 15%, shadow becomes Azure-tinted (15% at 4px / 8px blur).
- **Usage:** Skills block in About only. Not used elsewhere.

### Contribution Badge

- **Style:** Rounded pill, Emerald text on a 10% Emerald background with a 30% Emerald 1px border, `px-2.5 py-0.5`, label-weight 500 at 12px. Currently always paired with a "code-branch" FontAwesome icon prefix.
- **Usage:** Project cards where `project.type == 'contribution'`.
- **Note:** This is the only place the Emerald color is used for branding. See "The Status-Is-Not-Brand Rule" in Section 2.

### Cards

- **Corner Style:** 0.5rem (`rounded-lg`).
- **Background:** White in light theme, Surface Dark Raised (#1f2937) in dark theme.
- **Border:** 1px Hairline.
- **Padding:** 1.5rem (`p-6`).
- **Shadow Strategy:** Rest at shadow-xs; lift on hover (see Elevation). The `card-hover` utility adds the translate + shadow transition.

### Inputs

The site currently ships no form inputs. The contact flow is a `mailto:` link, not an inline form. If a contact form is added, inherit the card stroke (1px Hairline), 0.5rem corners, 0.75rem internal padding, and an Azure 2px focus ring matching the button focus treatment.

### Navigation

- **Style:** Fixed top, full-width header on white (light) / Surface Dark (dark) with a persistent `shadow-lg`. Container is centered at standard Tailwind container width with `px-4 py-4` insets.
- **Link Treatment:** Plain text in Ink Muted, with an animated 2px Azure underline that grows from 0% to 100% width on hover (the `nav-link` utility). Active state is not distinct from rest; this should be added.
- **Mobile Treatment:** Hamburger button toggles a card-styled drawer with stacked links and a full-width primary CTA at the bottom.
- **Theme Toggle:** Round 9 by 9 button with a single sun/moon FontAwesome icon. Persists choice in `localStorage`. The early-detection script in `head.html` prevents FOUC and must remain.

### Timeline

This is the one visually distinctive component on the site and worth keeping intact unless the redesign explicitly reworks the Experience section.

- **Line:** Vertical 2px gradient from Azure (top) through Violet (middle) to Emerald (bottom), positioned at left-4 on mobile and centered on desktop.
- **Node:** Circular `w-4 h-4`, 4px Azure border on Surface Light/Dark fill, with a 4px Azure 15%-opacity ring at rest expanding to 8px on hover.
- **Card:** Standard card with the `timeline-card` lift-on-hover variant (2px translate, larger shadow), positioned on alternating sides of the line on desktop.
- **Arrow:** A 16px CSS triangle pointing from the card to the line. Color matches the card background.

### Hero

- **Background:** Linear gradient from Azure (`from-primary`) to Violet (`to-accent`) in light theme; deeper blue-950 to purple-950 in dark.
- **Profile photo:** 256px circular crop with a 4px white-30% border and `shadow-2xl`. Object-positioned at `center 20%` to keep the face centered.
- **Wave divider:** Concave SVG wave at the bottom, white in light theme and gray-800 in dark, fading the hero into the next section.
- **Note:** The gradient + circular photo + wave divider stack is the single strongest template tell on the site. PRODUCT.md names this exact combination as the primary anti-reference. Treat the hero as the first surface to redesign.

## 6. Do's and Don'ts

### Do

- **Do** keep accents to one strong voice per screen. If Azure carries the buttons and links, demote Violet and Emerald to neutrals on that screen.
- **Do** lift cards 4px on hover with a 12px / 24% shadow. Use the existing `card-hover` utility; do not add scale, rotation, or color swaps to the same hover.
- **Do** cap body measure at roughly 75ch. The current `max-w-3xl` paragraphs hold this line; preserve it.
- **Do** respect `prefers-reduced-motion`. The existing CSS already opts the AOS animations out under reduce-motion; new animations must follow.
- **Do** use Montserrat for headings, Poppins for body, until the typography pairing is intentionally changed. Mixing in a third family adds noise, not signal.
- **Do** keep the focus ring (2px Azure at 50% opacity). It is the keyboard-accessibility floor; do not remove it from any interactive element.
- **Do** keep PRODUCT.md's no-em-dash rule in copy. Use commas, colons, semicolons, periods, or parentheses.

### Don't

- **Don't** introduce more "Generic dev-portfolio template" tells (PRODUCT.md anti-reference). That category includes: big gradient heroes, hero-metric counter rows, identical project card grids, "View More" buttons, animated floating icons orbiting a circular avatar.
- **Don't** lean further into the "Agency / SaaS landing page" look (PRODUCT.md anti-reference): glassmorphism buttons, "Building innovative solutions" copy, decorative wave dividers between every section, blue-to-purple linear gradients. The current hero already breaks this rule; do not propagate the pattern.
- **Don't** reinforce the "AI-generated portfolio look" (PRODUCT.md anti-reference): Blue primary + Purple accent + Green success, Poppins everywhere, FontAwesome icons inline with every heading, glow rings around the avatar, dot-grid section backgrounds.
- **Don't** swing to brutalist or maximalist experiments (PRODUCT.md anti-reference). The audience is hiring managers, not designers.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on cards, list items, or callouts. Use full borders, background tints, or leading numerals instead.
- **Don't** use `background-clip: text` with a gradient. Single solid color; emphasis via weight or size.
- **Don't** nest cards. A timeline card containing skill chips inside a tinted background inside another card is wrong.
- **Don't** add wave dividers to new sections. Existing wave dividers are tracked as a redesign target.
- **Don't** add new FontAwesome icons inline with section headings. Inline-icon-plus-heading is the AI-portfolio tell PRODUCT.md flags by name.
- **Don't** mock data or simplify components to bypass an issue (CLAUDE.md hard rule). Fix the root cause instead.
- **Don't** ship without running `npm run lint` and `npm test`. CLAUDE.md requires both.
