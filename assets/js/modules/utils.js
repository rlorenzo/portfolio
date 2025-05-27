/**
 * Utility Module
 * General utility functions used across the site
 */

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func Function to debounce
 * @param {number} wait Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Throttle function to limit the rate at which a function is executed
 * @param {Function} func Function to throttle
 * @param {number} limit Limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit = 100) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if an element is in viewport
 * @param {HTMLElement} element Element to check
 * @param {number} offset Optional offset in pixels
 * @returns {boolean} True if element is in viewport
 */
export function isInViewport(element, offset = 0) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight + offset) && 
    rect.bottom >= (0 - offset) &&
    rect.left <= (window.innerWidth + offset) && 
    rect.right >= (0 - offset)
  );
}

/**
 * Get the current breakpoint based on window width
 * Matches Tailwind's default breakpoints
 * @returns {string} Current breakpoint ('xs', 'sm', 'md', 'lg', 'xl', '2xl')
 */
export function getCurrentBreakpoint() {
  const width = window.innerWidth;
  
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
}

/**
 * Add event listeners and automatically remove them when element is destroyed
 * @param {HTMLElement} element Element to attach listener to
 * @param {string} event Event name (e.g. 'click')
 * @param {Function} callback Event callback function
 */
export function safeEventListener(element, event, callback) {
  if (!element) return;
  
  // Create the actual event handler
  const handler = (e) => callback(e);
  
  // Add the event listener
  element.addEventListener(event, handler);
  
  // Set up automatic cleanup using MutationObserver
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.removedNodes.length) {
        Array.from(mutation.removedNodes).forEach((node) => {
          if (node === element || node.contains(element)) {
            element.removeEventListener(event, handler);
            observer.disconnect();
          }
        });
      }
    });
  });
  
  // Start observing document for element removal
  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Check if the user's device supports touch events
 * @returns {boolean} True if device supports touch
 */
export function isTouchDevice() {
  return ('ontouchstart' in window) || 
         (navigator.maxTouchPoints > 0) || 
         (navigator.msMaxTouchPoints > 0);
}