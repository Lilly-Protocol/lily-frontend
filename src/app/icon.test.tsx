import { describe, expect, it } from "vitest";

describe("App Icon Route", () => {
  it("exports the required icon metadata", async () => {
    const icon = await import("./icon");
    expect(icon.size).toEqual({ width: 32, height: 32 });
    expect(icon.contentType).toBe("image/png");
    expect(typeof icon.default).toBe("function");
  });

  it("exports the required apple-icon metadata", async () => {
    const appleIcon = await import("./apple-icon");
    expect(appleIcon.size).toEqual({ width: 180, height: 180 });
    expect(appleIcon.contentType).toBe("image/png");
    expect(typeof appleIcon.default).toBe("function");
  });
});
