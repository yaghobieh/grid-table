const { test, expect } = require('@playwright/test');
const { DARK_MODE_SAMPLE_ROUTES } = require('../helpers/routes.cjs');
const { enableDarkMode, enableLightMode, isDarkModeActive } = require('../helpers/theme.cjs');

for (const route of DARK_MODE_SAMPLE_ROUTES) {
  test(`[dark-mode] ${route} — dark class applied`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    await enableDarkMode(page);

    const dark = await isDarkModeActive(page);
    expect(dark, `${route} html element missing .dark class after enabling dark mode`).toBe(true);
    await expect(page.locator('body'), `${route} body not visible in dark mode`).toBeVisible();
  });

  test(`[dark-mode] ${route} — light mode restores correctly`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    await enableDarkMode(page);
    await enableLightMode(page);

    const dark = await isDarkModeActive(page);
    expect(dark, `${route} still has .dark class after switching back to light`).toBe(false);
  });
}

test('[dark-mode] theme persists across navigation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await enableDarkMode(page);
  await page.goto('/demos/basic', { waitUntil: 'networkidle' });

  const dark = await isDarkModeActive(page);
  expect(dark, 'Dark mode did not persist after navigation').toBe(true);
});
