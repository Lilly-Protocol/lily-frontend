export type RouteSection =
  "marketing" | "auth" | "legal" | "docs" | "dashboard";

export type StaticSiteRoute =
  | "/"
  | "/about"
  | "/blog"
  | "/changelog"
  | "/ecosystem"
  | "/security"
  | "/grants"
  | "/careers"
  | "/contact"
  | "/signin"
  | "/signup"
  | "/terms"
  | "/privacy"
  | "/cookies"
  | "/docs"
  | "/status"
  | "/app"
  | "/app/agents"
  | "/app/payments"
  | "/app/wallets"
  | "/app/activity"
  | "/app/developers"
  | "/app/settings";

export type DynamicSiteRoute = "/app/agents/[id]";

export type SiteRoute = StaticSiteRoute | DynamicSiteRoute;

export type RouteScaffold = {
  readonly id: string;
  readonly title: string;
  readonly path: SiteRoute;
  readonly section: RouteSection;
  readonly purpose: string;
  readonly figmaScope: string;
  readonly implementationAreas: readonly string[];
  readonly includeInSitemap?: boolean;
};

export type SitePage = {
  readonly path: StaticSiteRoute;
  readonly priority: number;
};

export type SectionDefinition = {
  readonly key: RouteSection;
  readonly label: string;
  readonly description: string;
};
