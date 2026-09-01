import type { Viewport } from "next";

/** Matches `--color-surface` in `src/app/globals.css`. */
export const SURFACE_THEME_COLOR = "#f7f7f5";

export const rootViewport = {
  themeColor: SURFACE_THEME_COLOR,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
} satisfies Viewport;
