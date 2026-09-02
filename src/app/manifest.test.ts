import { routes, siteConfig } from "@/config/site";

import manifest from "./manifest";

describe("web app manifest", () => {
  it("exposes install metadata and app icons", () => {
    const appManifest = manifest();

    expect(appManifest.name).toBe(siteConfig.name);
    expect(appManifest.short_name).toBe(siteConfig.shortName);
    expect(appManifest.start_url).toBe(routes.home);
    expect(appManifest.display).toBe("standalone");
    expect(appManifest.theme_color).toBe(siteConfig.themeColor);
    expect(appManifest.background_color).toBe(siteConfig.themeColor);
    expect(appManifest.icons).toEqual([
      {
        src: "/icons/lily-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/lily-maskable-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ]);
  });
});
