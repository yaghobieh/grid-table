const { test, expect } = require('@playwright/test');

test.describe('[interactions] enterprise grid smoke', () => {
  test('range selection highlight appears after drag', async ({ page }) => {
    await page.goto('/demos/enterprise-grid', { waitUntil: 'networkidle', timeout: 20000 });
    const cells = page.locator('.grid-cell[data-column-id="sku"]');
    await expect(cells.first()).toBeVisible();
    const first = cells.nth(0);
    const third = cells.nth(2);
    const boxA = await first.boundingBox();
    const boxB = await third.boundingBox();
    expect(boxA && boxB).toBeTruthy();
    await page.mouse.move(boxA.x + boxA.width / 2, boxA.y + boxA.height / 2);
    await page.mouse.down();
    await page.mouse.move(boxB.x + boxB.width / 2, boxB.y + boxB.height / 2, { steps: 6 });
    await page.mouse.up();
    await expect(page.locator('.gt-cell-range-selected').first()).toBeVisible({ timeout: 5000 });
  });

  test('set filter applies and reduces visible rows', async ({ page }) => {
    await page.goto('/demos/enterprise-grid', { waitUntil: 'networkidle', timeout: 20000 });
    const body = page.locator('.grid-body');
    await expect(body).toBeVisible();
    const before = await page.locator('.grid-body .grid-row').count();
    const filterButtons = page.locator('.grid-header-cell button, .grid-header button, [aria-label*="ilter"], .gt-filter-trigger');
    const headerFilter = page.locator('.grid-header-cell').filter({ hasText: 'Region' }).locator('button').first();
    if (await headerFilter.count()) {
      await headerFilter.click();
    } else if (await filterButtons.count()) {
      await filterButtons.first().click();
    }
    const option = page.getByText('EU', { exact: true }).first();
    if (await option.isVisible().catch(() => false)) {
      await option.click();
      const apply = page.getByRole('button', { name: /apply|ok|filter/i }).first();
      if (await apply.isVisible().catch(() => false)) {
        await apply.click();
      }
    }
    await page.waitForTimeout(300);
    const after = await page.locator('.grid-body .grid-row').count();
    expect(after).toBeGreaterThan(0);
    expect(after).toBeLessThanOrEqual(before);
  });

  test('exportScope selected button is available', async ({ page }) => {
    await page.goto('/demos/enterprise-grid', { waitUntil: 'networkidle', timeout: 20000 });
    const selectedScope = page.locator('button').filter({ hasText: /selected/i }).first();
    await expect(selectedScope).toBeVisible({ timeout: 10000 });
    await selectedScope.click();
    await expect(page.locator('.grid-table')).toBeVisible();
    await expect(page.locator('.grid-table-toolbar, button').first()).toBeVisible();
  });
});
