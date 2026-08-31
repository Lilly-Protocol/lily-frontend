import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { routes } from "@/config/site";
import { getSectionRoutes } from "@/config/routes";

import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("renders the site name and tagline", () => {
    render(<SiteHeader />);

    expect(screen.getByText("Lily Protocol")).toBeInTheDocument();
    expect(screen.getByText("Contributor-ready scaffold")).toBeInTheDocument();
  });

  it("links to home using the canonical route", () => {
    render(<SiteHeader />);

    const homeLink = screen.getByRole("link", { name: /lily protocol/i });
    expect(homeLink).toHaveAttribute("href", routes.home);
  });

  it("exposes docs, sign in, and dashboard navigation links that mirror the route registry", () => {
    render(<SiteHeader />);

    const docsRoute = getSectionRoutes("docs").find((route) => route.id === "docs");
    const authRoute = getSectionRoutes("auth").find((route) => route.id === "signin");
    const dashboardRoute = getSectionRoutes("dashboard").find(
      (route) => route.id === "dashboard-overview",
    );

    expect(docsRoute).toBeDefined();
    expect(authRoute).toBeDefined();
    expect(dashboardRoute).toBeDefined();

    const docsLink = screen.getByRole("link", { name: /^docs$/i });
    const signInLink = screen.getByRole("link", { name: /^sign in$/i });
    const dashboardLink = screen.getByRole("link", { name: /^dashboard$/i });

    expect(docsLink).toHaveAttribute("href", routes.docs);
    expect(signInLink).toHaveAttribute("href", routes.signin);
    expect(dashboardLink).toHaveAttribute("href", routes.dashboard);

    expect(routes.docs).toBe(docsRoute?.path);
    expect(routes.signin).toBe(authRoute?.path);
    expect(routes.dashboard).toBe(dashboardRoute?.path);
  });
});
