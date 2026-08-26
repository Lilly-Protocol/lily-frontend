# Testing Conventions

This project uses Vitest, Testing Library, and `@testing-library/jest-dom` for unit and component coverage. Keep tests close to the code they protect so future contributors can read the behavior and implementation together.

## File Placement

- Put tests next to the source file they cover.
- Use `*.test.ts` for non-React TypeScript modules.
- Use `*.test.tsx` for React components and route-facing helpers.
- Reuse typed scaffold fixtures from `src/config/routes.ts` instead of rebuilding route objects in each test.

Current examples:

```text
src/config/routes.test.ts
src/config/site.test.ts
src/components/scaffold/page-scaffold.test.tsx
src/components/scaffold/section-layout.test.tsx
src/features/scaffold/page-factory.test.tsx
```

## Component Tests

Render components with Testing Library and assert the user-visible contract: roles, labels, links, headings, and visible text. `src/test/setup.ts` loads `@testing-library/jest-dom/vitest`, so matchers such as `toBeInTheDocument` and `toHaveAttribute` are available in every test.

Prefer route fixtures such as `getRouteScaffold` and `getSectionRoutes` when testing scaffold components. Those helpers keep tests aligned with the same route registry used by the app.

```tsx
import { render, screen } from "@testing-library/react";

import { getSectionRoutes } from "@/config/routes";

import { SectionLayout } from "./section-layout";

describe("SectionLayout", () => {
  it("renders global nav and section route links", () => {
    render(
      <SectionLayout
        title="Public marketing"
        description="Public-facing route group."
        routes={getSectionRoutes("marketing")}
      >
        <div>Section content</div>
      </SectionLayout>,
    );

    expect(
      screen.getByRole("link", { name: /lily protocol/i }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("link", { name: /landing page/i }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });
});
```

## Config Tests

For typed configuration, assert exported helpers and derived collections rather than internal implementation details. Examples include:

- `getRouteScaffold` for named route lookup behavior
- `getSectionRoutes` for section grouping behavior
- `staticSitePages` for sitemap eligibility
- `getAbsoluteUrl` for canonical URL generation
- `createSiteMetadata` for metadata shape and defaults

## Coverage

Run coverage locally with:

```bash
npm run test:run
```

`vitest.config.ts` uses the V8 coverage provider and prints both text and HTML reports. Coverage includes `src/**/*.{ts,tsx}` and excludes:

- `src/app/**/*`, because route modules mostly compose scaffolded pages and are validated by route-level smoke coverage when needed
- `src/test/**/*`, because test setup files should not count toward application coverage

Minimum thresholds are:

```text
statements: 70
branches: 60
functions: 70
lines: 70
```

Run the full contribution check before opening a PR:

```bash
npm run check
```
