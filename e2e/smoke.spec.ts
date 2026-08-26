import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads and shows heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Lily Protocol/);
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('docs page loads', async ({ page }) => {
    await page.goto('/docs');
    await expect(page).toHaveURL(/\/docs/);
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('app page loads', async ({ page }) => {
    await page.goto('/app');
    await expect(page).toHaveURL(/\/app/);
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});
