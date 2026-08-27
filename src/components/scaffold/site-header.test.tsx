import { render, screen, within } from "@testing-library/react";

import { routes, siteConfig } from "@/config/site";

import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("renders brand and global navigation links from route constants", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: siteConfig.name }),
    ).toHaveAttribute("href", routes.home);

    const globalNav = screen.getByRole("navigation", { name: "Global" });

    expect(within(globalNav).getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      routes.docs,
    );
    expect(
      within(globalNav).getByRole("link", { name: "Sign in" }),
    ).toHaveAttribute("href", routes.signin);
    expect(
      within(globalNav).getByRole("link", { name: "Dashboard" }),
    ).toHaveAttribute("href", routes.dashboard);
  });
});
