# Testing conventions

Lily Frontend uses Vitest, Testing Library, jsdom, and the matchers from
`@testing-library/jest-dom`. Keep tests focused on behavior that contributors
and users can observe.

## File placement and naming

- Put a test next to the source file it covers and name it `*.test.ts` or
  `*.test.tsx`.
- Use `.test.ts` for data and configuration modules and `.test.tsx` for React
  components.
- Reuse the `@/` alias for cross-directory imports. Use relative imports for the
  source file under test.
- Shared test setup belongs in `src/test/setup.ts`; do not repeat global matcher
  imports in each test.

## Route fixtures

Use the typed route registry instead of recreating route objects in tests:

- `getRouteScaffold(id)` supplies one complete route fixture.
- `getSectionRoutes(section)` supplies the routes owned by a layout section.

These helpers keep tests aligned with the same route data used by the app.

## Worked component example

This example follows the existing scaffold tests by rendering a component with
a registry fixture and asserting its accessible output:

```tsx
import { render, screen } from "@testing-library/react";

import { getRouteScaffold } from "@/config/routes";

import { PageScaffold } from "./page-scaffold";

describe("PageScaffold", () => {
  it("renders the selected route heading and path", () => {
    render(<PageScaffold route={getRouteScaffold("landing")} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /landing page/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("/")).toBeInTheDocument();
  });
});
```

Prefer semantic queries such as `getByRole` and `getByText` over implementation
details. The jest-dom matchers are loaded once by `src/test/setup.ts`, so tests
can use assertions such as `toBeInTheDocument` and `toHaveAttribute` directly.
For user interactions, use `@testing-library/user-event` and assert the visible
result or callback rather than internal component state.

## Running tests

Use watch mode while developing:

```bash
npm test
```

Run the same coverage command used by CI before opening a pull request:

```bash
npm run test:run
```

Run `npm run check` for the full lint, typecheck, test, and production build
sequence.

## Coverage

`vitest.config.ts` collects V8 coverage for `src/**/*.{ts,tsx}` and reports both
text and HTML output. It excludes App Router composition files under `src/app`
and shared test setup under `src/test`.

The repository-wide minimums are:

| Metric | Minimum |
| --- | ---: |
| Statements | 70% |
| Branches | 60% |
| Functions | 70% |
| Lines | 70% |

Coverage is a baseline, not a substitute for useful assertions. Add regression
coverage for changed reusable behavior, configuration, and rendering paths.
