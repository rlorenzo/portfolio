const DURATION_MS = 2600;
const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

function isSupported(pen) {
  return (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    'IntersectionObserver' in window &&
    typeof pen.animate === 'function'
  );
}

function createPenAnimator(pen) {
  let isSigning = false;
  return function startSigning() {
    if (isSigning) return;
    isSigning = true;
    pen.classList.remove('signature__pen--pending');
    pen.getAnimations().forEach((a) => a.cancel());
    const animation = pen.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
      duration: DURATION_MS,
      easing: EASING,
      fill: 'forwards',
    });
    animation.finished.finally(() => {
      isSigning = false;
    });
  };
}

function observeOnce(target, threshold, callback) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          callback();
          return;
        }
      }
    },
    { threshold },
  );
  observer.observe(target);
}

export function initSignature() {
  const sig = document.querySelector('.signature');
  const pen = sig?.querySelector('.signature__pen');
  if (!sig || !pen) return;

  if (!isSupported(pen)) {
    pen.classList.remove('signature__pen--pending');
    return;
  }

  const startSigning = createPenAnimator(pen);
  observeOnce(sig, 0.15, startSigning);
  sig.addEventListener('mouseenter', startSigning);
}
