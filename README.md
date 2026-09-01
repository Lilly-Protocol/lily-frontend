# Lily Frontend

<img width="1197" height="407" alt="image" src="https://github.com/user-attachments/assets/1cbfb0fe-3668-4e82-8fda-68b1cc4efc25" />

Contributor-ready frontend foundation for Lily Protocol. This repository is intentionally light on shipped product UI so contributors can build features through scoped issues and pull requests.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Tested-6E9F18?logo=vitest&logoColor=white)
[![CI](https://github.com/lily-protocol/lily-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/lily-protocol/lily-frontend/actions/workflows/ci.yml)
![Docker](https://img.shields.io/badge/Docker-Planned-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-Private-5B5B5B)

**Website:** [agent-lily.online](https://www.agent-lily.online)  
**Design:** [Figma — Lily Protocol](https://www.figma.com/design/GRBeDGDHzCGXefm3xmlbHF/Lily-Protocol?node-id=0-1&t=SiCYBGotCg7HcXhe-1)

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9
- Vitest + Testing Library
- GitHub Actions CI

## Current scope

- Stabilized Next.js foundation
- Strict TypeScript, linting, tests, and CI
- Contributor workflow and GitHub templates
- Shared layout scaffolds for marketing, auth, support, and dashboard surfaces
- Route-level scaffold pages for planned product and public screens

The main dashboard, landing experience, and protocol-facing UI should be introduced through issues rather than prebuilt in the base branch. This repository should feel ready to implement from [Figma](https://www.figma.com/design/GRBeDGDHzCGXefm3xmlbHF/Lily-Protocol?node-id=0-1&t=SiCYBGotCg7HcXhe-1), not already finished.

## Local development

Install dependencies and start the dev server:

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`.
2. Run `npm install`.
3. Run `npm run dev`.

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@lily-protocol.dev.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Use Node.js `22+`. The repo declares this in `package.json` so local and CI environments stay aligned.

Docker is not configured in this repository yet. The badge above marks it as planned rather than available today.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run check
```

`npm run check` mirrors CI and is the fastest way to validate a contribution before opening a PR.

## Project structure

```text
src/
  app/                  App Router routes, route groups, and layouts
  components/scaffold/  Shared route-shell and layout primitives
  config/               Site metadata and route registry
  features/scaffold/    Generic scaffold page helpers
  test/                 Shared test setup
  types/                Shared TypeScript types
.github/
  workflows/            CI automation
  ISSUE_TEMPLATE/       GitHub issue templates
```

## Route scaffold map

- `Public marketing`: `/`, `/about`, `/blog`, `/changelog`, `/ecosystem`, `/security`, `/grants`, `/careers`, `/contact`
- `Auth`: `/signin`, `/signup`
- `Legal`: `/terms`, `/privacy`, `/cookies`
- `Docs and status`: `/docs`, `/status`
- `Dashboard`: `/app`, `/app/agents`, `/app/agents/[id]`, `/app/payments`, `/app/wallets`, `/app/activity`, `/app/developers`, `/app/settings`

Each route is scaffolded with:

- the route name
- intended screen purpose
- a note that implementation should follow approved Figma work
- natural issue slices contributors can pick up

## Contributor workflow

1. Pick up a scoped issue or create one using the contributor task template.
2. Treat the current UI as a scaffold, not as final product direction.
3. Keep route files in `src/app` thin and move reusable logic into `src/components/scaffold`, `src/features/scaffold`, or `src/config`.
4. Prefer building one issue-sized slice at a time from the approved Figma.
5. Run `npm run check` before opening a pull request.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for workflow expectations, issue triage, and PR guidance. Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating.


## Contributor-ready focus

- Page-by-page implementation from Figma
- Reusable shells and layout boundaries instead of completed screens
- Clear route ownership for future issues
- Stable base branch with no speculative product polish

## CI

GitHub Actions runs linting, type-checking, tests with coverage, and production builds on pushes and pull requests. Each check runs as its own job with `fail-fast` disabled, so you can immediately see exactly what failed without losing the rest of the signal. The workflow also persists `.next/cache` to speed up repeat builds in line with the current Next.js CI caching guidance.

## Notes

This repo uses the `src/` directory convention supported by Next.js 16. Keep App Router routes under `src/app`, route metadata in `src/config`, and reusable scaffold boundaries under `src/components/scaffold` and `src/features/scaffold`.
