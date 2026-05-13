/**
 * Smooth Scrolling Module
 * Smooth-scroll for in-page anchor links with sticky-header offset.
 * Respects prefers-reduced-motion.
 */

function scrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function initSmoothScrolling(selector = 'a[href^="#"]', headerSelector = '#site-header') {
  const triggerElements = document.querySelectorAll(selector);
  const header = document.querySelector(headerSelector);

  if (!triggerElements.length) return;

  triggerElements.forEach((element) => {
    element.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetId = href.substring(1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const offset = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: targetPosition - offset,
        behavior: scrollBehavior(),
      });

      history.pushState(null, null, href);

      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    });
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (!hash) return;

    const targetElement = document.querySelector(hash);
    if (!targetElement) return;

    const offset = header ? header.offsetHeight : 0;

    setTimeout(() => {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition - offset,
        behavior: scrollBehavior(),
      });
    }, 10);
  });
}

export function scrollToElement(target, offsetY = 0) {
  const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: targetPosition - offsetY,
    behavior: scrollBehavior(),
  });
}
