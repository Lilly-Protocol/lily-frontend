import { render, screen } from "@testing-library/react";

import { routes, siteConfig } from "@/config/site";

import NotFound, { metadata } from "./not-found";

describe("NotFound", () => {
  it("exports not-found metadata for the global 404 route", () => {
    expect(metadata).toMatchObject({
      title: "Page not found",
      description: `The requested ${siteConfig.name} page could not be found.`,
    });
  });

  it("renders a branded 404 with a home route link", () => {
    render(<NotFound />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /page not found/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("404")).toHaveClass(
      "text-[var(--color-accent)]",
    );
    expect(screen.getByRole("link", { name: /return home/i })).toHaveAttribute(
      "href",
      routes.home,
    );
  });
});
