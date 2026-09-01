import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

// Import layouts from each route group to assert they render without error
import SupportLayout from "./(support)/layout";
import AuthLayout from "./(auth)/layout";
import MarketingLayout from "./(marketing)/layout";

describe("Route Groups Smoke Test", () => {
  it("renders (support) layout without crashing", () => {
    render(<SupportLayout><div>Support Content</div></SupportLayout>);
    expect(screen.getByText("Support Content")).toBeInTheDocument();
  });

  it("renders (auth) layout without crashing", () => {
    render(<AuthLayout><div>Auth Content</div></AuthLayout>);
    expect(screen.getByText("Auth Content")).toBeInTheDocument();
  });

  it("renders (marketing) layout without crashing", () => {
    render(<MarketingLayout><div>Marketing Content</div></MarketingLayout>);
    expect(screen.getByText("Marketing Content")).toBeInTheDocument();
  });
});
