import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "./site-header";
import { routes } from "@/config/site";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("SiteHeader", () => {
  it("renders links that mirror the site route registry", () => {
    render(<SiteHeader />);

    // Assert key registry routes are present in the header
    const expectedRoutes = [
      { href: routes.home, label: "Lily Protocol" },
      { href: routes.docs, label: "Docs" },
      { href: routes.signin, label: "Sign in" },
      { href: routes.dashboard, label: "Dashboard" },
    ];

    for (const { href, label } of expectedRoutes) {
      const link = screen.getByRole("link", { name: label });
      expect(link).toBeTruthy();
      expect(link.getAttribute("href")).toBe(href);
    }
  });

  it("contains no dead links relative to the registry", () => {
    render(<SiteHeader />);
    const links = screen.getAllByRole("link");
    const registryPaths = Object.values(routes);

    for (const link of links) {
      const href = link.getAttribute("href");
      if (!href) continue;
      // Only validate internal registry paths, skip external or anchor links
      if (href.startsWith("/") || href === "#") {
        expect(registryPaths).toContain(href);
      }
    }
  });
});
