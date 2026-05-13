const reducedMotionMQL = window.matchMedia('(prefers-reduced-motion: reduce)');

export function prefersReducedMotion() {
  return reducedMotionMQL.matches;
}

export function throttle(func, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
