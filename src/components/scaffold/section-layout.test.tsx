import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { getSectionRoutes } from "@/config/routes";

import { SectionLayout } from "./section-layout";

describe("SectionLayout", () => {
  it("renders the shared shell, global nav, and section route links", () => {
    render(
      <SectionLayout
        title="Public marketing"
        description="Public-facing route group."
        routes={getSectionRoutes("marketing")}
      >
        <div>Section content</div>
      </SectionLayout>,
    );

    expect(
      screen.getByRole("link", { name: /lily protocol/i }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /docs/i })).toHaveAttribute(
      "href",
      "/docs",
    );
    expect(
      screen.getByRole("link", { name: /landing page/i }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("places a hidden skip link before the shell and targets main content", async () => {
    const user = userEvent.setup();

    render(
      <SectionLayout
        title="Public marketing"
        description="Public-facing route group."
        routes={getSectionRoutes("marketing")}
      >
        <div>Section content</div>
      </SectionLayout>,
    );

    const skipLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    const main = screen.getByRole("main");

    expect(document.body.querySelector("a")).toBe(skipLink);
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(skipLink).toHaveClass("-translate-y-24");
    expect(skipLink).toHaveClass("focus:translate-y-0");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveAttribute("tabindex", "-1");

    await user.tab();

    expect(skipLink).toHaveFocus();
  });

  it("shows dynamic routes as non-clickable scaffold entries", () => {
    render(
      <SectionLayout
        title="Dashboard"
        description="Signed-in workspace."
        routes={getSectionRoutes("dashboard")}
      >
        <div>Dashboard section</div>
      </SectionLayout>,
    );

    expect(screen.getByText("/app/agents/[id]")).toBeInTheDocument();
  });
});
