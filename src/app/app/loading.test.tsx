import { render, screen } from "@testing-library/react";

import DashboardLoading from "./loading";

describe("DashboardLoading", () => {
  it("renders an accessible scaffold-shaped loading shell", () => {
    render(<DashboardLoading />);

    const status = screen.getByRole("status", { name: "Loading dashboard" });
    const placeholders = screen.getAllByTestId("dashboard-loading-placeholder");

    expect(status).toHaveAttribute("aria-busy", "true");
    expect(status).toHaveClass("surface", "motion-safe:animate-pulse");
    expect(status).not.toHaveClass("animate-pulse");
    expect(placeholders).toHaveLength(7);
    expect(screen.getByText("Loading dashboard content")).toHaveClass(
      "sr-only",
    );
  });
});
