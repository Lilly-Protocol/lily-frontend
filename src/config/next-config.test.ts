import nextConfig from "../../next.config";

describe("next.config production headers", () => {
  it("disables the X-Powered-By fingerprint header", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });
});
