# Product

## Register

brand

## Users

Hiring managers, engineering leaders, recruiters, and prospective clients who land on Rex Lorenzo's personal site while evaluating him for senior engineering or engineering-leadership roles. They arrive from LinkedIn, GitHub, a resume link, or a referral; most scan on desktop in a hiring context (focused, time-boxed) and some on mobile in passing.

Their job-to-be-done: in under two minutes, decide whether Rex is worth a conversation. They need a credible signal of seniority, range (IC + leadership), longevity, and the kind of work he ships — without wading through resume bullets.

## Product Purpose

This is a personal portfolio. The design is the product: it has to credibly represent a 20+ year engineer and engineering leader (UCLA CS; experience across B Capital and UCLA; top-1% Moodle contributor; 10k+ institutions, 30k+ users supported).

Success looks like:

- A visitor forms a confident "yes, worth a call" judgment without reading every word.
- The site reads as the work of someone who builds production software, not a template.
- Resume, GitHub, LinkedIn, and contact are reachable in one click from the hero.

## Brand Personality

Three words: **seasoned, pragmatic, approachable.**

- Voice: first-person, direct, plainspoken. Confidence without bravado. "Let's connect and build something great together," not "synergize" or "transform."
- Tone: warm but professional. Talks like a senior engineer who has shipped, not a marketer.
- Emotional goal on first scroll: trust and competence. Not flashy, not corporate-cold.

## Anti-references

This site should explicitly NOT look like:

- **Generic dev-portfolio templates.** Big gradient hero, hero-metric counter row, identical project card grid, "View More" button, animated floating icons orbiting a circular avatar. The current implementation is leaning into several of these — they're the things to design away from, not toward.
- **Agency / SaaS landing pages.** Glassmorphism buttons, "Building innovative solutions" generic copy, decorative wave dividers between every section, blue-to-purple linear gradients.
- **AI-generated portfolio look.** Blue primary + purple accent + green success, Poppins everywhere, FontAwesome icons inline with every heading, glow rings around the avatar, dot-grid section backgrounds.
- **Brutalist or maximalist experiments** at the opposite extreme. The audience is hiring managers, not designers.

## Design Principles

1. **Practice what you preach.** This site argues that Rex builds quality software. Every detail (typography, spacing, motion, copy) is evidence of that claim or against it. No template tells.
2. **Show, don't list.** Counters, badges, and skill chips assert credentials; project work and writing demonstrate them. Push real artifacts (projects, presentations, contributions) above performative numbers.
3. **Earn every flourish.** Animations, gradients, icons, and dividers must each do work. If a wave divider, floating badge, or glow ring could be removed without loss of meaning, remove it.
4. **One confident voice.** Copy is the same person across hero, about, and contact. No section reintroduces the title or restates what the heading already said.
5. **Mobile-credible, desktop-impressive.** Recruiters often open the link on a phone; engineering leaders typically open it on a laptop. The site has to feel intentional on both, not just "responsive."

## Accessibility & Inclusion

- WCAG 2.1 AA as the floor. Color contrast must hold in both light and dark themes, including against the gradient hero.
- Respect `prefers-reduced-motion` (the current CSS does this for `animate-glow`, `animate-float`, `animate-scroll-cue` — keep that contract for any new motion).
- All interactive elements must be keyboard-reachable with a visible focus state. FontAwesome icons used as the sole content of a control need an accessible name.
- Theme toggle must persist across navigation and not flash unstyled content (FOUC prevention is already in place — preserve it).
