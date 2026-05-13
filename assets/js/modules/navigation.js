import { prefersReducedMotion, throttle } from './utils.js';

const SCROLL_SPY_HEADER_OFFSET = 100;

export function initStickyHeader(header) {
  if (!header) return;

  window.addEventListener(
    'scroll',
    throttle(() => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, 100),
  );
}

export function initBackToTopButton(backToTopBtn, scrollThreshold = 300) {
  if (!backToTopBtn) return;

  window.addEventListener(
    'scroll',
    throttle(() => {
      const visible = window.scrollY > scrollThreshold;
      backToTopBtn.classList.toggle('opacity-0', !visible);
      backToTopBtn.classList.toggle('invisible', !visible);
      backToTopBtn.classList.toggle('opacity-100', visible);
      backToTopBtn.classList.toggle('visible', visible);
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

export function initScrollSpy(navItemSelector = '.nav-link', activeClass = 'active') {
  const navLinks = document.querySelectorAll(navItemSelector);
  if (!navLinks.length) return;

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
      const scrollPosition = window.scrollY + SCROLL_SPY_HEADER_OFFSET;

      let currentSection = sections[0];
      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          currentSection = section;
        }
      }

      navLinks.forEach((navLink) => {
        navLink.classList.toggle(
          activeClass,
          navLink.getAttribute('href') === `#${currentSection.id}`,
        );
      });
    }, 100),
  );
}
