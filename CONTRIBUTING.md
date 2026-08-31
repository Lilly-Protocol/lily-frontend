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

CI also runs `npm audit --omit=dev --audit-level=high` after installing from `package-lock.json`. The audit job fails only on high-severity advisories in production dependencies; dev-only advisories are excluded via `--omit=dev`.

### Dependency audit triage

When the dependency audit job fails locally or in CI:

1. Reproduce with `npm ci` then `npm audit --omit=dev --audit-level=high` so results match CI (do not use `npm install`, which can drift from the lockfile).
2. Identify whether each advisory affects a direct dependency or a transitive one (`npm audit` lists the dependency chain).
3. Prefer upgrading to a patched release within the project's supported range. Use Dependabot PRs when they exist, or bump `package.json` and regenerate the lockfile with `npm install <package>@<version>`.
4. If no fix is available yet, assess exploitability in this app (server vs client, dev-only tooling vs production runtime). Document the risk and link the advisory in the PR; do not merge with a failing audit unless maintainers explicitly accept the exception.
5. Do not use `npm audit fix --force` without review—it can jump to major versions outside the stated dependency range.

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
