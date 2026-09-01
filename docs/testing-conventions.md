# Testing Conventions

This project uses [Vitest](https://vitest.dev/) for unit and component testing. All tests should be colocated with the source files they exercise.

## File Naming

- Unit tests: `*.test.ts` or `*.test.tsx`
- Test utilities: `*.test-utils.ts`

Example:

```text
src/components/ui/accordion.tsx
src/components/ui/accordion.test.tsx
```

## Test Structure

Use the `describe` / `it` pattern with clear, descriptive names:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AccordionItem } from "./accordion";

describe("AccordionItem", () => {
  it("renders the title in a button element", () => {
    render(<AccordionItem title="FAQ">Content</AccordionItem>);
    expect(screen.getByRole("button", { name: /faq/i })).toBeInTheDocument();
  });

  it("hides content when collapsed", () => {
    render(<AccordionItem title="FAQ">Content</AccordionItem>);
    expect(screen.queryByText("Content")).not.toBeVisible();
  });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode during development
npm run test:watch

# Type-check without emitting
npm run typecheck
```

## Guidelines

1. **Test behavior, not implementation.** Assert on what the user sees or interacts with, not internal state.
2. **Keep tests focused.** One assertion concept per `it` block.
3. **Use Testing Library queries** (`getByRole`, `getByLabelText`) over test IDs whenever possible.
4. **Mock external dependencies** (APIs, routers) at the module boundary using `vi.mock()`.
5. **Respect accessibility.** Include keyboard interaction and ARIA attribute assertions for interactive components.
6. **Avoid snapshot tests** unless the output is large and stable; prefer explicit assertions.
