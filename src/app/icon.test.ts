import { describe, it, expect } from "vitest";
import Icon from "./icon";
import AppleIcon from "./apple-icon";

describe("app icons", () => {
  it("icon route returns an image response", async () => {
    const res = await Icon();
    expect(res).toBeInstanceOf(Response);
    expect(res.headers.get("content-type")).toMatch(/^image\//);
  });

  it("apple-icon route returns an image response", async () => {
    const res = await AppleIcon();
    expect(res).toBeInstanceOf(Response);
    expect(res.headers.get("content-type")).toMatch(/^image\//);
  });
});
