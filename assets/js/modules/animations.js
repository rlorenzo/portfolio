/**
 * Animations Module
 * Handles animations, transitions, and dynamic visual effects
 */

/**
 * Initialize Animate on Scroll (AOS) library if available
 * @param {Object} options AOS configuration options
 */
export function initAOS(options = {}) {
  if (typeof AOS === 'undefined') return;

  const defaultOptions = {
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 50,
  };

  AOS.init({ ...defaultOptions, ...options });
}

/**
 * Apply entrance animation to element when it enters viewport
 * Fallback for when AOS is not available
 * @param {string} selector CSS selector for elements to animate
 * @param {string} animationClass CSS class containing the animation
 */
export function setupEntranceAnimations(selector, animationClass = 'animate-fadeIn') {
  if (typeof AOS !== 'undefined') return; // Skip if AOS is handling animations

  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}
