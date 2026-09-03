import { vi } from "vitest";

const fontMocks = vi.hoisted(() => ({
  ibmPlexMono: vi.fn((config: unknown) => ({
    variable: "--font-ibm-plex-mono",
    config,
  })),
  spaceGrotesk: vi.fn((config: unknown) => ({
    variable: "--font-space-grotesk",
    config,
  })),
}));

vi.mock("next/font/google", () => ({
  IBM_Plex_Mono: fontMocks.ibmPlexMono,
  Space_Grotesk: fontMocks.spaceGrotesk,
}));

import { SURFACE_THEME_COLOR, rootViewport } from "@/config/viewport";

import { viewport } from "./layout";

describe("RootLayout font configuration", () => {
  it("uses swap display for both fonts and preloads Space Grotesk", () => {
    expect(fontMocks.spaceGrotesk).toHaveBeenCalledWith(
      expect.objectContaining({ display: "swap", preload: true }),
    );
    expect(fontMocks.ibmPlexMono).toHaveBeenCalledWith(
      expect.objectContaining({ display: "swap" }),
    );
  });
});

describe("RootLayout viewport", () => {
  it("exports the shared rootViewport from the config module", () => {
    expect(viewport).toBe(rootViewport);
  });

  it("renders a theme-color meta tag equal to SURFACE_THEME_COLOR", () => {
    expect(viewport.themeColor).toBe(SURFACE_THEME_COLOR);
  });
});
