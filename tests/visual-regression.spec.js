const { test, expect } = require('@playwright/test');

const SECTIONS = ['about', 'projects', 'experience', 'presentations', 'faq', 'contact'];
const SETTLE_DELAY_MS = 500;
const ANIMATION_SETTLE_DELAY_MS = 1000;

async function loadPage(page) {
  // Block external requests to prevent iframe content from loading
  await page.route(
    (url) => url.hostname !== 'localhost',
    (route) => route.abort(),
  );
  await page.goto('./', { waitUntil: 'load', timeout: 30000 });
  const stabilized = await page.evaluate(() => {
    // Replace iframes with static placeholders to prevent unstable screenshots
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      const placeholder = document.createElement('div');
      placeholder.className = iframe.className;
      placeholder.style.backgroundColor = '#e5e7eb';
      iframe.replaceWith(placeholder);
    });

    // Pin quotes to the first one to prevent random selection causing diffs
    const quotes = document.querySelectorAll('.connect__quote');
    quotes.forEach((quote, index) => {
      const isFirst = index === 0;
      quote.classList.toggle('connect__quote--active', isFirst);
      quote.toggleAttribute('hidden', !isFirst);
    });

    // Skip the Rubik's cube assembly so screenshots see the solved portrait.
    // Not asserted below: the overlay removes itself when the solve finishes,
    // so a zero count here legitimately means "already resolved", not a bug.
    document.querySelectorAll('.hero-portrait__mosaic').forEach((el) => {
      el.remove();
    });
    document.querySelectorAll('.hero-portrait--assembling').forEach((el) => {
      el.classList.remove('hero-portrait--assembling');
    });

    return { iframes: iframes.length, quotes: quotes.length };
  });

  // These selectors target static markup, so a zero count means the templates
  // moved and stabilization silently became a no-op. That is not hypothetical:
  // the quote pin targeted `.quote` for months while the real class was
  // `.connect__quote`, and random quotes leaked into the baselines.
  expect(stabilized.iframes, 'expected presentation iframes to replace').toBeGreaterThan(0);
  expect(stabilized.quotes, 'expected testimonial quotes to pin').toBeGreaterThan(0);

  // Custom fonts can repaint after first frame; wait for them before snapshotting.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(ANIMATION_SETTLE_DELAY_MS);
}

test.describe('Visual Regression', () => {
  test('full page - light mode', async ({ page }) => {
    await loadPage(page);
    await expect(page).toHaveScreenshot('full-page-light.png', {
      fullPage: true,
    });
  });

  test('full page - dark mode', async ({ page }) => {
    await loadPage(page);
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(SETTLE_DELAY_MS);
    await expect(page).toHaveScreenshot('full-page-dark.png', {
      fullPage: true,
    });
  });

  for (const section of SECTIONS) {
    test(`section - ${section}`, async ({ page }) => {
      await loadPage(page);
      // Hide sticky header so it doesn't overlay section screenshots
      await page.evaluate(() => {
        const header = document.getElementById('site-header');
        if (header) header.style.display = 'none';
      });
      const el = page.locator(`#${section}`);
      await el.waitFor({ state: 'attached' });
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(SETTLE_DELAY_MS);
      await expect(el).toHaveScreenshot(`section-${section}.png`);
    });
  }
});
