const { test, expect } = require('@playwright/test');

const SECTIONS = ['about', 'projects', 'experience', 'presentations', 'faq', 'contact'];
const IFRAME_TIMEOUT_MS = 120000;
const SETTLE_DELAY_MS = 500;
const IFRAME_LOAD_DELAY_MS = 2000;
const ANIMATION_SETTLE_DELAY_MS = 1000;

function hasIframes(section) {
  return section === 'presentations';
}

async function loadPage(page) {
  await page.goto('./', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.evaluate(() => {
    document.querySelectorAll('[data-aos]').forEach((el) => {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-delay');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  });
  await page.waitForTimeout(ANIMATION_SETTLE_DELAY_MS);
}

async function waitForAllIframes(page) {
  const count = await page.locator('iframe').count();
  if (count === 0) return;

  for (let i = 0; i < count; i++) {
    const iframe = page.locator('iframe').nth(i);
    await iframe.scrollIntoViewIfNeeded();
    await page.evaluate((index) => {
      const el = document.querySelectorAll('iframe')[index];
      const src = el.src;
      el.src = '';
      el.src = src;
    }, i);
    await page.waitForTimeout(IFRAME_LOAD_DELAY_MS);
  }
}

test.describe('Visual Regression', () => {
  test('full page - light mode', async ({ page }) => {
    await loadPage(page);
    await expect(page).toHaveScreenshot('full-page-light.png', { fullPage: true });
  });

  test('full page - dark mode', async ({ page }) => {
    await loadPage(page);
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(SETTLE_DELAY_MS);
    await expect(page).toHaveScreenshot('full-page-dark.png', { fullPage: true });
  });

  for (const section of SECTIONS) {
    test(`section - ${section}`, async ({ page }) => {
      if (hasIframes(section)) {
        test.setTimeout(IFRAME_TIMEOUT_MS);
      }
      await loadPage(page);
      if (hasIframes(section)) {
        await waitForAllIframes(page);
      }
      const el = page.locator(`#${section}`);
      await el.waitFor({ state: 'attached' });
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(SETTLE_DELAY_MS);
      await expect(el).toHaveScreenshot(`section-${section}.png`);
    });
  }
});
