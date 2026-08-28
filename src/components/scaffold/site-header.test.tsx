import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "./site-header";

describe("SiteHeader Responsive Navigation", () => {
  it("renders desktop navigation links", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: /lily protocol/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^docs$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^sign in$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^dashboard$/i })).toBeInTheDocument();
  });

  it("toggles mobile menu with aria-expanded and aria-controls attributes", () => {
    render(<SiteHeader />);
    const toggleButton = screen.getByRole("button", { name: /open menu/i });
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton).toHaveAttribute("aria-controls", "mobile-navigation");

    // Open menu
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByLabelText("Mobile Navigation")).toBeInTheDocument();

    // Close menu on click
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByLabelText("Mobile Navigation")).not.toBeInTheDocument();
  });

  it("closes the mobile menu when Escape key is pressed", () => {
    render(<SiteHeader />);
    const toggleButton = screen.getByRole("button", { name: /open menu/i });

    // Open menu
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText("Mobile Navigation")).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByLabelText("Mobile Navigation")).not.toBeInTheDocument();
  });
});
