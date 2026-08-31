 import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

describe("SiteHeader Mobile Navigation (Issue #118)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders desktop nav links by default", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: /docs/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
  });

  it("renders a hamburger button for mobile", () => {
    render(<SiteHeader />);
    const button = screen.getByRole("button", { name: /open menu/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "mobile-nav-menu");
  });

  it("toggles mobile menu visibility on button click", () => {
    render(<SiteHeader />);
    const button = screen.getByRole("button", { name: /open menu/i });
    
    // Initially closed - mobile menu should not be visible
    expect(screen.queryByLabelText("Mobile")).not.toBeInTheDocument();
    
    // Open menu
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByLabelText("Mobile")).toBeInTheDocument();
    
    // Close menu
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByLabelText("Mobile")).not.toBeInTheDocument();
  });

  it("closes mobile menu on Escape key press and returns focus to button", () => {
    render(<SiteHeader />);
    const button = screen.getByRole("button", { name: /open menu/i });
    
    fireEvent.click(button);
    expect(screen.getByLabelText("Mobile")).toBeInTheDocument();
    
    fireEvent.keyDown(document, { key: "Escape" });
    
    expect(screen.queryByLabelText("Mobile")).not.toBeInTheDocument();
    expect(button).toHaveFocus();
  });

  it("closes mobile menu when a link is clicked", () => {
    render(<SiteHeader />);
    const button = screen.getByRole("button", { name: /open menu/i });
    
    fireEvent.click(button);
   const mobileMenu = screen.getByLabelText("Mobile");
   const docsLink = within(mobileMenu).getByRole("link", { name: /docs/i });
    
    fireEvent.click(docsLink);
    expect(screen.queryByLabelText("Mobile")).not.toBeInTheDocument();
  });
});
