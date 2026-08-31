import { describe, it, expect } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("disallows /app for all user agents", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const globalRule = rules.find((r: any) => r.userAgent === "*");
    expect(globalRule).toBeDefined();
    expect(globalRule?.disallow).toBe("/app");
  });

  it("still allows root path", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const globalRule = rules.find((r: any) => r.userAgent === "*");
    expect(globalRule?.allow).toBe("/");
  });
});
