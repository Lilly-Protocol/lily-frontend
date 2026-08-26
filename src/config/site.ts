import type { Metadata } from "next";

import { routeScaffolds, staticSitePages } from "@/config/routes";

import type { RouteSection, SitePage, StaticSiteRoute } from "@/types/site";

export const routes = {
  home: "/",
  about: "/about",
  docs: "/docs",
  status: "/status",
  signin: "/signin",
  dashboard: "/app",
} as const satisfies Record<string, StaticSiteRoute>;

export const siteConfig = {
  name: "Lily Protocol",
  shortName: "Lily",
  description:
    "Contributor-ready frontend foundation for Lily Protocol, designed for issue-driven UI and product development.",
  tagline:
    "A stable Next.js frontend foundation for issue-driven open source contribution.",
  url: "https://lilyprotocol.dev",
  keywords: [
    "Stellar",
    "frontend",
    "Next.js",
    "TypeScript",
    "contributors",
    "open source",
    "web3",
  ],
  pages: staticSitePages as readonly SitePage[],
} as const;

const siteHeaderSections = new Set<RouteSection>([
  "marketing",
  "legal",
  "docs",
]);
const siteHeaderEntryIds = new Set(["signin", "dashboard-overview"]);

export const siteHeaderLinks = routeScaffolds
  .filter(
    (route) =>
      route.path !== routes.home &&
      (siteHeaderSections.has(route.section) || siteHeaderEntryIds.has(route.id)),
  )
  .map((route) => ({
    href: route.path as StaticSiteRoute,
    label: route.title,
  }));

export function createSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: [...siteConfig.keywords],
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.tagline,
      type: "website",
      siteName: siteConfig.name,
      url: siteConfig.url,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.tagline,
    },
  };
}

export function getAbsoluteUrl(path: StaticSiteRoute): string {
  if (path === routes.home) {
    return siteConfig.url;
  }

  return new URL(path, siteConfig.url).toString();
}
