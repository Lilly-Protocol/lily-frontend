import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";

import type { RouteScaffold } from "@/types/site";

import AuthLayout from "./(auth)/layout";
import SignInPage from "./(auth)/signin/page";
import SignUpPage from "./(auth)/signup/page";
import AboutPage from "./(marketing)/about/page";
import BlogPage from "./(marketing)/blog/page";
import CareersPage from "./(marketing)/careers/page";
import ChangelogPage from "./(marketing)/changelog/page";
import ContactPage from "./(marketing)/contact/page";
import EcosystemPage from "./(marketing)/ecosystem/page";
import GrantsPage from "./(marketing)/grants/page";
import MarketingLayout from "./(marketing)/layout";
import LandingPage from "./(marketing)/page";
import SecurityPage from "./(marketing)/security/page";
import CookiesPage from "./(support)/cookies/page";
import DocsPage from "./(support)/docs/page";
import SupportLayout from "./(support)/layout";
import PrivacyPage from "./(support)/privacy/page";
import StatusPage from "./(support)/status/page";
import TermsPage from "./(support)/terms/page";
import ActivityPage from "./app/activity/page";
import AgentDetailPage from "./app/agents/[id]/page";
import AgentsPage from "./app/agents/page";
import AppLayout from "./app/layout";
import DashboardPage from "./app/page";
import DevelopersPage from "./app/developers/page";
import PaymentsPage from "./app/payments/page";
import SettingsPage from "./app/settings/page";
import WalletsPage from "./app/wallets/page";
import RootLayout, { metadata } from "./layout";
import robots from "./robots";
import sitemap from "./sitemap";
import { getRouteScaffold, staticSitePages } from "@/config/routes";
import { getAbsoluteUrl, siteConfig } from "@/config/site";

vi.mock("next/font/google", () => ({
  IBM_Plex_Mono: () => ({ variable: "font-ibm-plex-mono" }),
  Space_Grotesk: () => ({ variable: "font-space-grotesk" }),
}));

const scaffoldPages: readonly {
  readonly routeId: RouteScaffold["id"];
  readonly Page: React.ComponentType;
}[] = [
  { routeId: "landing", Page: LandingPage },
  { routeId: "about", Page: AboutPage },
  { routeId: "blog", Page: BlogPage },
  { routeId: "changelog", Page: ChangelogPage },
  { routeId: "ecosystem", Page: EcosystemPage },
  { routeId: "security", Page: SecurityPage },
  { routeId: "grants", Page: GrantsPage },
  { routeId: "careers", Page: CareersPage },
  { routeId: "contact", Page: ContactPage },
  { routeId: "signin", Page: SignInPage },
  { routeId: "signup", Page: SignUpPage },
  { routeId: "terms", Page: TermsPage },
  { routeId: "privacy", Page: PrivacyPage },
  { routeId: "cookies", Page: CookiesPage },
  { routeId: "docs", Page: DocsPage },
  { routeId: "status", Page: StatusPage },
  { routeId: "dashboard-overview", Page: DashboardPage },
  { routeId: "agents", Page: AgentsPage },
  { routeId: "developers", Page: DevelopersPage },
  { routeId: "payments", Page: PaymentsPage },
  { routeId: "wallets", Page: WalletsPage },
  { routeId: "activity", Page: ActivityPage },
  { routeId: "settings", Page: SettingsPage },
];

const sectionLayouts: readonly {
  readonly name: string;
  readonly title: string;
  readonly Layout: React.ComponentType<{
    readonly children: React.ReactNode;
  }>;
}[] = [
  { name: "auth", title: "Auth", Layout: AuthLayout },
  { name: "marketing", title: "Public marketing", Layout: MarketingLayout },
  { name: "support", title: "Docs, status, and legal", Layout: SupportLayout },
  { name: "dashboard", title: "Dashboard", Layout: AppLayout },
];

describe("app route modules", () => {
  it.each(scaffoldPages)(
    "covers the $routeId scaffold page module",
    ({ routeId, Page }) => {
      render(<Page />);

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: getRouteScaffold(routeId).title,
        }),
      ).toBeInTheDocument();
    },
  );

  it("covers the dynamic agent detail page module", async () => {
    const agentDetail = await AgentDetailPage({
      params: Promise.resolve({ id: "agent-123" }),
    });

    render(agentDetail);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: getRouteScaffold("agent-detail").title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("/app/agents/agent-123")).toBeInTheDocument();
  });

  it.each(sectionLayouts)(
    "covers the $name section layout module",
    ({ Layout, title }) => {
      render(
        <Layout>
          <div>Nested route content</div>
        </Layout>,
      );

      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
      expect(screen.getByText("Nested route content")).toBeInTheDocument();
    },
  );

  it("covers the root layout and metadata export", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <main>Root route content</main>
      </RootLayout>,
    );

    expect(markup).toContain('lang="en"');
    expect(markup).toContain("font-space-grotesk");
    expect(markup).toContain("Root route content");
    expect(metadata.applicationName).toBe(siteConfig.name);
  });

  it("covers robots and sitemap metadata route modules", () => {
    const robotsOutput = robots();
    const sitemapOutput = sitemap();

    expect(robotsOutput.host).toBe(siteConfig.url);
    expect(robotsOutput.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
    expect(sitemapOutput).toHaveLength(staticSitePages.length);
    expect(sitemapOutput[0]).toMatchObject({
      url: getAbsoluteUrl("/"),
      priority: 1,
    });
    expect(sitemapOutput.map((entry) => entry.url)).toEqual(
      staticSitePages.map((page) => getAbsoluteUrl(page.path)),
    );
  });
});
