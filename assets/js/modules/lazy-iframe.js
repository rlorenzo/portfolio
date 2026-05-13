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

function safeHttpUrl(src) {
  // Parse via URL and restrict to http(s) so DOM-sourced text cannot inject other schemes.
  try {
    const parsed = new URL(src, window.location.href);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : null;
  } catch {
    return null;
  }
}

function loadIframe(iframe) {
  const src = iframe.getAttribute('data-src');
  if (!src) return;
  const safeHref = safeHttpUrl(src);
  if (!safeHref) return;
  iframe.setAttribute('src', safeHref);
  iframe.removeAttribute('data-src');
}
