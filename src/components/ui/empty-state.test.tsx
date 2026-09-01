import { render, screen } from "@testing-library/react";

import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders its icon, title, and description without an action", () => {
    render(
      <EmptyState
        icon={<span data-testid="empty-state-icon">Icon</span>}
        title="No activity yet"
        description="Completed activity will appear here."
      />,
    );

    expect(screen.getByTestId("empty-state-icon")).toBeInTheDocument();
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "No activity yet",
    });
    expect(heading).toBeInTheDocument();
    expect(heading.closest("section")).toHaveClass("surface");
    expect(
      screen.getByText("Completed activity will appear here."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders optional eyebrow and call-to-action content", () => {
    render(
      <EmptyState
        icon={<span aria-hidden="true">+</span>}
        eyebrow="Wallets"
        title="No wallets yet"
        description="Create a wallet to start receiving payments."
        action={<button type="button">Create wallet</button>}
      />,
    );

    expect(screen.getByText("Wallets")).toHaveClass("eyebrow");
    expect(
      screen.getByRole("button", { name: "Create wallet" }),
    ).toBeInTheDocument();
  });
});
