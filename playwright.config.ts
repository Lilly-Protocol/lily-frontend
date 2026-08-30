import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 2,
  forbidOnly: !!process.env.CI,
  use: {
    baseURL: "http://127.0.0.1:4319",
    browserName: "chromium",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "320px", use: { viewport: { width: 320, height: 800 } } },
    { name: "desktop", use: { viewport: { width: 1280, height: 900 } } },
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 4319",
    url: "http://127.0.0.1:4319",
    reuseExistingServer: false,
  },
});
