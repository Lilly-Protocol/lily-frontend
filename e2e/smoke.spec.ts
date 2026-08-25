import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "Landing Page" },
  { path: "/docs", heading: "Documentation" },
  { path: "/app", heading: "Dashboard Overview" },
] as const;

for (const route of routes) {
  test(`${route.path} renders its primary heading`, async ({ page }) => {
    await page.goto(route.path);

    await expect(
      page.getByRole("heading", { level: 1, name: route.heading }),
    ).toBeVisible();
  });
}

test("global navigation links connect the smoke-test routes", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Docs", exact: true }).click();
  await expect(page).toHaveURL(/\/docs$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Documentation" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Dashboard", exact: true }).click();
  await expect(page).toHaveURL(/\/app$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Dashboard Overview" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Lily Protocol", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Landing Page" }),
  ).toBeVisible();
});
