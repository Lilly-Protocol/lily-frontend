# ADR-0001: Route Scaffold Architecture

- **Status:** Accepted
- **Date:** 2026-08-30
- **Deciders:** Lily Protocol Core Team
- **Related Issue:** #47

## Context

Lily Frontend is a contributor-first foundation where product UI is introduced through scoped issues rather than prebuilt screens. The repository needs an architecture that:

1. Keeps route files in `src/app` thin and declarative.
2. Centralizes route metadata (path, section, purpose, Figma scope) in a single source of truth.
3. Allows contributors to implement one issue-sized slice at a time from approved Figma designs without restructuring routing.
4. Avoids duplication of layout, metadata, and scaffold logic across dozens of pages.

Without a documented decision, contributors risk adding ad-hoc logic directly into route files, fragmenting the scaffold contract and making future refactors expensive.

## Decision

We adopt a **centralized route scaffold architecture**:

- All route metadata lives in `src/config/routes.ts` (`routeScaffolds` array and `sectionDefinitions`).
- Route files in `src/app` remain thin wrappers that call `createScaffoldPage(routeId)` from `src/features/scaffold/page-factory.tsx`.
- Shared layout primitives live in `src/components/scaffold/page-scaffold.tsx` and consume the `RouteScaffold` type.
- Implementation work is scoped via Figma references stored in each scaffold entry (`figmaScope`, `implementationAreas`).
- New routes are added by extending `routes.ts` and creating a minimal page file that delegates to the factory.

This makes the route registry the authoritative map of the site, keeps pages declarative, and ensures every screen inherits consistent structure, metadata, and contribution workflow.

## Alternatives Considered

### 1. Co-locate metadata in each route file
Each `page.tsx` would export its own config object alongside the component.

- **Pros:** No separate registry; changes stay local.
- **Cons:** No single source of truth for navigation, sitemaps, or section grouping; duplicated layout logic; harder to enforce consistency across 30+ routes.
- **Rejected because:** It undermines the contributor-friendly scaffold contract and creates drift between route definitions and shared layouts.

### 2. File-system-only routing with no explicit registry
Rely entirely on Next.js App Router conventions and infer sections from folder names.

- **Pros:** Zero configuration; idiomatic Next.js.
- **Cons:** Cannot express purpose, Figma scope, or implementation areas without inventing custom file conventions; section metadata becomes implicit and fragile; sitemap and navigation generation require scanning and guessing.
- **Rejected because:** Lily needs explicit, typed route metadata to coordinate Figma-driven contributions and maintain operational surfaces (docs, status, legal) alongside product screens.

### 3. MDX/JSON-driven route definitions
Store route configs in MDX frontmatter or JSON files and generate pages at build time.

- **Pros:** Non-developers could edit route metadata; separation of content and code.
- **Cons:** Adds a codegen step; loses TypeScript safety for route IDs and section keys; complicates the contributor workflow for a repo that already targets developer contributors; over-engineered for the current scope.
- **Rejected because:** The current contributor base is developer-focused, and TypeScript-native config provides better safety and IDE support without extra tooling.

## Consequences

### Positive
- Single source of truth for all routes, sections, and Figma scopes.
- Thin route files reduce merge conflicts and make PRs easier to review.
- Contributors can pick up issue-sized slices without understanding full routing internals.
- Navigation, sitemap, and section grouping derive from typed data, reducing bugs.
- Architecture is enforceable via linting and type checks.

### Negative
- Adding a new route requires touching both `routes.ts` and creating a page file (two-file change).
- Contributors must learn the scaffold contract before implementing screens.
- Refactoring the scaffold shape requires coordinated updates across config, factory, and components.

### Risks & Mitigations
- **Risk:** Contributors bypass the factory and add custom logic directly in route files.
  - **Mitigation:** Document this ADR in README; add lint rule or PR template checklist item requiring `createScaffoldPage` usage.
- **Risk:** `routes.ts` grows unwieldy as routes multiply.
  - **Mitigation:** Group scaffolds by section; consider splitting into per-section modules if it exceeds ~200 lines.
- **Risk:** Figma links become stale.
  - **Mitigation:** Treat `figmaScope` as living documentation; update during implementation PRs; link to specific Figma nodes rather than entire files.

## Compliance

All existing routes in `src/app` already follow this pattern via `createScaffoldPage`. Future contributions must:

1. Add or update an entry in `src/config/routes.ts`.
2. Create a thin page file using `createScaffoldPage(routeId)`.
3. Reference this ADR in PR descriptions when modifying route structure.

## References

- [`src/config/routes.ts`](../../src/config/routes.ts) — Route registry and section definitions
- [`src/features/scaffold/page-factory.tsx`](../../src/features/scaffold/page-factory.tsx) — Factory function for scaffold pages
- [`src/components/scaffold/page-scaffold.tsx`](../../src/components/scaffold/page-scaffold.tsx) — Shared layout primitive
- [Figma — Lily Protocol](https://www.figma.com/design/GRBeDGDHzCGXefm3xmlbHF/Lily-Protocol?node-id=0-1&t=SiCYBGotCg7HcXhe-1) — Design source for implementation scopes
