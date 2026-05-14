const reducedMotionMQL = window.matchMedia('(prefers-reduced-motion: reduce)');

export function prefersReducedMotion() {
  return reducedMotionMQL.matches;
}

export function throttle(func, limit = 100) {
  let inThrottle = false;
  let trailingArgs = null;
  let trailingThis = null;
  return function (...args) {
    if (inThrottle) {
      trailingArgs = args;
      trailingThis = this;
      return;
    }
    func.apply(this, args);
    inThrottle = true;
    setTimeout(() => {
      inThrottle = false;
      if (trailingArgs) {
        const a = trailingArgs;
        const t = trailingThis;
        trailingArgs = null;
        trailingThis = null;
        func.apply(t, a);
      }
    }, limit);
  };
}
