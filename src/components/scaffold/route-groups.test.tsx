import { render, screen, within } from "@testing-library/react";

import { PageScaffold } from "@/components/scaffold/page-scaffold";
import { getRouteScaffold } from "@/config/routes";

import AuthLayout from "../../app/(auth)/layout";
import MarketingLayout from "../../app/(marketing)/layout";
import SupportLayout from "../../app/(support)/layout";
import DashboardLayout from "../../app/app/layout";

describe("route group layouts", () => {
  it("renders the marketing layout with its site header and section label", () => {
    render(
      <MarketingLayout>
        <PageScaffold route={getRouteScaffold("landing")} />
      </MarketingLayout>,
    );

    const header = within(screen.getByRole("banner"));
    expect(header.getByRole("link", { name: /lily protocol/i })).toBeInTheDocument();
    expect(screen.getByText("Public marketing")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /landing page/i })).toBeInTheDocument();
  });

  it("renders the auth layout with its site header and section label", () => {
    render(
      <AuthLayout>
        <PageScaffold route={getRouteScaffold("signin")} />
      </AuthLayout>,
    );

    const header = within(screen.getByRole("banner"));
    expect(header.getByRole("link", { name: /lily protocol/i })).toBeInTheDocument();
    expect(screen.getByText("Auth")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  });

  it("renders the support layout with its site header and combined section label", () => {
    render(
      <SupportLayout>
        <PageScaffold route={getRouteScaffold("docs")} />
      </SupportLayout>,
    );

    const header = within(screen.getByRole("banner"));
    expect(header.getByRole("link", { name: /lily protocol/i })).toBeInTheDocument();
    expect(screen.getByText("Docs, status, and legal")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /documentation/i })).toBeInTheDocument();
  });

  it("renders the dashboard layout with its site header and section label", () => {
    render(
      <DashboardLayout>
        <PageScaffold route={getRouteScaffold("dashboard-overview")} />
      </DashboardLayout>,
    );

    const header = within(screen.getByRole("banner"));
    expect(header.getByRole("link", { name: /lily protocol/i })).toBeInTheDocument();
    expect(
      screen.getByText("Signed-in product surfaces for agents, wallets, payments, and settings."),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /dashboard overview/i })).toBeInTheDocument();
  });
});
