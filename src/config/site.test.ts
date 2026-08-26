import { createSiteMetadata, getAbsoluteUrl, routes, siteConfig } from "./site";

describe("site config", () => {
  it("creates consistent metadata", () => {
    const metadata = createSiteMetadata();

    expect(metadata.applicationName).toBe(siteConfig.name);
    expect(metadata.title).toEqual({
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    });
    expect(metadata.title).toEqual(
      expect.objectContaining({ template: expect.stringContaining("%s") }),
    );
    expect(metadata.metadataBase?.toString()).toBe(`${siteConfig.url}/`);
    expect(metadata.openGraph).toEqual({
      title: siteConfig.name,
      description: siteConfig.tagline,
      type: "website",
      siteName: siteConfig.name,
      url: siteConfig.url,
    });
    expect(metadata.twitter).toEqual({
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.tagline,
    });
  });

  it("builds absolute page urls from typed routes", () => {
    expect(getAbsoluteUrl(routes.home)).toBe(siteConfig.url);
    expect(getAbsoluteUrl(routes.docs)).toBe(
      `${siteConfig.url}${routes.docs}`,
    );
  });
});
