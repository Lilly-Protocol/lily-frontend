import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "./site-header";
import { routes } from "@/config/site";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("SiteHeader", () => {
  it("renders links that mirror the route registry", () => {
    render(<SiteHeader />);

    const expectedRoutes = [
      { label: "Docs", href: routes.docs },
      { label: "Sign in", href: routes.signin },
      { label: "Dashboard", href: routes.dashboard },
    ];

    for (const { label, href } of expectedRoutes) {
      const link = screen.getByRole("link", { name: label });
      expect(link).toBeTruthy();
      expect(link.getAttribute("href")).toBe(href);
    }
  });

  it("contains no dead links relative to the site config", () => {
    render(<SiteHeader />);

    const links = screen.getAllByRole("link");
    const validHrefs = Object.values(routes) as string[];

    for (const link of links) {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#") && !href.startsWith("http")) {
        expect(validHrefs).toContain(href);
      }
    }
  });
});
