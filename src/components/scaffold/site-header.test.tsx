import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "./site-header";
import { routes } from "@/config/site";

describe("SiteHeader", () => {
  it("renders all primary navigation links from site config", () => {
    render(<SiteHeader />);

    const expectedLinks = [
      { label: "Lily Protocol", href: routes.home },
      { label: "Docs", href: routes.docs },
      { label: "Sign in", href: routes.signin },
      { label: "Dashboard", href: routes.dashboard },
    ];

    for (const link of expectedLinks) {
      const element = screen.getByRole("link", { name: link.label });
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("href", link.href);
    }
  });

  it("contains no dead links outside the registered routes", () => {
    render(<SiteHeader />);

    const links = screen.getAllByRole("link");
    const registeredHrefs = Object.values(routes) as string[];

    for (const link of links) {
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        expect(registeredHrefs).toContain(href);
      }
    }
  });
});
