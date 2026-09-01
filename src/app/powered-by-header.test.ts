import { describe, it, expect } from "vitest";
import nextConfig from "../../next.config";

describe("next.config security", () => {
  it("disables the X-Powered-By header", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });
});
