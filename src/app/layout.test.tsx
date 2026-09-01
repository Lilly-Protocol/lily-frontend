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

import "./layout";

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
