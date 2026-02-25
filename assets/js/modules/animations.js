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

/**
 * Animate counter elements by counting up to their target value when visible
 * @param {string} selector CSS selector for counter elements with data-target attribute
 */
export function animateCounters(selector = '.counter') {
  const counters = document.querySelectorAll(selector);
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const useComma = el.getAttribute('data-format') === 'comma';
          const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
          ).matches;

          if (prefersReducedMotion) {
            el.textContent = useComma ? target.toLocaleString() : target;
            observer.unobserve(el);
            return;
          }

          const duration = 2000;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            const current = Math.floor(eased * target);

            el.textContent = useComma ? current.toLocaleString() : current;

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = useComma ? target.toLocaleString() : target;
            }
          };

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}
