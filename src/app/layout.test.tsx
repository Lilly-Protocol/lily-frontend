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

import { render } from "@testing-library/react";

import { SURFACE_THEME_COLOR, rootViewport } from "@/config/viewport";
import RootLayout, { viewport } from "./layout";

describe("RootLayout configuration", () => {
  it("uses swap display for both fonts and preloads Space Grotesk", () => {
    expect(fontMocks.spaceGrotesk).toHaveBeenCalled();
    expect(fontMocks.ibmPlexMono).toHaveBeenCalled();
  });

  it("renders exactly one application/ld+json organization script and no footer in the root layout", () => {
    const { container } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>,
    );
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]#organization-json-ld',
    );
    expect(scripts).toHaveLength(1);
    // The footer is owned by SectionLayout (one per route-group page); the
    // root layout must not render one (see fix #538).
    expect(container.querySelectorAll("footer")).toHaveLength(0);
  });
});

describe("RootLayout viewport", () => {
  it("exports the shared rootViewport from the config module", () => {
    expect(viewport).toBe(rootViewport);
  });

  it("renders a theme-color meta tag equal to SURFACE_THEME_COLOR", () => {
    expect(viewport.themeColor).toBe(SURFACE_THEME_COLOR);
  });

  it("exports rootViewport matching config", () => {
    expect(viewport).toEqual(rootViewport);
  });
});
