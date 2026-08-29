import { render, screen } from "@testing-library/react";

import type { RouteScaffold } from "@/types/site";

import { SectionNav } from "./section-nav";

const routes: readonly RouteScaffold[] = [
  {
    id: "overview",
    title: "Overview",
    path: "/",
    section: "marketing",
    purpose: "Overview",
    figmaScope: "Overview",
    implementationAreas: ["Navigation"],
  },
  {
    id: "docs",
    title: "Docs",
    path: "/docs",
    section: "docs",
    purpose: "Documentation",
    figmaScope: "Documentation",
    implementationAreas: ["Navigation"],
  },
];

describe("SectionNav", () => {
  it("uses a keyboard-focusable horizontal overflow row below lg", () => {
    render(<SectionNav routes={routes} />);

    const list = screen.getByRole("list");

    expect(list).toHaveClass(
      "sm:flex",
      "sm:flex-row",
      "sm:overflow-x-auto",
      "lg:grid",
      "lg:overflow-visible",
    );
    expect(list).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("link", { name: "Docs /docs" })).toHaveAttribute(
      "href",
      "/docs",
    );
  });
});
