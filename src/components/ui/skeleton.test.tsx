import { render, screen, within } from "@testing-library/react";

import {
  Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonText,
} from "./skeleton";

describe("Skeleton", () => {
  it("renders a token-based placeholder that respects reduced motion", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton.className).toContain("bg-[var(--color-panel-muted)]");
    expect(skeleton.className).toContain("motion-safe:animate-pulse");
    expect(skeleton.className).toContain("motion-reduce:animate-none");
  });

  it("can render without animation", () => {
    render(<Skeleton animated={false} data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton").className).not.toContain(
      "motion-safe:animate-pulse",
    );
  });

  it("covers text and avatar variants", () => {
    render(
      <>
        <SkeletonText data-testid="text-loader" lines={3} />
        <SkeletonAvatar data-testid="avatar-loader" size="lg" />
      </>,
    );

    expect(screen.getByTestId("text-loader")).toHaveAccessibleName(
      "Loading text",
    );
    expect(
      within(screen.getByTestId("text-loader")).getAllByRole("generic", {
        hidden: true,
      }),
    ).toHaveLength(3);
    expect(screen.getByTestId("avatar-loader").className).toContain("h-14 w-14");
  });

  it("renders a card variant with optional avatar and text rows", () => {
    render(<SkeletonCard data-testid="card-loader" rows={2} />);

    const card = screen.getByTestId("card-loader");
    expect(card).toHaveAccessibleName("Loading card");
    expect(card.className).toContain("bg-[var(--color-panel)]");
    expect(card.className).toContain("border-[var(--color-line)]");
    expect(screen.getByLabelText("Loading card details")).toBeInTheDocument();
  });
});
