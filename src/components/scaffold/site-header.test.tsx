import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/scaffold/site-header";
import { siteConfig } from "@/config/site";

describe("SiteHeader accessibility", () => {
  it("exposes a banner landmark", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("names the primary navigation landmark", () => {
    // An unnamed nav is just "navigation" in a screen reader's landmark list,
    // which is useless once a page has more than one.
    render(<SiteHeader />);

    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  });

  it("gives the wordmark an accessible name that says where it goes", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: `${siteConfig.name} home` }),
    ).toBeInTheDocument();
  });

  it("offers a skip link as the first focusable element", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.tab();

    const skip = screen.getByRole("link", { name: /skip to main content/i });
    expect(skip).toHaveFocus();
    expect(skip).toHaveAttribute("href", "#main-content");
  });

  it("reaches every primary link by keyboard, in visual order", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const reached: string[] = [];
    for (let i = 0; i < 5; i += 1) {
      await user.tab();
      const active = document.activeElement;
      if (active instanceof HTMLAnchorElement) {
        reached.push(active.textContent?.trim() ?? "");
      }
    }

    expect(reached).toEqual([
      "Skip to main content",
      siteConfig.name,
      "Docs",
      "Sign in",
      "Dashboard",
    ]);
  });

  it("keeps every nav destination a real link rather than a click handler", () => {
    // Links must be links: a div with onClick is not reachable by tab and has
    // no role for assistive tech.
    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(nav).getAllByRole("link");

    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute("href");
    }
  });
});
