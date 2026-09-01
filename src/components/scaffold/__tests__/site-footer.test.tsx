import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { routeScaffolds } from "@/config/routes";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("SiteFooter", () => {
  it("renders legal and support links from the route registry", async () => {
    const { SiteFooter } = await import("@/components/scaffold/site-footer");
    render(<SiteFooter />);

    const legalIds = ["terms", "privacy", "cookies"];
    const supportIds = ["docs", "status", "contact"];
    const expectedIds = [...legalIds, ...supportIds];

    for (const id of expectedIds) {
      const route = routeScaffolds.find((r) => r.id === id);
      expect(route, `Route ${id} should exist in registry`).toBeDefined();
      if (route) {
        const link = screen.getByRole("link", { name: route.title });
        expect(link).toHaveAttribute("href", route.path);
      }
    }
  });

  it("renders copyright line with current year", async () => {
    const { SiteFooter } = await import("@/components/scaffold/site-footer");
    render(<SiteFooter />);

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
