import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads and shows heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('docs page loads', async ({ page }) => {
    await page.goto('/docs');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('app route loads', async ({ page }) => {
    await page.goto('/app');
    await expect(page.locator('body')).toBeVisible();
  });
});
