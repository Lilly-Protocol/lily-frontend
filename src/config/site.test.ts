import {
  createOrganizationJsonLd,
  createSiteMetadata,
  getAbsoluteUrl,
  routes,
  siteConfig,
} from "./site";


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
    expect(getAbsoluteUrl(routes.docs)).toBe(`${siteConfig.url}${routes.docs}`);
  });

  it("generates valid Organization JSON-LD structured data matching site config", () => {
    const jsonLd = createOrganizationJsonLd();
    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("Organization");
    expect(jsonLd.name).toBe(siteConfig.name);
    expect(jsonLd.url).toBe(siteConfig.url);
    expect(jsonLd.description).toBe(siteConfig.description);
  });
});

