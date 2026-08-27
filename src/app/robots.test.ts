import robots from "./robots";

import { siteConfig } from "@/config/site";

describe("robots", () => {
  it("returns the configured host and sitemap URL", () => {
    expect(robots()).toMatchObject({
      host: siteConfig.url,
      sitemap: `${siteConfig.url}/sitemap.xml`,
      rules: {
        userAgent: "*",
        allow: "/",
      },
    });

    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
  });
});
