import { readFileSync } from "node:fs";
import path from "node:path";

import { rootViewport, SURFACE_THEME_COLOR } from "./viewport";

const globalsCss = readFileSync(
  path.resolve(process.cwd(), "src/app/globals.css"),
  "utf8",
);

describe("root viewport", () => {
  it("uses the surface token as theme-color", () => {
    expect(globalsCss).toMatch(/--color-surface:\s*#f7f7f5/);
    expect(SURFACE_THEME_COLOR).toBe("#f7f7f5");
    expect(rootViewport.themeColor).toBe(SURFACE_THEME_COLOR);
  });

  it("declares a light color-scheme and device-width defaults", () => {
    expect(rootViewport.colorScheme).toBe("light");
    expect(rootViewport.width).toBe("device-width");
    expect(rootViewport.initialScale).toBe(1);
  });
});
