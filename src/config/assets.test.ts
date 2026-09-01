import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("public assets validation", () => {
  it("does not include leftover default Next.js starter SVGs in public/", () => {
    const publicDir = path.resolve(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      return;
    }

    const files = fs.readdirSync(publicDir);
    const starterSvgs = ["file.svg", "globe.svg", "next.svg", "vercel.svg", "window.svg"];

    for (const svg of starterSvgs) {
      expect(files).not.toContain(svg);
    }
  });
});
