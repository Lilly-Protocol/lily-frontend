import { render, screen } from "@testing-library/react";

import { routeScaffolds } from "@/config/routes";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("renders the brand mark linking to home", () => {
    render(<SiteFooter />);
    const brand = screen.getByRole("link", { name: /lily protocol/i });
    expect(brand).toHaveAttribute("href", "/");
  });

  it("renders the footer navigation landmark", () => {
    render(<SiteFooter />);
    expect(
      screen.getByRole("navigation", { name: /footer navigation/i }),
    ).toBeInTheDocument();
  });

  it("renders Legal section heading", () => {
    render(<SiteFooter />);
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders Support section heading", () => {
    render(<SiteFooter />);
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  it("every footer link resolves to a registered route", () => {
    render(<SiteFooter />);

    const registeredPaths = new Set(routeScaffolds.map((r) => r.path));
    const footerLinks = screen
      .getAllByRole("link")
      // Exclude the brand mark (href="/")
      .filter((el) => el.getAttribute("href") !== "/");

    expect(footerLinks.length).toBeGreaterThan(0);

    for (const link of footerLinks) {
      const href = link.getAttribute("href") ?? "";
      expect(registeredPaths.has(href as (typeof routeScaffolds)[number]["path"])).toBe(true);
    }
  });

  it("renders legal routes: Terms, Privacy, Cookie Policy", () => {
    render(<SiteFooter />);
    expect(
      screen.getByRole("link", { name: /terms of service/i }),
    ).toHaveAttribute("href", "/terms");
    expect(
      screen.getByRole("link", { name: /privacy policy/i }),
    ).toHaveAttribute("href", "/privacy");
    expect(
      screen.getByRole("link", { name: /cookie policy/i }),
    ).toHaveAttribute("href", "/cookies");
  });

  it("renders docs-section routes: Documentation and Status Page", () => {
    render(<SiteFooter />);
    expect(
      screen.getByRole("link", { name: /documentation/i }),
    ).toHaveAttribute("href", "/docs");
    expect(
      screen.getByRole("link", { name: /status page/i }),
    ).toHaveAttribute("href", "/status");
  });

  it("renders a copyright line containing the site name", () => {
    render(<SiteFooter />);
    expect(screen.getByText(/lily protocol/i, { selector: "p" })).toBeInTheDocument();
  });
});
