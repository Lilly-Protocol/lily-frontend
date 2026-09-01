import { afterEach, describe, expect, it, vi } from "vitest";

import { parsePublicEnv } from "./env";

describe("public environment configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns normalized typed URLs", () => {
    expect(
      parsePublicEnv({
        NEXT_PUBLIC_SITE_URL: "https://lily.example/",
        NEXT_PUBLIC_API_BASE_URL: "https://api.lily.example/",
      }),
    ).toEqual({
      siteUrl: "https://lily.example",
      apiBaseUrl: "https://api.lily.example",
    });
  });

  it("fails with setup guidance when a required value is missing", () => {
    expect(() =>
      parsePublicEnv({
        NEXT_PUBLIC_SITE_URL: undefined,
        NEXT_PUBLIC_API_BASE_URL: "https://api.lily.example",
      }),
    ).toThrow(
      "Missing required environment variable NEXT_PUBLIC_SITE_URL. Copy .env.example to .env.local and set it.",
    );
  });

  it("rejects relative and non-http URLs", () => {
    expect(() =>
      parsePublicEnv({
        NEXT_PUBLIC_SITE_URL: "/relative",
        NEXT_PUBLIC_API_BASE_URL: "https://api.lily.example",
      }),
    ).toThrow("NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL");

    expect(() =>
      parsePublicEnv({
        NEXT_PUBLIC_SITE_URL: "https://lily.example",
        NEXT_PUBLIC_API_BASE_URL: "file:///tmp/lily",
      }),
    ).toThrow("NEXT_PUBLIC_API_BASE_URL must use http or https");
  });
});
