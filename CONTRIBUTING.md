# Contributing to Lily Frontend

Thanks for helping build Lily Protocol.

## Local setup

- Use Node.js 22 or newer.
- Install dependencies with `npm install`.
- Run `npm run dev` for local work.
- Run `npm run check` before opening a pull request.

## Project shape

- Keep route files in `src/app` focused on composition and metadata.
- Put reusable route-shell primitives in `src/components/scaffold`.
- Put shared scaffold helpers in `src/features/scaffold`.
- Put shared typed configuration in `src/config`.
- Preserve TypeScript strictness and avoid `any` unless there is a clear reason.
- Treat the default UI as a placeholder shell. New product UI should come from tracked issues and approved Figma work.

## Development workflow

1. Create a branch for your work.
2. Link the work to an issue when possible. If a task does not exist yet, open one with the closest template.
3. Keep the change scoped to a single concern where practical.
4. Avoid speculative UI or product flows that are not requested by the issue.
5. Build from the approved Figma scope for that route or section, not from removed placeholder content.
6. Update docs when behavior, contributor workflow, or repo expectations change.
7. Validate the branch locally before asking for review.

## Adding a new route

Routes are registered centrally so that their metadata, scaffold page, route types,
and sitemap behavior stay in sync. The following minimal example shows how the
static dashboard route `/app/developers` is wired:

1. Add the path to `StaticSiteRoute` in `src/types/site.ts`. If the new path has a
   dynamic segment (for example, `/app/agents/[id]`), add it to
   `DynamicSiteRoute` instead. `SiteRoute` is defined as the union of those two
   types, so it includes the new path without another literal entry.
2. Add a `RouteScaffold` entry to `routeScaffolds` in `src/config/routes.ts`. Give
   it a unique `id`, assign the appropriate `section`, and document its purpose,
   Figma scope, and implementation areas. Decide whether the route belongs in the
   generated sitemap: set `includeInSitemap: true` for public, indexable static
   pages and `false` for authenticated, private, or dynamic pages. The
   `staticSitePages` filter uses this flag, so `src/app/sitemap.ts` does not need a
   separate route entry.

   ```ts
   {
     id: "developers",
     title: "Developer Console",
     path: "/app/developers",
     section: "dashboard",
     purpose: "Provide developer-specific tooling and references.",
     figmaScope: "Translate the approved developer workspace from Figma.",
     implementationAreas: ["Console navigation", "API and SDK tooling"],
     includeInSitemap: false,
   }
   ```

3. Create the matching App Router page at
   `src/app/app/developers/page.tsx` (route groups such as `(marketing)` may also
   be used where appropriate). Keep the route file as a small wrapper around the
   shared scaffold factory, passing the registry `id`:

   ```tsx
   import { createScaffoldPage } from "@/features/scaffold/page-factory";

   export default createScaffoldPage("developers");
   ```

4. Update `src/config/routes.test.ts`. Increment the `routeScaffolds`
   `toHaveLength(...)` assertion for every registry entry added, and add focused
   assertions when the route introduces new sitemap or section behavior.
5. Run the validation commands below. Type checking catches paths missing from
   the route unions, while the route tests catch registry count and sitemap
   regressions.

In summary, every new route changes `src/types/site.ts`,
`src/config/routes.ts`, its page under `src/app`, and
`src/config/routes.test.ts`. Sitemap membership is controlled by
`includeInSitemap` in the registry; only change `src/app/sitemap.ts` if the
sitemap generation logic itself needs to change.

## Validation checklist

Run these commands before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run check
```

`npm run check` is the fastest way to mirror CI end-to-end.

## Pull requests

- Explain the problem being solved, not only the code that changed.
- Link the related issue and list the main changes clearly.
- Include screenshots or recordings for UI changes.
- Call out risks, tradeoffs, and follow-up work intentionally left out.
- Make sure the PR template is filled out completely so reviewers have enough context.

## Engineering expectations

- Prefer server components unless client interactivity is required.
- Keep business logic and presentation modular so future contributors can extend issue-sized features without rewriting route files.
- Add or update tests when you change reusable behavior, rendering logic, or project configuration.
- Use typed imports, consistent naming, and small focused components over large catch-all files.
- If a route is still scaffolded, preserve the scaffold clarity while implementing only the issue scope you were assigned.

## Issues and contributor tasks

- Use the bug report template for regressions and broken behavior.
- Use the feature request template for roadmap or product ideas.
- Use the contributor task template to define scoped implementation work that external contributors can pick up quickly.

## Reviews

- Reviewers will prioritize correctness, maintainability, and contributor clarity.
- Small PRs move faster than wide refactors, so prefer incremental improvements when possible.
- If a decision has non-obvious tradeoffs, document it in the PR instead of relying on review comments to provide context.

## Reporting issues

Use the GitHub issue templates for bugs, features, and contributor-scoped tasks. Reproduction steps, expected behavior, acceptance criteria, and screenshots help us move faster.
