import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Design System Elevation Tokens", () => {
  const cssPath = path.resolve(__dirname, "globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  it("defines 4-tier elevation scale tokens (--shadow-1 through --shadow-4)", () => {
    expect(cssContent).toContain("--shadow-1:");
    expect(cssContent).toContain("--shadow-2:");
    expect(cssContent).toContain("--shadow-3:");
    expect(cssContent).toContain("--shadow-4:");
  });

  it("maintains backward-compatible --shadow-soft alias mapped to low elevation", () => {
    expect(cssContent).toContain("--shadow-soft: var(--shadow-1);");
  });

  it("maps .surface class to shadow token", () => {
    expect(cssContent).toMatch(/\.surface\s*\{[^}]*box-shadow:\s*var\(--shadow-soft\)/);
  });
});
