import { render, screen } from "@testing-library/react";

import { routes } from "@/config/site";

import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders the default empty state without an action", () => {
    render(
      <EmptyState
        title="No wallets yet"
        description="Connect a wallet to start tracking balances and activity."
      />,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: /no wallets yet/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/connect a wallet/i)).toBeInTheDocument();
    expect(screen.getByText(/no data yet/i)).toHaveClass(
      "text-[var(--color-accent)]",
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders an icon slot and CTA link when provided", () => {
    render(
      <EmptyState
        eyebrow="Agents"
        icon={<span data-testid="agent-icon">A</span>}
        title="No agents configured"
        description="Create an agent when workspace automation is ready."
        action={{ label: "Open dashboard", href: routes.dashboard }}
      />,
    );

    expect(screen.getByTestId("agent-icon")).toBeInTheDocument();
    expect(screen.getByText("Agents")).toHaveClass(
      "text-[var(--color-accent)]",
    );
    expect(
      screen.getByRole("link", { name: /open dashboard/i }),
    ).toHaveAttribute("href", routes.dashboard);
  });
});
