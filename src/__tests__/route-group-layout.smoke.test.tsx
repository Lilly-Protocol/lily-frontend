import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

describe("Route group layout smoke tests", () => {
  it("renders marketing layout with banner and label", async () => {
    const Layout = (await import("../app/(marketing)/layout")).default;
    const Page = (await import("../app/(marketing)/page")).default;
    render(<Layout><Page /></Layout>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    const eyebrows = screen.getAllByText(/Public marketing/i);
    expect(eyebrows.length).toBeGreaterThanOrEqual(1);
  });

  it("renders auth layout with banner and label", async () => {
    const Layout = (await import("../app/(auth)/layout")).default;
    const Page = (await import("../app/(auth)/signin/page")).default;
    render(<Layout><Page /></Layout>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    const eyebrows = screen.getAllByText(/^Auth$/i);
    expect(eyebrows.length).toBeGreaterThanOrEqual(1);
  });

  it("renders support/legal layout with banner and label", async () => {
    const Layout = (await import("../app/(support)/layout")).default;
    const Page = (await import("../app/(support)/privacy/page")).default;
    render(<Layout><Page /></Layout>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    const eyebrows = screen.getAllByText(/Docs, status, and legal/i);
    expect(eyebrows.length).toBeGreaterThanOrEqual(1);
  });

  it("renders dashboard layout with banner and label", async () => {
    const Layout = (await import("../app/app/layout")).default;
    const Page = (await import("../app/app/page")).default;
    render(<Layout><Page /></Layout>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    const eyebrows = screen.getAllByText(/^Dashboard$/i);
    expect(eyebrows.length).toBeGreaterThanOrEqual(1);
  });
});
