import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("renders brand name and copyright", () => {
    render(<SiteFooter />);
    const brandElements = screen.getAllByText(/Lily Protocol/i);
    expect(brandElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  it("includes legal and support links from route registry", () => {
    render(<SiteFooter />);
    const nav = screen.getByRole("navigation", { name: /legal and support/i });
    expect(nav).toBeInTheDocument();
    
    expect(screen.getByRole("link", { name: /Terms of Service/i })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: /Privacy Policy/i })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: /Cookie Policy/i })).toHaveAttribute("href", "/cookies");
    expect(screen.getByRole("link", { name: /Documentation/i })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("link", { name: /Status Page/i })).toHaveAttribute("href", "/status");
  });
});
