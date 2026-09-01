import { defaultSitemapUpdatedAt } from "@/config/routes";
import { getAbsoluteUrl, routes, siteConfig } from "@/config/site";

import sitemap from "./sitemap";

describe("sitemap", () => {
  it("uses stable route dates across generations", () => {
    const first = sitemap();
    const second = sitemap();

    expect(second).toEqual(first);
    expect(first.every((entry) => entry.lastModified instanceof Date)).toBe(
      true,
    );
  });

  it("uses the home page updatedAt and a documented fallback", () => {
    const entries = sitemap();
    const homePage = siteConfig.pages.find((page) => page.path === routes.home);
    const homeEntry = entries.find(
      (entry) => entry.url === getAbsoluteUrl(routes.home),
    );
    const fallbackPage = siteConfig.pages.find((page) => !page.updatedAt);
    const fallbackEntry = entries.find(
      (entry) => entry.url === getAbsoluteUrl(fallbackPage!.path),
    );

    expect(homePage?.updatedAt).toBeDefined();
    expect(homeEntry?.lastModified).toEqual(new Date(homePage!.updatedAt!));
    expect(fallbackEntry?.lastModified).toEqual(
      new Date(defaultSitemapUpdatedAt),
    );
  });
});
