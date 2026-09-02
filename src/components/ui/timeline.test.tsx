import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Timeline, type TimelineItemProps } from "./timeline";

describe("Timeline Component", () => {
  const mockItems: TimelineItemProps[] = [
    {
      date: "2026-08-25",
      title: "v0.1.0 Foundation Release",
      description: "Initial stable architecture and quality pipeline.",
      status: "released",
    },
    {
      date: "2026-08-20",
      title: "Design System Tokens",
      description: "Color palette and typography integration.",
      status: "completed",
    },
    {
      date: "2026-08-15",
      title: "Contract Interface Draft",
      status: "in-progress",
      tag: "WIP",
    },
  ];

  it("renders all timeline items with date, title, and description", () => {
    render(<Timeline items={mockItems} />);

    expect(screen.getByText("v0.1.0 Foundation Release")).toBeInTheDocument();
    expect(screen.getByText("Design System Tokens")).toBeInTheDocument();
    expect(screen.getByText("Contract Interface Draft")).toBeInTheDocument();

    expect(screen.getByText("2026-08-25")).toBeInTheDocument();
    expect(
      screen.getByText("Initial stable architecture and quality pipeline."),
    ).toBeInTheDocument();
  });

  it("renders status badges and custom tags accurately", () => {
    render(<Timeline items={mockItems} />);

    expect(screen.getByText("released")).toBeInTheDocument();
    expect(screen.getByText("completed")).toBeInTheDocument();
    expect(screen.getByText("WIP")).toBeInTheDocument();
  });

  it("omits connecting line on the last item", () => {
    render(<Timeline items={mockItems} />);

    const lines = screen.getAllByTestId("timeline-line");
    // With 3 items, there should be exactly 2 connecting lines between them
    expect(lines).toHaveLength(2);
  });

  it("renders empty timeline without crash", () => {
    const { container } = render(<Timeline items={[]} />);
    const list = container.querySelector("ol");
    expect(list).toBeInTheDocument();
    expect(list?.children).toHaveLength(0);
  });
});
