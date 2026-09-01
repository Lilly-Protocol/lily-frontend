import { test, expect } from "@playwright/test";

test("does not expose X-Powered-By header", async ({ request }) => {
  const response = await request.get("/");
  expect(response.headers()["x-powered-by"]).toBeUndefined();
});
