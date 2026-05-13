/**
 * Hero portrait parallax.
 * Drifts the portrait subtly as the hero scrolls out of view; respects
 * prefers-reduced-motion and pauses updates while the hero is off-screen.
 */

const MAX_SHIFT_PX = 28;

export function initHeroParallax(selector = '.hero-portrait') {
  const portrait = document.querySelector(selector);
  if (!portrait) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const img = portrait.querySelector('img');
  if (!img) return;

  let ticking = false;
  let visible = true;

  function update() {
    ticking = false;
    if (!visible) return;
    const rect = portrait.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / viewportH));
    img.style.setProperty('--parallax-y', `${-(progress * MAX_SHIFT_PX)}px`);
  }

  function onScroll() {
    if (ticking) return;
    requestAnimationFrame(update);
    ticking = true;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    },
    { rootMargin: '0px' },
  );
  observer.observe(portrait);

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}
