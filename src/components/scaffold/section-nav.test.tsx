import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { RouteScaffold } from "@/types/site";
import { SectionNav } from "./section-nav";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
    "aria-current": ariaCurrent,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    "aria-current"?: React.AriaAttributes["aria-current"];
  }) => (
    <a href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  ),
}));

const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

const mockRoutes: readonly RouteScaffold[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    section: "marketing",
    purpose: "Home",
    figmaScope: "Home",
    implementationAreas: [],
  },
  {
    id: "about",
    title: "About",
    path: "/about",
    section: "marketing",
    purpose: "About",
    figmaScope: "About",
    implementationAreas: [],
  },
  {
    id: "agent-detail",
    title: "Agent Detail",
    path: "/app/agents/[id]",
    section: "dashboard",
    purpose: "Agent Detail",
    figmaScope: "Agent Detail",
    implementationAreas: [],
  },
];

describe("SectionNav", () => {
  it("marks link as active when pathname matches exactly", () => {
    mockUsePathname.mockReturnValue("/about");
    render(<SectionNav routes={mockRoutes} />);
    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toHaveAttribute("aria-current", "page");
    expect(aboutLink.className).toContain("border-[var(--color-accent)]");
  });

  it("does not mark links as active on unrelated path", () => {
    mockUsePathname.mockReturnValue("/contact");
    render(<SectionNav routes={mockRoutes} />);
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).not.toHaveAttribute("aria-current");
  });

  it("renders placeholder div for dynamic route pattern", () => {
    mockUsePathname.mockReturnValue("/app/agents/123");
    render(<SectionNav routes={mockRoutes} />);
    expect(screen.queryByRole("link", { name: /agent detail/i })).toBeNull();
    expect(screen.getByText("Agent Detail")).toBeInTheDocument();
  });
});
