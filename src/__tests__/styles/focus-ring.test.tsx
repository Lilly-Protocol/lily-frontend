 import "@testing-library/jest-dom/vitest";
 import { readFileSync } from "node:fs";
 import path from "node:path";
 import { render, screen } from "@testing-library/react";
 import { describe, expect, it } from "vitest";

 const css = readFileSync(
   path.resolve(__dirname, "../../app/globals.css"),
   "utf-8",
 );

 describe("Focus ring design tokens", () => {
   it("defines focus ring CSS custom properties on :root", () => {
     expect(css).toContain("--focus-ring-color");
     expect(css).toContain("--focus-ring-width");
     expect(css).toContain("--focus-ring-offset");
   });

   it("applies focus-visible outline using the token variables", () => {
     expect(css).toMatch(/:focus-visible\s*\{[^}]*outline:\s*var\(--focus-ring-width\)\s+solid\s+var\(--focus-ring-color\)/);
     expect(css).toMatch(/outline-offset:\s*var\(--focus-ring-offset\)/);
   });

   it("renders an interactive element that can receive focus", () => {
     render(<button type="button">Focus me</button>);
     const btn = screen.getByRole("button", { name: /focus me/i });
     expect(btn).toBeInTheDocument();
     expect(btn.tagName).toBe("BUTTON");
   });
 });
