import { render, screen, within } from "@testing-library/react";

import { routeScaffolds } from "@/config/routes";
import { routes, siteConfig } from "@/config/site";

import { SiteHeader } from "./site-header";

const registryHeaderRoutes = routeScaffolds.filter(
  (route) =>
    route.path !== routes.home &&
    (route.section === "marketing" ||
      route.section === "legal" ||
      route.section === "docs" ||
      route.id === "signin" ||
      route.id === "dashboard-overview"),
);

describe("SiteHeader", () => {
  it("renders every header-eligible registry route with the expected label", () => {
    render(<SiteHeader />);

    const navigation = screen.getByRole("navigation", { name: /global/i });

    for (const route of registryHeaderRoutes) {
      expect(
        within(navigation).getByRole("link", { name: route.title }),
      ).toHaveAttribute("href", route.path);
    }
  });

  it("does not render links outside the route registry", () => {
    render(<SiteHeader />);

    const registryPaths = new Set<string>(
      routeScaffolds.map((route) => route.path),
    );
    const links = screen.getAllByRole("link");

    expect(
      screen.getByRole("link", { name: siteConfig.name }),
    ).toHaveAttribute("href", routes.home);

    for (const link of links) {
      const href = link.getAttribute("href");

      expect(href).toBeTruthy();
      expect(registryPaths.has(href ?? "")).toBe(true);
    }
  });
});
