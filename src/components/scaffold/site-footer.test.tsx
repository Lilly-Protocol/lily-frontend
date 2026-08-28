import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./site-footer";

describe("SiteFooter Component", () => {
  it("renders brand metadata and all legal and docs route links from registry", () => {
    render(<SiteFooter />);

    // Brand and copyright
    expect(screen.getByText("Lily Protocol")).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();

    // Legal & Support Links
    expect(screen.getByRole("link", { name: /terms of service/i })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: /cookie policy/i })).toHaveAttribute("href", "/cookies");
    expect(screen.getByRole("link", { name: /documentation/i })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("link", { name: /status page/i })).toHaveAttribute("href", "/status");
  });
});
