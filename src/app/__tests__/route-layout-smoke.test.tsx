import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MarketingLayout from "@/app/(marketing)/layout";
import AuthLayout from "@/app/(auth)/layout";
import SupportLayout from "@/app/(support)/layout";
import DashboardLayout from "@/app/app/layout";
import LandingPage from "@/app/(marketing)/page";
import SignInPage from "@/app/(auth)/signin/page";
import DocsPage from "@/app/(support)/docs/page";
import DashboardPage from "@/app/app/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Route group layout smoke tests (#129)", () => {
  it("renders marketing pages inside the SectionLayout with SiteHeader and nav", () => {
    render(
      <MarketingLayout>
        <LandingPage />
      </MarketingLayout>,
    );
    expect(document.querySelector("header")).toBeTruthy();
    expect(document.querySelector("aside")).toBeTruthy();
  });

  it("renders auth pages inside the SectionLayout with SiteHeader and nav", () => {
    render(
      <AuthLayout>
        <SignInPage />
      </AuthLayout>,
    );
    expect(document.querySelector("header")).toBeTruthy();
    expect(document.querySelector("aside")).toBeTruthy();
  });

  it("renders support/docs pages inside the SectionLayout with SiteHeader and nav", () => {
    render(
      <SupportLayout>
        <DocsPage />
      </SupportLayout>,
    );
    expect(document.querySelector("header")).toBeTruthy();
    expect(document.querySelector("aside")).toBeTruthy();
  });

  it("renders dashboard pages inside the SectionLayout with SiteHeader and nav", () => {
    render(
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>,
    );
    expect(document.querySelector("header")).toBeTruthy();
    expect(document.querySelector("aside")).toBeTruthy();
  });
});
