import { animateCounters, initAOS, setupEntranceAnimations } from './modules/animations.js';
import { initFaqToggles } from './modules/faq.js';
import {
  initBackToTopButton,
  initMobileMenu,
  initScrollSpy,
  initStickyHeader,
} from './modules/navigation.js';
import { rotateQuotes } from './modules/quotes.js';
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
    'theme-toggle-mobile',
  ]);

  initTheme();
  setupThemeToggles(elements);
  setupNavigation(elements);
  setupAnimations();
  setupInteractivity();
  setupResponsiveBehavior(elements);
  setupPrintMode();
}

function cacheElementsById(ids) {
  return ids.reduce((acc, id) => {
    acc[id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = document.getElementById(id);
    return acc;
  }, {});
}

function setupThemeToggles({ themeToggle, themeToggleMobile }) {
  const handleThemeToggle = () => {
    const currentTheme = getThemePreference();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  themeToggle?.addEventListener('click', handleThemeToggle);
  themeToggleMobile?.addEventListener('click', handleThemeToggle);
}

function setupNavigation({ siteHeader, backToTop, mobileMenuButton, mobileMenu }) {
  initStickyHeader(siteHeader);
  initBackToTopButton(backToTop, 300);
  initMobileMenu(mobileMenuButton, mobileMenu);
  initScrollSpy('.nav-link', 'active');
  initSmoothScrolling('a[href^="#"]', '#site-header');
}

function setupAnimations() {
  initAOS({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 50,
  });

  animateCounters();
  setupEntranceAnimations('.animate-on-scroll');
}

function setupInteractivity() {
  initFaqToggles('.faq-toggle');
  rotateQuotes('.quote', 8000);
  initViewMoreProjects();
}

function initViewMoreProjects() {
  const button = document.getElementById('view-more-projects');
  if (!button) return;

  button.addEventListener('click', () => {
    const hiddenCards = document.querySelectorAll('.project-hidden');
    hiddenCards.forEach((card) => {
      card.classList.remove('hidden');
    });
    button.remove();
  });
}

function setupResponsiveBehavior({ mobileMenu }) {
  const handleResize = throttle(() => {
    if (window.innerWidth >= 1024) {
      mobileMenu?.classList.add('hidden');
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
