import sitemap from "./sitemap";

import { staticSitePages } from "@/config/routes";
import { getAbsoluteUrl } from "@/config/site";

describe("sitemap", () => {
  it("returns one absolute URL entry for each static site page", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(staticSitePages.length);
    expect(entries.map((entry) => entry.url)).toEqual(
      staticSitePages.map((page) => getAbsoluteUrl(page.path)),
    );
    expect(entries.every((entry) => URL.canParse(entry.url))).toBe(true);
  });

  it("marks the home page with the highest priority", () => {
    const homeUrl = getAbsoluteUrl("/");
    const entriesByUrl = new Map(
      sitemap().map((entry) => [entry.url, entry.priority]),
    );
    const homePriority = entriesByUrl.get(homeUrl);

    expect(homePriority).toBe(1);

    if (homePriority === undefined) {
      throw new Error("Expected the home page to be present in the sitemap");
    }

    for (const [url, priority] of entriesByUrl.entries()) {
      if (url === homeUrl) {
        continue;
      }

      if (priority === undefined) {
        throw new Error(`Expected ${url} to define a sitemap priority`);
      }

      expect(priority).toBeLessThan(homePriority);
    }
  });
});
