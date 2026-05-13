import { initLazyIframes } from './modules/lazy-iframe.js';
import {
  initBackToTopButton,
  initMobileMenu,
  initScrollSpy,
  initStickyHeader,
} from './modules/navigation.js';
import { initSmoothScrolling } from './modules/smoothscroll.js';
import { applyTheme, getThemePreference, initTheme } from './modules/theme.js';
import { throttle } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  const elements = cacheElementsById([
    'site-header',
    'back-to-top',
    'mobile-menu-button',
    'mobile-menu',
    'theme-toggle',
  ]);

  initTheme();
  setupThemeToggle(elements);
  setupNavigation(elements);
  setupInteractivity();
  setupResponsiveBehavior(elements);
  setupPrintMode();
  greetTheCurious();
}

function greetTheCurious() {
  console.log(
    '%chi.\n%crexlorenzo@gmail.com',
    'color: oklch(58% 0.14 50); font: 600 14px/1.2 ui-sans-serif, system-ui;',
    'color: oklch(46% 0.012 50); font: 400 12px/1.4 ui-sans-serif, system-ui;',
  );
}

function cacheElementsById(ids) {
  return ids.reduce((acc, id) => {
    acc[id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = document.getElementById(id);
    return acc;
  }, {});
}

function setupThemeToggle({ themeToggle }) {
  if (!themeToggle) return;

  syncThemeToggleState(themeToggle, getThemePreference());

  themeToggle.addEventListener('click', () => {
    const next = getThemePreference() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    syncThemeToggleState(themeToggle, next);
  });
}

function syncThemeToggleState(button, theme) {
  const isDark = theme === 'dark';
  button.setAttribute('aria-pressed', String(isDark));
  button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

function setupNavigation({ siteHeader, backToTop, mobileMenuButton, mobileMenu }) {
  initStickyHeader(siteHeader);
  initBackToTopButton(backToTop, 300);
  initMobileMenu(mobileMenuButton, mobileMenu);
  initScrollSpy('.nav-link', 'active');
  initSmoothScrolling('a[href^="#"]', '#site-header');
}

function setupInteractivity() {
  initLazyIframes();
  initQuoteSwitcher();
}

function initQuoteSwitcher() {
  const advance = document.querySelector('.connect__advance');
  if (!advance) return;

  const quotes = Array.from(document.querySelectorAll('.connect__quote'));
  if (quotes.length < 2) return;

  function show(index) {
    quotes.forEach((quote, i) => {
      const isActive = i === index;
      quote.classList.toggle('connect__quote--active', isActive);
      quote.toggleAttribute('hidden', !isActive);
    });
  }

  let activeIndex = Math.floor(Math.random() * quotes.length);
  show(activeIndex);

  advance.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % quotes.length;
    show(activeIndex);
  });
}

function setupResponsiveBehavior({ mobileMenu, mobileMenuButton }) {
  const handleResize = throttle(() => {
    if (window.innerWidth >= 768) {
      mobileMenu?.classList.add('hidden');
      mobileMenuButton?.setAttribute('aria-expanded', 'false');
      mobileMenuButton?.setAttribute('aria-label', 'Open menu');
    }
  }, 100);

  window.addEventListener('resize', handleResize);
}

function setupPrintMode() {
  const printModeClass = 'print-mode';

  window.addEventListener('beforeprint', () => {
    document.documentElement.classList.add(printModeClass);
  });

  window.addEventListener('afterprint', () => {
    document.documentElement.classList.remove(printModeClass);
  });
}
