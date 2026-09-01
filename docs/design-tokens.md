# Design Token System

Lily Frontend uses CSS custom properties (design tokens) defined in `src/app/globals.css` to ensure visual consistency across all components and pages. All UI should reference these tokens rather than raw color values or hardcoded spacing.

## Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-surface` | `#f7f7f5` | Page background, outermost container |
| `--color-panel` | `#ffffff` | Card backgrounds, elevated surfaces |
| `--color-panel-muted` | `#f1f3f5` | Secondary panels, hover states, inactive areas |
| `--color-ink` | `#111827` | Primary text, headings, high-emphasis content |
| `--color-muted` | `#4b5563` | Secondary text, captions, metadata |
| `--color-line` | `#d1d5db` | Borders, dividers, input outlines |
| `--color-accent` | `#0f766e` | Interactive elements, links, active states, focus rings |

## Shadow Tokens

| Token | Value | Usage |
|---|---|---|
| `--shadow-soft` | `0 16px 40px rgba(17, 24, 39, 0.06)` | Elevated cards, modals, dropdowns |

## Typography Tokens

Typography is configured via `next/font/google` in `src/app/layout.tsx` and exposed as CSS variables:

| Token | Font Family | Usage |
|---|---|---|
| `--font-space-grotesk` | Space Grotesk | Headings, body text, primary sans-serif |
| `--font-ibm-plex-mono` | IBM Plex Mono | Code blocks, labels, monospaced content |

## Motion Tokens

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `150ms` | Micro-interactions, button feedback |
| `--duration-base` | `250ms` | Standard transitions, hover effects |
| `--duration-slow` | `400ms` | Page transitions, complex animations |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default easing for all transitions |

All motion tokens respect `prefers-reduced-motion` via Tailwind's `motion-reduce:` variant.

## Figma Mapping

When implementing designs from the [Lily Protocol Figma file](https://www.figma.com/design/GRBeDGDHzCGXefm3xmlbHF/Lily-Protocol), use this mapping:

| Figma Style | CSS Token |
|---|---|
| Surface / Background | `--color-surface` |
| Card / White | `--color-panel` |
| Text / Primary | `--color-ink` |
| Text / Secondary | `--color-muted` |
| Border / Divider | `--color-line` |
| Accent / Teal | `--color-accent` |
| Shadow / Soft | `--shadow-soft` |

## Adding New Tokens

1. Define the new CSS custom property in `:root` within `src/app/globals.css`.
2. Document it in this file with its value and intended usage.
3. If it maps to a Figma style, add an entry to the Figma Mapping table.
4. Reference the token in component code using `var(--token-name)` or Tailwind arbitrary values like `[var(--token-name)]`.
5. Update this document in the same PR that introduces the token.
