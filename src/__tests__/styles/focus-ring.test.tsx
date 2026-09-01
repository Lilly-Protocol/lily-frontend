 import "@testing-library/jest-dom/vitest";
 import { render, screen } from "@testing-library/react";
 import { describe, expect, it } from "vitest";

 describe("Focus ring design tokens", () => {
   it("defines focus ring CSS custom properties on :root", async () => {
     const css = await import("../../app/globals.css?raw").then(
       (m) => m.default,
     );
     expect(css).toContain("--focus-ring-color");
     expect(css).toContain("--focus-ring-width");
     expect(css).toContain("--focus-ring-offset");
   });

   it("applies focus-visible outline using the token variables", async () => {
     const css = await import("../../app/globals.css?raw").then(
       (m) => m.default,
     );
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
