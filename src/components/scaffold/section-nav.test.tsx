import { render, screen } from "@testing-library/react";

import { getSectionRoutes } from "@/config/routes";

import { SectionNav } from "./section-nav";

describe("SectionNav", () => {
  describe("aria and structure", () => {
    it('exposes aria-label="Section routes" on the nav element', () => {
      render(<SectionNav routes={getSectionRoutes("marketing")} />);
      expect(
        screen.getByRole("navigation", { name: "Section routes" }),
      ).toBeInTheDocument();
    });

    it("renders a list item for every route supplied", () => {
      const routes = getSectionRoutes("marketing");
      render(<SectionNav routes={routes} />);
      expect(screen.getAllByRole("listitem")).toHaveLength(routes.length);
    });
  });

  describe("static routes (marketing section)", () => {
    it("renders an anchor for every marketing route", () => {
      const routes = getSectionRoutes("marketing");
      render(<SectionNav routes={routes} />);
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(routes.length);
    });

    it("every static route link has an href matching route.path", () => {
      const routes = getSectionRoutes("marketing");
      render(<SectionNav routes={routes} />);
      for (const route of routes) {
        expect(screen.getByRole("link", { name: new RegExp(route.title, "i") }))
          .toHaveAttribute("href", route.path);
      }
    });

    it("renders the route title and path inside each link", () => {
      const routes = getSectionRoutes("marketing");
      render(<SectionNav routes={routes} />);
      for (const route of routes) {
        // title text
        expect(screen.getByText(route.title)).toBeInTheDocument();
        // path badge (rendered as a <span> inside the link)
        expect(screen.getByText(route.path)).toBeInTheDocument();
      }
    });
  });

  describe("dynamic route fallback (/app/agents/[id])", () => {
    it("renders no anchor for the dynamic route", () => {
      render(<SectionNav routes={getSectionRoutes("dashboard")} />);
      const links = screen.getAllByRole("link");
      const dynamicLink = links.find(
        (el) => el.getAttribute("href") === "/app/agents/[id]",
      );
      expect(dynamicLink).toBeUndefined();
    });

    it("renders the dynamic route title as plain text without an anchor", () => {
      const dashboardRoutes = getSectionRoutes("dashboard");
      const dynamicRoute = dashboardRoutes.find(
        (r) => r.path === "/app/agents/[id]",
      );
      expect(dynamicRoute).toBeDefined();

      render(<SectionNav routes={dashboardRoutes} />);

      // Title text is present but is NOT wrapped in a link
      const titleEl = screen.getByText(dynamicRoute!.title);
      expect(titleEl.closest("a")).toBeNull();
    });

    it("renders the dynamic path string as plain text", () => {
      render(<SectionNav routes={getSectionRoutes("dashboard")} />);
      const pathEl = screen.getByText("/app/agents/[id]");
      expect(pathEl.closest("a")).toBeNull();
    });
  });

  describe("empty routes", () => {
    it("renders an empty nav when given an empty route list", () => {
      render(<SectionNav routes={[]} />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
  });
});
