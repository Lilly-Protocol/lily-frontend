import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

import MarketingPage from "../(marketing)/page";
import SigninPage from "../(auth)/signin/page";
import PrivacyPage from "../(support)/privacy/page";
import DashboardPage from "../app/page";

describe("Route group smoke tests", () => {
  it("renders marketing layout landmarks", () => {
    render(<MarketingPage />);
    expect(screen.getByRole("heading", { name: /landing page/i })).toBeInTheDocument();
  });

  it("renders auth layout landmarks", () => {
    render(<SigninPage />);
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  });

  it("renders support layout landmarks", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("heading", { name: /privacy policy/i })).toBeInTheDocument();
  });

  it("renders dashboard layout landmarks", () => {
    render(<DashboardPage />);
    expect(screen.getByRole("heading", { name: /dashboard overview/i })).toBeInTheDocument();
  });
});
