import { render, screen, within } from "@testing-library/react";

import { getSectionRoutes } from "@/config/routes";

import { SectionNav } from "./section-nav";

describe("SectionNav", () => {
  it("renders static routes as links with matching hrefs", () => {
    const routes = getSectionRoutes("dashboard");

    render(<SectionNav routes={routes} />);

    const nav = screen.getByRole("navigation", {
      name: "Section routes",
    });

    for (const route of routes) {
      if (route.path === "/app/agents/[id]") {
        continue;
      }

      const routeTitle = within(nav).getByText(route.title);
      const link = routeTitle.closest("a");

      expect(link).not.toBeNull();
      expect(link).toHaveAttribute("href", route.path);
    }
  });

  it("renders the dynamic agent route without an anchor", () => {
    const routes = getSectionRoutes("dashboard");

    render(<SectionNav routes={routes} />);

    const nav = screen.getByRole("navigation", {
      name: "Section routes",
    });

    const dynamicPath = within(nav).getByText(
      "/app/agents/[id]",
    );

    expect(dynamicPath.closest("a")).toBeNull();
  });
});
