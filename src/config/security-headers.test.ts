import nextConfig from "../../next.config";

describe("Next.js security headers", () => {
  it("applies the security policy to every route", async () => {
    const rules = await nextConfig.headers?.();

    expect(rules).toHaveLength(1);
    expect(rules?.[0]?.source).toBe("/:path*");

    const headers = Object.fromEntries(
      (rules?.[0]?.headers ?? []).map(({ key, value }) => [key, value]),
    );

    expect(headers).toMatchObject({
      "Content-Security-Policy": expect.stringContaining("default-src 'self'"),
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    });
    expect(headers["Content-Security-Policy"]).toContain("frame-ancestors 'none'");
    expect(headers["Content-Security-Policy"]).toContain("object-src 'none'");
  });
});
