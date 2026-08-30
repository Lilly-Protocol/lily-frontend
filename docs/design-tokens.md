# Design Token System

This project uses CSS custom properties (variables) defined in `src/app/globals.css` to maintain a consistent visual language. All components should reference these tokens instead of hardcoding color values.

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-surface` | `#f7f7f5` | Page background, card surfaces |
| `--color-panel` | `#ffffff` | Elevated panels, modal backgrounds |
| `--color-panel-muted` | `#f1f3f5` | Secondary panel backgrounds, hover states |
| `--color-ink` | `#111827` | Primary text, icons, borders on light backgrounds |
| `--color-muted` | `#4b5563` | Secondary text, placeholders, disabled states |
| `--color-line` | `#d1d5db` | Borders, dividers, skeleton loaders |
| `--color-accent` | `#0f766e` | Interactive elements, links, focus rings, highlights |

## Typography Tokens

Typography is managed via Next.js font optimization with CSS variables:

| Token | Font Family | Usage |
|-------|-------------|-------|
| `--font-space-grotesk` | Space Grotesk | Headings, UI labels, buttons |
| `--font-ibm-plex-mono` | IBM Plex Mono | Code blocks, metadata, captions, technical content |

Apply fonts using Tailwind's arbitrary value syntax:
```tsx
<h1 className="font-[family-name:var(--font-space-grotesk)]">Title</h1>
<p className="font-[family-name:var(--font-ibm-plex-mono)]">Code</p>
```

## Shadow Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-soft` | `0 16px 40px rgba(17, 24, 39, 0.06)` | Card elevation, dropdowns, modals |

## Semantic Aliases

The `@theme inline` block maps design tokens to Tailwind-compatible semantic names:

- `--color-background` → `var(--color-surface)`
- `--color-foreground` → `var(--color-ink)`
- `--font-sans` → `var(--font-space-grotesk)`
- `--font-mono` → `var(--font-ibm-plex-mono)`

## Utility Classes

Pre-built utility classes are available for common patterns:

- `.surface` — Applies `--color-panel` background, `--color-line` border, and `--shadow-soft`
- `.eyebrow` — Uppercase monospace label style using `--font-ibm-plex-mono`

## Guidelines

1. **Never hardcode colors.** Always use `var(--color-*)` references.
2. **Respect contrast.** Ensure text on any surface meets WCAG AA standards.
3. **Use semantic aliases** when working within Tailwind utility classes.
4. **Extend, don't override.** Add new tokens to `:root` rather than redefining existing ones.
5. **Test in both light contexts.** The current token set assumes a light theme; dark mode support would require additional token definitions.
