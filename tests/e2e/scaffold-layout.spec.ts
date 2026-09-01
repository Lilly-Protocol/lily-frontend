import { expect, test } from "@playwright/test";

import { routeScaffolds } from "../../src/config/routes";

const longAgentId = "agent-with-a-long-unbroken-id-" + "a".repeat(96);

for (const route of routeScaffolds) {
  const path = route.path.replace("[id]", longAgentId);

  test(`${route.id} fits the viewport with readable wrapped text`, async ({ page }, testInfo) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    const main = page.getByRole("main");
    await expect(main.getByRole("heading", { level: 1 })).toHaveText(route.title);
    const badge = main.getByText(path, { exact: true });
    await expect(badge).toBeVisible();
    await page.evaluate(() => document.fonts.ready);

    if (route.id === "agent-detail") {
      const screenshotPath = testInfo.outputPath("agent-detail-layout.png");
      await page.screenshot({ path: screenshotPath, fullPage: true });
      await testInfo.attach("agent-detail-layout", {
        path: screenshotPath,
        contentType: "image/png",
      });
    }

    const dimensions = await main.evaluate((element) => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      main: element.clientWidth,
      content: element.scrollWidth,
    }));
    expect(dimensions.viewport).toBe(page.viewportSize()?.width);
    expect(dimensions.main).toBeGreaterThan(0);
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.main);

    const badgeOverflow = await badge.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(element);
      return [...range.getClientRects()].some((rect) =>
        rect.left < bounds.left - 1 || rect.right > bounds.right + 1,
      ) || element.scrollWidth > element.clientWidth;
    });
    expect(badgeOverflow).toBe(false);

    // Check visible text geometry too: hiding overflow is not a layout fix.
    const overflow = await main.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const outside: string[] = [];
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent?.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        if ([...range.getClientRects()].some((rect) =>
          rect.left < bounds.left - 1 || rect.right > bounds.right + 1,
        )) {
          outside.push(node.textContent.trim());
        }
      }
      return outside;
    });
    expect(overflow).toEqual([]);
  });
}
