import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SiteFooter } from "../site-footer";

describe("SiteFooter", () => {
  it("renders legal and support links", () => {
    render(<SiteFooter />);
    
    const privacyLink = screen.getByRole("link", { name: /privacy/i });
    const termsLink = screen.getByRole("link", { name: /terms/i });
    
    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href");
    expect(termsLink).toHaveAttribute("href");
  });

  it("renders copyright notice", () => {
    render(<SiteFooter />);
    expect(screen.getByText(/©/i)).toBeInTheDocument();
  });
});
