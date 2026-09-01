import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import DashboardError from "./error";

describe("DashboardError", () => {
  it("renders a friendly recovery message and resets the route", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();

    render(
      <DashboardError error={new Error("sensitive detail")} reset={reset} />,
    );

    expect(
      screen.getByRole("heading", { name: "Dashboard unavailable" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("sensitive detail")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(reset).toHaveBeenCalledOnce();
  });
});
