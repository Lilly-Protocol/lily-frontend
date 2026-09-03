import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage, { metadata } from "@/app/(marketing)/about/page";
import { aboutSections } from "./about-data";
import { AboutContent } from "./about-content";

describe("AboutContent", () => {
  it("renders each named section", () => {
    render(<AboutContent />);
    for (const section of aboutSections) {
      expect(screen.getByRole("heading", { name: section.heading })).toBeInTheDocument();
    }
    expect(screen.getByText(/open tokenization infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText(/transparency/i)).toBeInTheDocument();
    expect(screen.getByText(/issuers/i)).toBeInTheDocument();
  });

  it("keeps heading levels logical: one h1 then h2 sections only", () => {
    render(<AboutPage />);
    const headings = screen.getAllByRole("heading");
    const levels = headings.map((h) => Number(h.tagName.charAt(1)));

    expect(levels[0]).toBe(1);
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    for (const level of levels.slice(1)) {
      expect(level).toBe(2);
    }
  });

  it("exports metadata with the about canonical URL", () => {
    expect(metadata.alternates?.canonical).toBe("https://lilyprotocol.dev/about");
  });

  it("renders no nested main landmark inside the page", () => {
    const { container } = render(<AboutPage />);
    expect(container.querySelectorAll("main")).toHaveLength(0);
  });
});
