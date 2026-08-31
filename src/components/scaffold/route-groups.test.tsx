import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import MarketingLayout from "@/app/(marketing)/layout";
import AuthLayout from "@/app/(auth)/layout";
import SupportLayout from "@/app/(support)/layout";
import DashboardLayout from "@/app/app/layout";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

describe("Route group layouts", () => {
  it("renders marketing layout landmarks for marketing pages", () => {
    render(
      <MarketingLayout>
        <div>Marketing content</div>
      </MarketingLayout>,
    );

    expect(screen.getByRole("link", { name: /lily protocol/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /section routes/i })).toBeInTheDocument();
    expect(screen.getByText("Marketing content")).toBeInTheDocument();
  });

  it("renders auth layout shell for authentication pages", () => {
    render(
      <AuthLayout>
        <div>Auth content</div>
      </AuthLayout>,
    );

    expect(screen.getByRole("link", { name: /lily protocol/i })).toBeInTheDocument();
    expect(screen.getByText("Auth content")).toBeInTheDocument();
  });

  it("renders support layout shell for legal and docs pages", () => {
    render(
      <SupportLayout>
        <div>Support content</div>
      </SupportLayout>,
    );

    expect(screen.getByRole("link", { name: /lily protocol/i })).toBeInTheDocument();
    expect(screen.getByText("Support content")).toBeInTheDocument();
  });

  it("renders dashboard layout shell for app pages", () => {
    render(
      <DashboardLayout>
        <div>Dashboard content</div>
      </DashboardLayout>,
    );

    expect(screen.getByRole("link", { name: /lily protocol/i })).toBeInTheDocument();
    expect(screen.getByText("Dashboard content")).toBeInTheDocument();
  });
});
