import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads and shows heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("docs page loads", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("app page loads", async ({ page }) => {
    await page.goto("/app");
    // App may redirect to signin if unauthenticated; just ensure no crash
    await expect(page).toHaveURL(/\/(app|signin)/);
  });

  test("navigation works", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Global" });
    await expect(nav).toBeVisible();
  });
});
