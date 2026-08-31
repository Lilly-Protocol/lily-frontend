import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SiteHeader } from "./site-header";

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
    "aria-current"?: string;
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

describe("SiteHeader", () => {
  it("marks docs link as active when pathname matches", () => {
    mockUsePathname.mockReturnValue("/docs");
    render(<SiteHeader />);
    const docsLink = screen.getByRole("link", { name: /docs/i });
    expect(docsLink).toHaveAttribute("aria-current", "page");
    expect(docsLink.className).toContain("border-[var(--color-accent)]");
  });

  it("does not mark links as active on unrelated path", () => {
    mockUsePathname.mockReturnValue("/about");
    render(<SiteHeader />);
    const docsLink = screen.getByRole("link", { name: /docs/i });
    expect(docsLink).not.toHaveAttribute("aria-current");
  });

 it("marks dashboard link as active when pathname matches", () => {
    mockUsePathname.mockReturnValue("/app");
   render(<SiteHeader />);
   const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
   expect(dashboardLink).toHaveAttribute("aria-current", "page");
   expect(dashboardLink.className).toContain("bg-[var(--color-accent)]");
 });
});
