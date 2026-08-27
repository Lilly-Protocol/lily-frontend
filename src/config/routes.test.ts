import {
  getRouteScaffold,
  routeScaffolds,
  sectionDefinitions,
  staticSitePages,
} from "./routes";

describe("route scaffolds", () => {
  it("covers the planned contributor-facing route map", () => {
    expect(routeScaffolds).toHaveLength(24);
    expect(getRouteScaffold("landing").path).toBe("/");
    expect(getRouteScaffold("agent-detail").path).toBe("/app/agents/[id]");
  });

  it("keeps only static pages in the sitemap list", () => {
    expect(staticSitePages.some((page) => page.path === "/")).toBe(true);
    expect(staticSitePages.some((page) => page.path === "/docs")).toBe(true);
    expect(getRouteScaffold("agent-detail").includeInSitemap).not.toBe(true);
  });

  it("keeps route ids and paths unique", () => {
    const routeIds = routeScaffolds.map((route) => route.id);
    const routePaths = routeScaffolds.map((route) => route.path);

    expect(new Set(routeIds).size).toBe(routeScaffolds.length);
    expect(new Set(routePaths).size).toBe(routeScaffolds.length);
  });

  it("uses known section keys for every scaffold route", () => {
    const sectionKeys = new Set(
      sectionDefinitions.map((section) => section.key),
    );

    expect(routeScaffolds.every((route) => sectionKeys.has(route.section))).toBe(
      true,
    );
  });

  it("keeps sitemap entries static and registered", () => {
    const sitemapPaths = staticSitePages.map((page) => page.path);
    const includedStaticPaths = routeScaffolds
      .filter((route) => route.includeInSitemap)
      .map((route) => route.path);

    expect(sitemapPaths).toEqual(includedStaticPaths);
    expect(sitemapPaths.every((path) => !path.includes("["))).toBe(true);
  });

  it("groups scaffold routes by section", () => {
    expect(getRouteScaffold("signin").section).toBe("auth");
    expect(getRouteScaffold("settings").section).toBe("dashboard");
  });
});
