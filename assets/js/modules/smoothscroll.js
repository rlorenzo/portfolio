/**
 * Smooth Scrolling Module
 * Handles smooth scrolling behavior for anchor links with header offset
 */

/**
 * Initializes smooth scrolling behavior for specified elements
 *
 * @param {string} selector - CSS selector for elements that should trigger smooth scrolling
 * @param {string} headerSelector - CSS selector for sticky header to calculate offset
 */
export function initSmoothScrolling(selector = 'a[href^="#"]', headerSelector = '#site-header') {
  const triggerElements = document.querySelectorAll(selector);
  const header = document.querySelector(headerSelector);

  // Skip if no elements found
  if (!triggerElements.length) return;

  triggerElements.forEach((element) => {
    element.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if not an anchor link
      if (!href.startsWith('#')) return;

      const targetId = href.substring(1);

      // Skip if it's just '#' or empty
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate offset based on header height if present
        let offset = 0;
        if (header) {
          offset = header.offsetHeight;
        }

        // Get target position
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

        // Scroll to target with offset
        window.scrollTo({
          top: targetPosition - offset,
          behavior: 'smooth',
        });

        // Update URL without reloading page
        history.pushState(null, null, href);

        // Focus on the target element for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });

  /**
   * Handle back/forward browser navigation to ensure smooth scrolling
   */
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        // Calculate offset for header
        let offset = 0;
        if (header) {
          offset = header.offsetHeight;
        }

        // Small timeout to ensure DOM is ready
        setTimeout(() => {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: targetPosition - offset,
            behavior: 'smooth',
          });
        }, 10);
      }
    }
  });
}

/**
 * Scrolls to a specific element with smooth behavior
 *
 * @param {string|Element} target - Element or selector to scroll to
 * @param {number} offsetY - Additional Y offset in pixels
 */
export function scrollToElement(target, offsetY = 0) {
  // Allow either DOM element or selector string
  const targetElement = typeof target === 'string' ? document.querySelector(target) : target;

  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: targetPosition - offsetY,
    behavior: 'smooth',
  });
}
