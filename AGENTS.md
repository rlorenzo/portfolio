# AI Agent Guidance for Portfolio Website

This document provides guidance for AI coding assistants (Claude, GitHub Copilot, Cursor, etc.) working on this Jekyll-based portfolio website. Read this file to understand the project structure, coding standards, and best practices.

## 🎯 Project Overview

**Project Type:** Personal Portfolio Website
**Framework:** Jekyll 4.4.1 (Static Site Generator)
**Styling:** Plain CSS with lightningcss minification
**JavaScript:** Vanilla JS (ES6+), no framework dependencies
**Deployment:** GitHub Pages via GitHub Actions

**Key Characteristics:**

- Component-based architecture using Jekyll's templating
- Data-driven content management via YAML files
- Performance-optimized with PurgeCSS and build pipeline
- Comprehensive linting and code quality tools
- Automated pre-commit hooks for code quality

## 📖 Essential Reading

### For Understanding the Codebase

1. **[docs/README.md](docs/README.md)** - Documentation index and navigation guide
2. **[docs/portfolio_system_design.md](docs/portfolio_system_design.md)** - Technical architecture and implementation details
3. **[docs/architecture_review.md](docs/architecture_review.md)** - Code quality standards and improvement recommendations
4. **[README.md](README.md)** - Setup instructions and development guide

### For Implementing Features

1. **[docs/portfolio_website_enhancement_prd.md](docs/portfolio_website_enhancement_prd.md)** - Feature requirements and roadmap
2. **[docs/architecture_review.md](docs/architecture_review.md)** - Best practices and patterns to follow

## 🏗️ Architecture Quick Reference

### Directory Structure

```text
portfolio/
├── _data/              # Content in YAML format (experience, projects, FAQ, etc.)
├── _includes/          # Reusable components (header, footer, etc.)
│   └── sections/       # Page sections (hero, projects, experience, etc.)
├── _layouts/           # Page layouts (default.html, home.html)
├── assets/
│   ├── css/            # CSS (styles.css source, styles.min.css generated)
│   └── js/
│       └── modules/    # Modular JavaScript (theme, navigation, etc.)
├── docs/               # Technical documentation
└── .husky/             # Husky git hooks (pre-commit linting)
```

### Content Management

All content is stored in `_data/` YAML files:

- `experience.yml` - Work experience with highlights
- `projects.yml` - Project showcases with tech stacks
- `presentations.yml` - Embedded presentations
- `faq.yml` - FAQ accordion content
- `quotes.yml` - Testimonial quotes
- `navigation.yml` - Navigation menu items

**To modify content:** Edit the appropriate YAML file, NOT the HTML templates.

### JavaScript Modules

Located in `assets/js/modules/`:

- `theme.js` - Dark/light mode with localStorage
- `navigation.js` - Sticky header, mobile nav, active states
- `smoothscroll.js` - Smooth scrolling with header offset
- `animations.js` - Scroll-based animations (Intersection Observer)
- `faq.js` - FAQ accordion functionality
- `quotes.js` - Random quote display
- `utils.js` - Shared utility functions

## 🛠️ Development Workflow

### Setup

```bash
npm run setup          # Install npm and bundle dependencies
```

The Husky pre-commit hook is automatically installed via the `prepare` script when you run `npm install`.

### Development

```bash
npm run dev            # Start dev server (CSS watching + Jekyll)
npm run serve          # Jekyll server only
npm run watch:css      # Watch and re-minify CSS only
```

### Building

```bash
npm run build          # Production build (CSS + JS + Jekyll)
npm run build:css      # Minify CSS with lightningcss
npm run build:js       # Bundle JavaScript with rolldown
```

### Testing

```bash
npm test               # Run all Playwright tests (including visual regression)
```

Visual regression tests automatically start the dev server via Playwright's `webServer` configuration.
Baseline screenshots are in `tests/screenshots/baseline/`.

To update baselines after intentional visual changes:

```bash
npx playwright test --update-snapshots
```

### Code Quality

```bash
npm run lint           # Run all linters (CSS, JS, MD)
npm run lint:all       # Build + lint + HTML linting
npm run fix            # Auto-fix linting issues
```

**Individual linters:**

- `npm run lint:css` / `npm run fix:css`
- `npm run lint:js` / `npm run fix:js`
- `npm run lint:md` / `npm run fix:md`
- `npm run lint:html` (requires build first)

## ✅ Critical Rules - READ THIS

### Code Quality Requirements

1. **ALWAYS run linters before committing**
   - Pre-commit hook will automatically run linters on staged files
   - Fix all linting errors before committing
   - Use `npm run fix` for auto-fixable issues

2. **NEVER create mock or simplified versions of existing components**
   - Always work with the actual codebase
   - Fix root causes, not symptoms
   - Don't replace complex components with simple alternatives

3. **ALWAYS preserve existing functionality**
   - Understand what exists before modifying
   - Test changes thoroughly
   - Don't break existing features

4. **Follow existing patterns**
   - Match the coding style in the file you're editing
   - Use established component patterns
   - Maintain consistency with the architecture

### File Modification Guidelines

**Editing existing files:**

- Read the entire file first to understand context
- Match existing indentation and formatting
- Preserve existing comments unless updating related code
- Don't add unnecessary comments (code should be self-documenting)

**Creating new files:**

- Follow existing naming conventions (kebab-case for files)
- Use appropriate directory structure
- Add to relevant documentation if significant

**Content changes:**

- Edit YAML files in `_data/`, NOT HTML templates
- Understand Jekyll's Liquid templating before modifying templates
- Test locally before committing

## 🎨 Coding Standards

### JavaScript

- **ES6+ syntax required** (const/let, arrow functions, template literals)
- **No var declarations**
- **Functions should do one thing** (single responsibility)
- **Maximum 50 lines per function**
- **No console.log in production code**
- **Use camelCase** for variables and functions
- **Verb-noun pattern** for function names (e.g., `initTheme`, `handleClick`)

### CSS

- **Write component CSS in `assets/css/styles.css`** using BEM-like naming
- **CSS custom properties** for theming (defined in `@layer base`)
- **Mobile-first approach** (min-width breakpoints)
- **Maximum 3 levels of nesting**
- **No unused selectors**

### Liquid Templates

- **Minimal logic in templates** (extract to includes if complex)
- **Semantic HTML5 elements** (`<nav>`, `<main>`, `<article>`, etc.)
- **One include = one responsibility**
- **No commented-out code**
- **Meaningful variable names**

### Naming Conventions

- **Files:** kebab-case (`navigation-menu.html`)
- **Variables:** camelCase (`userProfile`, `navLinks`)
- **CSS Classes:** component-name (`nav-link`, `btn-primary`)
- **Functions:** verb-noun (`getActiveSection`, `toggleTheme`)

## 🔧 Common Tasks

### Adding a New Section

1. Create component in `_includes/sections/new-section.html`
2. Add data file in `_data/new-section.yml` (if needed)
3. Include in `_layouts/home.html`
4. Update navigation in `_data/navigation.yml`
5. Add CSS in `assets/css/styles.css` (if custom styles needed)
6. Run linters and test locally

### Modifying Existing Content

1. Find the appropriate YAML file in `_data/`
2. Edit the content following existing structure
3. Test locally with `npm run dev`
4. Verify changes render correctly

### Adding Interactive Features

1. Create new module in `assets/js/modules/feature-name.js`
2. Export initialization function
3. Import and initialize in `assets/js/main.js`
4. Follow existing patterns (see `theme.js` or `navigation.js`)
5. Use event delegation where appropriate
6. Throttle scroll/resize handlers for performance

### Styling Changes

1. Add or update CSS in `assets/css/styles.css`
2. Use CSS custom properties for theming (tokens in `@layer base`)
3. Ensure dark mode support (test both themes via `.dark` class on `<html>`)
4. Run `npm run build:css` to regenerate minified CSS
5. Verify with `npm run lint:css`

## 📋 Pre-Flight Checklist

Before committing changes:

- [ ] Code passes all linters (`npm run lint`)
- [ ] Changes tested locally (`npm run dev`)
- [ ] Dark mode tested (if UI changes)
- [ ] Mobile responsive (if UI changes)
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Visual regression tests pass (`npm test`, if UI changes)
- [ ] Documentation updated (if significant changes)
- [ ] Git hook will run linters automatically

## 🚨 Important Implementation Notes

- **Jekyll restart required:** Changes to `_config.yml` need server restart
- **Auto-reload works:** Content changes in `_data/*.yml` reload automatically
- **CSS rebuilds:** CSS is watched and re-minified automatically with `npm run dev`
- **Base URL:** Site uses `/portfolio` baseurl for GitHub Pages
- **Theme persistence:** Light/dark mode persists via localStorage
- **Scroll handlers:** Already throttled for performance
- **Navigation offset:** Accounts for sticky header height

## 🔍 Debugging Tips

### Jekyll Not Building?

- Check `_config.yml` syntax
- Ensure all YAML files are valid (use a YAML validator)
- Look for Liquid template errors in terminal

### CSS Not Updating?

- Run `npm run build:css` to regenerate `assets/css/styles.min.css`
- Check `assets/css/styles.css` for syntax errors
- Verify the site references `styles.min.css` (check `_includes/head.html`)

### JavaScript Not Working?

- Check browser console for errors
- Verify module is imported in `main.js`
- Ensure DOM elements exist before accessing
- Check for proper event listener setup

### Linting Failures?

- Run `npm run fix` for auto-fixable issues
- Check specific linter output for details
- Verify linter configs haven't been modified

## 📚 Additional Resources

### Documentation

- [Jekyll Docs](https://jekyllrb.com/docs/)
- [lightningcss Docs](https://lightningcss.dev/)
- [Liquid Template Language](https://shopify.github.io/liquid/)

### Project Documentation

- [Architecture Review](docs/architecture_review.md) - Best practices and recommendations
- [System Design](docs/portfolio_system_design.md) - Technical details
- [Enhancement PRD](docs/portfolio_website_enhancement_prd.md) - Feature roadmap

## 🤝 Best Practices for AI Assistants

### When Asked to Implement a Feature

1. **Read relevant documentation first**
   - Check [Enhancement PRD](docs/portfolio_website_enhancement_prd.md) for specifications
   - Review [Architecture Review](docs/architecture_review.md) for patterns

2. **Understand existing code**
   - Read similar existing features
   - Match the established patterns
   - Maintain consistency

3. **Plan before coding**
   - Identify files to modify
   - Determine dependencies
   - Consider edge cases

4. **Test thoroughly**
   - Verify functionality works
   - Test in both light and dark modes
   - Check mobile responsiveness
   - Run all linters

### When Asked to Debug

1. **Gather context**
   - Ask for error messages
   - Understand expected vs actual behavior
   - Identify when the issue started

2. **Investigate systematically**
   - Read the relevant code
   - Check browser console
   - Verify dependencies
   - Test in isolation

3. **Fix root causes**
   - Don't just patch symptoms
   - Understand why the issue occurred
   - Prevent similar issues

### When Asked to Refactor

1. **Preserve functionality**
   - Ensure behavior doesn't change
   - Test before and after
   - Keep commits focused

2. **Follow project patterns**
   - Match existing architecture
   - Maintain code style
   - Update related documentation

3. **Improve incrementally**
   - Don't rewrite everything
   - Make targeted improvements
   - Keep changes reviewable

## 🎓 Learning the Codebase

Recommended reading order:

1. **[README.md](README.md)** - Project overview and setup (15 min)
2. **[docs/README.md](docs/README.md)** - Documentation index (5 min)
3. **[docs/portfolio_system_design.md](docs/portfolio_system_design.md)** - Architecture details (30 min)
4. **[docs/architecture_review.md](docs/architecture_review.md)** - Code quality standards (20 min)
5. Explore the codebase hands-on (ongoing)

---

**Questions or Confusion?**

- Consult the [docs/README.md](docs/README.md) for navigation
- Read relevant source code for examples
- Check existing patterns before creating new ones
- When in doubt, ask for clarification rather than guessing

**Last Updated:** November 11, 2025
