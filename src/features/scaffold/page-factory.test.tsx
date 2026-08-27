import { render, screen } from "@testing-library/react";

import { routeScaffolds } from "@/config/routes";

import { createScaffoldPage } from "./page-factory";

describe("createScaffoldPage", () => {
  it("creates a route-specific scaffold component", () => {
    const DocsPage = createScaffoldPage("docs");

    render(<DocsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /documentation/i }),
    ).toBeInTheDocument();
  });

  it.each(routeScaffolds)(
    "renders the $id scaffold page heading",
    (route) => {
      const ScaffoldPage = createScaffoldPage(route.id);

      render(<ScaffoldPage />);

      expect(
        screen.getByRole("heading", { level: 1, name: route.title }),
      ).toBeInTheDocument();
    },
  );
});
