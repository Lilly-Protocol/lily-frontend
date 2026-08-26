import { createSiteMetadata, getAbsoluteUrl, routes, siteConfig } from "./site";

describe("site config", () => {
  it("creates consistent metadata", () => {
    const metadata = createSiteMetadata();

    expect(metadata.applicationName).toBe(siteConfig.name);
    expect(metadata.title).toEqual({
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    });
    expect(metadata.metadataBase?.toString()).toBe(`${siteConfig.url}/`);
  });

  it("builds absolute page urls from typed routes", () => {
    expect(getAbsoluteUrl(routes.home)).toBe(siteConfig.url);
    expect(getAbsoluteUrl(routes.docs)).toBe(
      `${siteConfig.url}${routes.docs}`,
    );
  });

  it("keeps home and nested dashboard urls normalized", () => {
    expect(getAbsoluteUrl(routes.home)).toBe(siteConfig.url);

    const nestedUrl = new URL(getAbsoluteUrl("/app/activity"));

    expect(nestedUrl.origin).toBe(siteConfig.url);
    expect(nestedUrl.pathname).toBe("/app/activity");
    expect(nestedUrl.toString()).toBe(`${siteConfig.url}/app/activity`);
    expect(nestedUrl.pathname).not.toContain("//");
  });

  it("builds valid absolute urls for every static site page", () => {
    for (const page of siteConfig.pages) {
      expect(() => getAbsoluteUrl(page.path)).not.toThrow();
      expect(new URL(getAbsoluteUrl(page.path)).origin).toBe(siteConfig.url);
    }
  });
});
