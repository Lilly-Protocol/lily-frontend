import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

 vi.mock("next/link", () => ({
   default: ({
     href,
     children,
     ...props
   }: {
     href: string;
     children: React.ReactNode;
     [key: string]: unknown;
   }) => (
     <a href={href} {...props}>
       {children}
     </a>
   ),
 }));

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("renders legal and docs links from route registry", () => {
    render(<SiteFooter />);

    const terms = screen.getByRole("link", { name: /terms of service/i });
    const privacy = screen.getByRole("link", { name: /privacy policy/i });
    const cookies = screen.getByRole("link", { name: /cookie policy/i });
    const docs = screen.getByRole("link", { name: /^documentation$/i });
    const status = screen.getByRole("link", { name: /status page/i });

    expect(terms).toHaveAttribute("href", "/terms");
    expect(privacy).toHaveAttribute("href", "/privacy");
    expect(cookies).toHaveAttribute("href", "/cookies");
    expect(docs).toHaveAttribute("href", "/docs");
    expect(status).toHaveAttribute("href", "/status");
  });

  it("renders copyright text with site name", () => {
    render(<SiteFooter />);
    expect(screen.getByText(/lily protocol/i)).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});
