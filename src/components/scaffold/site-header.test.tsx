import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { routes } from "@/config/site";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("renders navigation links that mirror the site routes registry", () => {
    render(<SiteHeader />);

    // Assert that each route surfaced in the header matches the registry
    const docsLink = screen.getByRole("link", { name: /docs/i });
    expect(docsLink).toHaveAttribute("href", routes.docs);

    const signInLink = screen.getByRole("link", { name: /sign in/i });
    expect(signInLink).toHaveAttribute("href", routes.signin);

    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    expect(dashboardLink).toHaveAttribute("href", routes.dashboard);
  });

  it("does not render dead or unregistered navigation links", () => {
    render(<SiteHeader />);

    const navLinks = screen.getAllByRole("link");
    const registeredRoutes = new Set(Object.values(routes));

    for (const link of navLinks) {
      const href = link.getAttribute("href");
      // Skip the home/logo link which is allowed to point to root
      if (href === routes.home) continue;
      expect(registeredRoutes).toContain(href);
    }
  });
});
