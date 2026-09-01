import * as matchers from "vitest-axe/matchers";
import { axe } from "vitest-axe";
import { expect } from "vitest";

expect.extend(matchers);

export { axe };

/**
 * Helper to run axe accessibility audit on a rendered HTML container or element.
 */
export async function checkA11y(container: Element | HTMLElement) {
  const results = await axe(container);
  expect(results.violations).toHaveLength(0);
}
