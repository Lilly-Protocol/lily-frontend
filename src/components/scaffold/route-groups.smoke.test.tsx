import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LandingPage from "@/app/(marketing)/page";
import MarketingLayout from "@/app/(marketing)/layout";
import SignInPage from "@/app/(auth)/signin/page";
import AuthLayout from "@/app/(auth)/layout";
import DocsPage from "@/app/(support)/docs/page";
import SupportLayout from "@/app/(support)/layout";
import DashboardOverviewPage from "@/app/app/page";
import DashboardLayout from "@/app/app/layout";

describe("Route group layout smoke tests", () => {
  it("renders marketing pages inside the marketing section layout", () => {
    render(
      <MarketingLayout>
        <LandingPage />
      </MarketingLayout>,
    );

    expect(screen.getByText("Public marketing")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /landing page/i }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("heading", { name: /landing page/i })).toBeInTheDocument();
  });

  it("renders auth pages inside the auth section layout", () => {
    render(
      <AuthLayout>
        <SignInPage />
      </AuthLayout>,
    );

    expect(screen.getByText("Auth")).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: /section routes/i });
    expect(
      within(nav).getByRole("link", { name: /sign in/i }),
    ).toHaveAttribute("href", "/signin");
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  });

  it("renders support/docs pages inside the support section layout", () => {
    render(
      <SupportLayout>
        <DocsPage />
      </SupportLayout>,
    );

    expect(screen.getByText(/docs, status, and legal/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /documentation/i }),
    ).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("heading", { name: /documentation/i })).toBeInTheDocument();
  });

  it("renders dashboard pages inside the dashboard section layout", () => {
    render(
      <DashboardLayout>
        <DashboardOverviewPage />
      </DashboardLayout>,
    );

    expect(
      screen.getByRole("link", { name: /dashboard overview/i }),
    ).toHaveAttribute("href", "/app");
    expect(screen.getByRole("heading", { name: /dashboard overview/i })).toBeInTheDocument();
  });
});
