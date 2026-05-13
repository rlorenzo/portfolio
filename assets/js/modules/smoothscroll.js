import { prefersReducedMotion } from './utils.js';

function scrollToElement(targetElement, offsetY = 0) {
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({
    top: targetPosition - offsetY,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

export function initSmoothScrolling(selector = 'a[href^="#"]', headerSelector = '#site-header') {
  const triggerElements = document.querySelectorAll(selector);
  const header = document.querySelector(headerSelector);

  if (!triggerElements.length) return;

  triggerElements.forEach((element) => {
    element.addEventListener('click', function (e) {
      const targetElement = resolveAnchorTarget(this);
      if (!targetElement) return;

      e.preventDefault();
      scrollToElement(targetElement, header?.offsetHeight ?? 0);
      history.pushState(null, null, this.getAttribute('href'));

      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    });
  });

  window.addEventListener('hashchange', () => {
    if (!window.location.hash) return;
    const targetElement = document.querySelector(window.location.hash);
    if (!targetElement) return;

    setTimeout(() => scrollToElement(targetElement, header?.offsetHeight ?? 0), 10);
  });
}

function resolveAnchorTarget(element) {
  const href = element.getAttribute('href');
  if (!href || !href.startsWith('#')) return null;
  const targetId = href.substring(1);
  return targetId ? document.getElementById(targetId) : null;
}
