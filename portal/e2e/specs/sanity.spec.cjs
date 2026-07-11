const { test, expect } = require('@playwright/test');
const { PORTAL_ROUTES } = require('../helpers/routes.cjs');

for (const route of PORTAL_ROUTES) {
  test(`[sanity] ${route} renders without crash`, async ({ page }) => {
    const consoleErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(`[page-error] ${err.message}`);
    });

    const response = await page.goto(route, { waitUntil: 'networkidle', timeout: 20000 });

    expect(response?.status(), `${route} returned non-200`).toBeLessThan(400);
    await expect(page.locator('body'), `${route} body should be visible`).toBeVisible();

    const criticalErrors = consoleErrors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('net::ERR') &&
        !e.includes('ResizeObserver') &&
        !e.startsWith('Warning:') &&
        !e.includes('animationPlayState'),
    );
    expect(criticalErrors, `${route} has console errors: ${criticalErrors.join(', ')}`).toHaveLength(0);
  });
}
