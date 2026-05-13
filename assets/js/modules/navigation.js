/**
 * Navigation Module
 * Handles header scroll effects, mobile menu, and back-to-top functionality
 */

import { throttle } from './utils.js';

/**
 * Set up sticky header behavior
 * @param {HTMLElement} header The header element to make sticky
 */
export function initStickyHeader(header) {
  if (!header) return;

  window.addEventListener(
    'scroll',
    throttle(() => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, 100),
  );
}

/**
 * Initialize back to top button functionality
 * @param {HTMLElement} backToTopBtn The back to top button element
 * @param {number} scrollThreshold Scroll position at which to show the button
 */
export function initBackToTopButton(backToTopBtn, scrollThreshold = 300) {
  if (!backToTopBtn) return;

  window.addEventListener(
    'scroll',
    throttle(() => {
      if (window.scrollY > scrollThreshold) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
      }
    }, 100),
  );

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
    document.querySelector('#hero')?.focus?.({ preventScroll: true });
  });
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Initialize mobile menu functionality
 * @param {HTMLElement} menuButton The button that toggles the mobile menu
 * @param {HTMLElement} mobileMenu The mobile menu element to toggle
 */
export function initMobileMenu(menuButton, mobileMenu) {
  if (!menuButton || !mobileMenu) return;

  const setExpanded = (expanded) => {
    mobileMenu.classList.toggle('hidden', !expanded);
    menuButton.setAttribute('aria-expanded', String(expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
  };

  menuButton.addEventListener('click', () => {
    const willOpen = mobileMenu.classList.contains('hidden');
    setExpanded(willOpen);
  });

  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
      setExpanded(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      setExpanded(false);
      menuButton.focus();
    }
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      setExpanded(false);
    }
  });
}

/**
 * Initialize scroll spy functionality to highlight active nav items
 * @param {string} navItemSelector CSS selector for navigation items
 * @param {string} activeClass Class to add to active nav items
 */
export function initScrollSpy(navItemSelector = '.nav-link', activeClass = 'active') {
  const navLinks = document.querySelectorAll(navItemSelector);
  if (!navLinks.length) return;

  // Get all sections with IDs that match nav links
  const sections = Array.from(navLinks)
    .map((link) => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) {
        return document.querySelector(href);
      }
      return null;
    })
    .filter(Boolean);

  window.addEventListener(
    'scroll',
    throttle(() => {
      const scrollPosition = window.scrollY + 100; // Offset for header height

      // Find the current section
      let currentSection = sections[0];
      for (const section of sections) {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop) {
          currentSection = section;
        }
      }

      // Update active class on nav items
      if (currentSection) {
        navLinks.forEach((navLink) => {
          navLink.classList.remove(activeClass);
          if (navLink.getAttribute('href') === `#${currentSection.id}`) {
            navLink.classList.add(activeClass);
          }
        });
      }
    }, 100),
  );
}
