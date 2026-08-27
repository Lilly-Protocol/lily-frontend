import { screen } from "@testing-library/react";

/**
 * Asserts a rendered page has exactly one h1 before checking its accessible name.
 */
export function expectSingleHeading(expectedName?: string | RegExp) {
  const headings = screen.getAllByRole("heading", { level: 1 });

  expect(headings).toHaveLength(1);

  if (expectedName !== undefined) {
    expect(headings[0]).toHaveAccessibleName(expectedName);
  }

  return headings[0];
}
