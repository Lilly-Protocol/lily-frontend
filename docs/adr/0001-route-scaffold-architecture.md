# ADR 0001: Route-Scaffold Architecture and Centralized Route Registry

- **Status**: Accepted
- **Date**: 2026-08-27
- **Deciders**: Lily Protocol Frontend Contributors
- **Consulted**: Design & Engineering Teams

---

## 1. Context and Problem Statement

The Lily Protocol frontend foundation needs to support multiple independent open-source contributors implementing product and marketing screens simultaneously. 

Without a structured foundation, projects often suffer from:
1. **Speculative / Throwaway UI**: Developers shipping unapproved starter implementations that must later be completely rewritten to match Figma specifications.
2. **Scattered Route Definitions**: Navigation headers, footers, sitemaps, and tests each defining their own partial maps of routes and URLs.
3. **Bloated Route Files**: Page entry points in Next.js `src/app/` containing complex layout boilerplate and inline demo data, causing merge conflicts between PRs.

How should we structure the App Router routes so that contributors have clear boundaries to pick up issue-sized UI slices from Figma without introducing technical debt?

---

## 2. Decision Drivers

- **Issue-Driven Contributions**: Contributors should be able to implement screens incrementally from approved Figma mockups without stepping on other screens.
- **Single Source of Truth**: Route paths, metadata, sections, sitemap inclusion, and Figma scope must be registered in one centralized place.
- **Zero Route Boilerplate**: Page files in `src/app` should remain as thin, declarative wrappers.
- **Type Safety**: Routes, section names, and page IDs must be strictly typed throughout navigation and metadata generators.

---

## 3. Considered Options

* **Option 1: Pre-built Demo Pages**: Ship starter mockups across all routes in `src/app` and have contributors edit them.
* **Option 2: Completely Empty Route Files**: Provide empty components or simple `<div>` placeholders.
* **Option 3 (Chosen): Centralized Route Registry + Page Factory Pattern (`Route-Scaffold Architecture`)**.

---

## 4. Decision Outcome

We decided on **Option 3: Centralized Route Registry + Page Factory Pattern**.

### Architecture Overview

1. **Central Route Registry (`src/config/routes.ts`)**:
   - Acts as the single source of truth for all routes in the application.
   - Each route is registered in `routeScaffolds` with its unique `id`, `path`, `title`, `section`, `purpose`, `figmaScope`, and designated `implementationAreas`.
   - Exports typed lookup helpers such as `getRouteScaffold(id)`, `getSectionRoutes(sectionKey)`, and `staticSitePages`.

2. **Generic Page Factory (`src/features/scaffold/page-factory.tsx`)**:
   - Exposes `createScaffoldPage(routeId)` which resolves the route specification from `routes.ts` and renders a standard `<PageScaffold />` component (`src/components/scaffold/page-scaffold.tsx`).
   - Every scaffolded route file in `src/app` remains a clean one-line export:
     ```tsx
     import { createScaffoldPage } from "@/features/scaffold/page-factory";

     export default createScaffoldPage("landing");
     ```

3. **Incremental Figma Implementation**:
   - When a contributor implements a real screen from Figma, they replace the `createScaffoldPage` call with their dedicated feature component while preserving the route registration in `routes.ts`.

---

## 5. Consequences

### Positive
- **Merge Conflict Reduction**: Scaffolded pages share a common shell, so adding new routes or modifying sections rarely creates merge conflicts.
- **Clear Contributor Guidance**: Visiting any scaffolded route in development displays the exact Figma scope and natural issue slices for that route.
- **Automated Sitemaps & Metadata**: `src/config/site.ts` and `src/app/sitemap.ts` automatically consume `src/config/routes.ts`.
- **Automated Testing & Accessibility**: Scaffolds and layouts are covered by automated unit and axe accessibility tests.

### Negative / Trade-offs
- Contributors must learn the convention of updating or replacing `createScaffoldPage` rather than putting ad-hoc markup directly into App Router leaf files.

---

## 6. Referenced Files and Modules

- [`src/config/routes.ts`](../../src/config/routes.ts) — Canonical route registry and helper functions
- [`src/features/scaffold/page-factory.tsx`](../../src/features/scaffold/page-factory.tsx) — Scaffold page creation utility
- [`src/components/scaffold/page-scaffold.tsx`](../../src/components/scaffold/page-scaffold.tsx) — Visual scaffold presentation primitive
- [`src/types/site.ts`](../../src/types/site.ts) — TypeScript interfaces for routes and sections
