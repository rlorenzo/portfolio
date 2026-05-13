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
  // Parse via URL and restrict to http(s) so DOM-sourced text cannot inject other schemes.
  let parsed;
  try {
    parsed = new URL(src, window.location.href);
  } catch {
    return;
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return;
  iframe.setAttribute('src', parsed.href);
  iframe.removeAttribute('data-src');
}
