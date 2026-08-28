import { describe, expect, it } from "vitest";

import AppleIcon, {
  contentType as appleContentType,
  size as appleSize,
} from "./apple-icon";
import Icon, { contentType as iconContentType, size as iconSize } from "./icon";

describe("Dynamic App Icon Routes", () => {
  it("exports valid size and content-type metadata for favicon", () => {
    expect(iconSize).toEqual({ width: 32, height: 32 });
    expect(iconContentType).toBe("image/png");
  });

  it("exports valid size and content-type metadata for apple-touch-icon", () => {
    expect(appleSize).toEqual({ width: 180, height: 180 });
    expect(appleContentType).toBe("image/png");
  });

  it("returns valid ImageResponse instances when called", () => {
    const iconResponse = Icon();
    expect(iconResponse).toBeDefined();

    const appleIconResponse = AppleIcon();
    expect(appleIconResponse).toBeDefined();
  });
});
