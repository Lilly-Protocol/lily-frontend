import { describe, expect, it } from "vitest";
import robots from "./robots";
import { siteConfig } from "@/config/site";

describe("robots.txt configuration", () => {
  it("disallows authenticated /app routes while allowing public crawling", () => {
    const config = robots();

    expect(config.host).toBe(siteConfig.url);
    expect(config.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);

    const rules = Array.isArray(config.rules) ? config.rules[0] : config.rules;
    expect(rules).toBeDefined();
    expect(rules?.userAgent).toBe("*");
    expect(rules?.allow).toBe("/");
    expect(rules?.disallow).toEqual(["/app", "/app/"]);
  });
});
