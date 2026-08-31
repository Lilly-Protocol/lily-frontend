import { render, screen } from "@testing-library/react";

import { getSectionRoutes } from "@/config/routes";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("renders legal and docs links from the route registry", () => {
    render(<SiteFooter />);

    const legalRoutes = getSectionRoutes("legal");
    const docsRoutes = getSectionRoutes("docs");

    for (const route of [...legalRoutes, ...docsRoutes]) {
      const link = screen.getByRole("link", { name: route.title });
      expect(link).toHaveAttribute("href", route.path);
    }
  });

  it("links the brand mark to the home route", () => {
    render(<SiteFooter />);

    expect(
      screen.getByRole("link", { name: /lily protocol/i }),
    ).toHaveAttribute("href", "/");
  });
});
