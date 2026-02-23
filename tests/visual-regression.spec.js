const { test, expect } = require('@playwright/test');

const SECTIONS = ['about', 'projects', 'experience', 'presentations', 'faq', 'contact'];
const SETTLE_DELAY_MS = 500;
const ANIMATION_SETTLE_DELAY_MS = 1000;

async function loadPage(page) {
  await page.goto('./', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.evaluate(() => {
    document.querySelectorAll('[data-aos]').forEach((el) => {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-delay');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // Pin quotes to the first one to prevent random selection causing diffs
    const quotes = document.querySelectorAll('.quote');
    quotes.forEach((quote, index) => {
      if (index === 0) {
        quote.style.position = 'relative';
        quote.style.opacity = '1';
        quote.style.transform = 'translateX(0)';
        quote.setAttribute('aria-hidden', 'false');
      } else {
        quote.style.position = 'absolute';
        quote.style.opacity = '0';
        quote.style.transform = 'translateX(100%)';
        quote.setAttribute('aria-hidden', 'true');
      }
    });
  });
  await page.waitForTimeout(ANIMATION_SETTLE_DELAY_MS);
}

test.describe('Visual Regression', () => {
  test('full page - light mode', async ({ page }) => {
    await loadPage(page);
    await expect(page).toHaveScreenshot('full-page-light.png', {
      fullPage: true,
      mask: [page.locator('iframe')],
    });
  });

  test('full page - dark mode', async ({ page }) => {
    await loadPage(page);
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(SETTLE_DELAY_MS);
    await expect(page).toHaveScreenshot('full-page-dark.png', {
      fullPage: true,
      mask: [page.locator('iframe')],
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
      await expect(el).toHaveScreenshot(`section-${section}.png`, {
        mask: [page.locator('iframe')],
      });
    });
  }
});
