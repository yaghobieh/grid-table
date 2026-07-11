const STORAGE_KEY = 'grid-table-theme';

async function enableDarkMode(page) {
  await page.evaluate((key) => {
    localStorage.setItem(key, 'dark');
  }, STORAGE_KEY);
  await page.reload({ waitUntil: 'networkidle' });
}

async function enableLightMode(page) {
  await page.evaluate((key) => {
    localStorage.setItem(key, 'light');
  }, STORAGE_KEY);
  await page.reload({ waitUntil: 'networkidle' });
}

async function isDarkModeActive(page) {
  return page.evaluate(() => document.documentElement.classList.contains('dark'));
}

module.exports = { enableDarkMode, enableLightMode, isDarkModeActive };
