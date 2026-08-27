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

  it("applies consistent keyboard focus styling to scaffold links", async () => {
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

    const brandLink = screen.getByRole("link", { name: /lily protocol/i });
    const docsLink = screen.getByRole("link", { name: /docs/i });
    const landingLink = screen.getByRole("link", { name: /landing page/i });

    for (const link of [brandLink, docsLink, landingLink]) {
      expect(link.className).toContain(
        "focus-visible:outline-[var(--focus-ring)]",
      );
      expect(link.className).toContain("focus-visible:outline-offset-4");
    }

    await user.tab();

    expect(brandLink).toHaveFocus();

    await user.tab();

    expect(docsLink).toHaveFocus();
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
