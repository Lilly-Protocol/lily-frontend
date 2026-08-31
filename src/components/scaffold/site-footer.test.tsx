import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("renders legal and support links with correct hrefs", () => {
    render(<SiteFooter />);

    const terms = screen.getByRole("link", { name: /terms/i });
    const privacy = screen.getByRole("link", { name: /privacy/i });
    const cookies = screen.getByRole("link", { name: /cookies/i });
    const support = screen.getByRole("link", { name: /support/i });

    expect(terms).toHaveAttribute("href", "/terms");
    expect(privacy).toHaveAttribute("href", "/privacy");
    expect(cookies).toHaveAttribute("href", "/cookies");
    expect(support).toHaveAttribute("href", "/contact");
  });

  it("renders copyright text", () => {
    render(<SiteFooter />);
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});
