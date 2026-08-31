import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "./site-header";
import { routes } from "@/config/site";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <a href={href} {...props}>{children}</a>,
}));

describe("SiteHeader", () => {
  it("renders links that mirror the site route registry", () => {
    render(<SiteHeader />);
    
    // Assert key routes from src/config/site.ts are present
    expect(screen.getByRole("link", { name: /docs/i })).toHaveAttribute("href", routes.docs);
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute("href", routes.signin);
    expect(screen.getByRole("link", { name: /dashboard/i })).toHaveAttribute("href", routes.dashboard);
    
    // Ensure no dead links by checking all rendered links have valid hrefs from routes or home
    const links = screen.getAllByRole("link");
    const validHrefs = Object.values(routes);
    for (const link of links) {
      expect(validHrefs).toContain(link.getAttribute("href"));
    }
  });
});
