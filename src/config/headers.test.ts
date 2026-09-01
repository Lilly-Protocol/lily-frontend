import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

describe("security headers configuration", () => {
  it("defines headers for all routes", async () => {
    expect(nextConfig.headers).toBeDefined();
    if (typeof nextConfig.headers !== "function") {
      throw new Error("headers must be a function in nextConfig");
    }

    const headerConfigs = await nextConfig.headers();
    expect(headerConfigs.length).toBeGreaterThan(0);

    const globalHeadersConfig = headerConfigs.find(
      (h: { source: string }) => h.source === "/:path*",
    );
    expect(globalHeadersConfig).toBeDefined();

    const headers = globalHeadersConfig?.headers ?? [];
    const headerMap = new Map(
      headers.map((h: { key: string; value: string }) => [h.key, h.value]),
    );

    expect(headerMap.get("Referrer-Policy")).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(headerMap.get("Permissions-Policy")).toContain("camera=()");
    expect(headerMap.get("Permissions-Policy")).toContain("microphone=()");
    expect(headerMap.get("Permissions-Policy")).toContain("geolocation=()");
    expect(headerMap.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headerMap.get("X-Frame-Options")).toBe("DENY");
  });
});
