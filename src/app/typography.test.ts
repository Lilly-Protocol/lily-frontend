import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Typography Scale Token Set", () => {
  const cssPath = path.resolve(__dirname, "globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  it("defines scale classes for display, headings, body, and caption", () => {
    expect(cssContent).toContain(".type-display");
    expect(cssContent).toContain(".type-h1");
    expect(cssContent).toContain(".type-h2");
    expect(cssContent).toContain(".type-h3");
    expect(cssContent).toContain(".type-h4");
    expect(cssContent).toContain(".type-body");
    expect(cssContent).toContain(".type-caption");
    expect(cssContent).toContain(".eyebrow");
  });
});
