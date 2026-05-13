/**
 * Lazy Iframe Module
 * Defers iframe src loading until the iframe scrolls near the viewport.
 * Avoids running third-party scripts (e.g., Google Slides telemetry) on initial page load.
 */

export function initLazyIframes(selector = 'iframe[data-src]', rootMargin = '200px 0px') {
  const iframes = document.querySelectorAll(selector);
  if (!iframes.length) return;

  if (!('IntersectionObserver' in window)) {
    iframes.forEach(loadIframe);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadIframe(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { rootMargin },
  );

  iframes.forEach((iframe) => {
    observer.observe(iframe);
  });
}

function loadIframe(iframe) {
  const src = iframe.getAttribute('data-src');
  if (!src) return;
  // Restrict to http/https schemes so DOM-sourced text cannot inject javascript: URLs.
  if (!/^https?:\/\//i.test(src)) return;
  iframe.setAttribute('src', src);
  iframe.removeAttribute('data-src');
}
