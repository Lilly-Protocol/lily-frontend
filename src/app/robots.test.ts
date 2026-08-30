import { describe, expect, it } from "vitest";

import robots from "./robots";

describe("robots", () => {
  it("disallows /app routes for all user agents", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const catchAll = rules.find((r) => r.userAgent === "*");

    expect(catchAll).toBeDefined();
    expect(catchAll?.allow).toContain("/");
    expect(catchAll?.disallow).toContain("/app");
    expect(catchAll?.disallow).toContain("/app/");
  });

  it("keeps sitemap reference intact", () => {
    const result = robots();
    expect(result.sitemap).toMatch(/\/sitemap\.xml$/);
  });
});
