import nextConfig, { legacyRedirects } from "./next.config";

describe("Next.js redirects", () => {
  it("permanently redirects known legacy routes", async () => {
    await expect(nextConfig.redirects?.()).resolves.toEqual([
      {
        source: "/dash",
        destination: "/app",
        permanent: true,
      },
      {
        source: "/sign-up",
        destination: "/signup",
        permanent: true,
      },
    ]);
    expect(legacyRedirects.every((redirect) => redirect.permanent)).toBe(true);
  });
});
