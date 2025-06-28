# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a Jekyll-based personal portfolio website built with Tailwind CSS and
deployed on GitHub Pages. The site features a component-based architecture with
content managed through YAML data files, interactive elements, and performance
optimizations including PurgeCSS for CSS optimization.

## Development Commands

### Setup

- `npm run setup` - Install both npm and bundle dependencies

### Development

- `npm run dev` - Start development server with CSS watching and Jekyll serving (concurrently)
- `npm run serve` - Run Jekyll server only
- `npm run watch:css` - Watch and rebuild Tailwind CSS on changes
- `npm run build:css` - Build Tailwind CSS once

### Production Build

- `npm run build` - Build CSS and Jekyll site for production (sets JEKYLL_ENV=production)

### Linting and Code Quality

- `npm run lint` - Run all linters (CSS, JS, Markdown)
- `npm run lint:all` - Build site first, then run all linters including HTML
- `npm run fix` - Auto-fix all fixable linting issues
- Individual linters: `npm run lint:css`, `npm run lint:js`,
  `npm run lint:html`, `npm run lint:md`
- Individual fixers: `npm run fix:css`, `npm run fix:js`, `npm run fix:md`

### Jekyll Commands

- `bundle exec jekyll serve` - Start Jekyll development server
- `bundle exec jekyll build` - Build Jekyll site

## Architecture

### Technology Stack

- Jekyll 4.4.1 with jekyll-feed and jekyll-seo-tag plugins
- Ruby >= 3.3.0 (supports Ruby 3.4.0+ with compatibility gems)
- Tailwind CSS with PostCSS processing
- Vanilla JavaScript (no framework dependencies)

### Key Directories

- `_data/` - Content stored in YAML files (experience, projects, faq, quotes,
  navigation, presentations)
- `_includes/sections/` - Modular page sections as HTML partials
- `_layouts/` - Page layouts (default.html, home.html)
- `assets/js/modules/` - Modular JavaScript functionality
- `src/tailwind.css` - Tailwind CSS source (builds to `assets/css/tailwind.css`)
- `docs/` - Comprehensive system design and architecture documentation

### Content Management System

All content is managed through YAML files in `_data/`:

- `experience.yml` - Work experience entries with highlights
- `projects.yml` - Project showcases with tech stacks, GitHub links, and
  featured status
- `presentations.yml` - Embedded presentations with dates and descriptions
- `faq.yml` - FAQ accordion content with questions and answers
- `quotes.yml` - Testimonial quotes with author details
- `navigation.yml` - Site navigation menu items

### JavaScript Architecture

Modular components in `assets/js/modules/`:

- `animations.js` - Scroll-based animations using intersection observers
- `faq.js` - FAQ accordion functionality
- `navigation.js` - Mobile navigation, sticky header, and active states
- `quotes.js` - Random quote display from testimonials
- `smoothscroll.js` - Smooth scrolling navigation with header offset calculations
- `theme.js` - Dark/light theme switching with localStorage persistence
- `utils.js` - Shared utility functions

### CSS Processing and Optimization

- Source: `src/tailwind.css` with Tailwind directives and custom CSS variables
- Output: `assets/css/tailwind.css` (processed by PostCSS)
- PurgeCSS integration eliminates unused CSS in production builds
- Configuration: `tailwind.config.js`, `postcss.config.js`
- CSS variables for theme switching (light/dark mode)

### Performance Optimizations

- Deferred JavaScript loading to prevent render blocking
- PurgeCSS removes unused Tailwind classes
- Event delegation and throttling for scroll handlers
- Responsive image handling strategy
- Mobile-first responsive design approach

## Ruby/Jekyll Configuration

- Ruby version: >= 3.3.0 (includes compatibility gems for Ruby 3.4.0+:
  logger, csv, bigdecimal)
- Jekyll 4.4.1 with plugins: jekyll-feed, jekyll-seo-tag
- Excludes: node_modules, vendor, .git, Gemfile, Gemfile.lock

## Interactive Features

- Sticky navigation with scroll position detection
- Back-to-top button that appears after scrolling threshold
- Light/dark theme toggle with localStorage persistence and FOUC prevention
- Smooth scrolling to sections with header height offset calculation
- FAQ accordion functionality
- Random testimonial quote display
- Mobile navigation menu

## Important Implementation Notes

- Changes to `_config.yml` require server restart
- Content changes in `_data/*.yml` files are hot-reloaded
- Site uses baseurl "/portfolio" for GitHub Pages deployment
- Theme switching prevents Flash of Unstyled Content (FOUC) via early detection script
- Scroll handlers are throttled for performance
- Navigation accounts for sticky header height in scroll calculations
- Pre-commit hook automatically runs linters on staged files before commits

## GitHub Pages Deployment

This site uses Jekyll 4.4.1 and requires GitHub Actions for deployment
(GitHub Pages only supports Jekyll 3.10.0 by default).

### Deployment Workflow

- Automated deployment via `.github/workflows/deploy.yml`
- Triggers on push to main/master branch
- Builds Tailwind CSS, then Jekyll site with production settings
- Deploys to GitHub Pages using actions/deploy-pages@v4

### Repository Configuration

- For project site: Any repository name (current: baseurl="/portfolio")
- For user site: Repository must be named `USERNAME.github.io` (set baseurl="")
- GitHub Pages source must be set to "GitHub Actions" in Settings → Pages

## Local Development

- Development server: `http://localhost:4000/portfolio`
- VS Code settings configured for automatic linting on save
- GitHub Actions run linting checks and deployment on push/PR

## Architecture Documentation

The `docs/` directory contains comprehensive system design documentation including:

- Architecture review with strengths and improvement recommendations
- System design with implementation approach and data structures
- Performance optimization strategies
- Component interfaces and program flow documentation

### Critical Rules - DO NOT VIOLATE

- **NEVER create mock data or simplified components** unless explicitly told to do so

- **NEVER replace existing complex components with simplified versions** - always fix the actual problem

- **ALWAYS work with the existing codebase** - do not create new simplified alternatives

- **ALWAYS find and fix the root cause** of issues instead of creating workarounds

- When debugging issues, focus on fixing the existing implementation, not replacing it

- When something doesn't work, debug and fix it - don't start over with a simple version

- Comments: Add code comments sparingly. Focus on why something is done, especially for complex logic, rather than what is done. Only add high-value comments if necessary for clarity or if requested by the user. Do not edit comments that are separate from the code you are changing. NEVER talk to the user or describe your changes through comments.
