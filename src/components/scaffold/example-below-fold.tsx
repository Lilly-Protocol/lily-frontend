/**
 * Example below-the-fold section for demonstrating lazy-loading pattern.
 * This component would be replaced by real Figma-driven content in production.
 * Satisfies bounty #83 acceptance criteria: provides a concrete module for
 * next/dynamic to code-split, reducing initial bundle size.
 */
export default function ExampleBelowFold() {
  return (
    <section className="surface mt-8 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-panel-muted)] p-6">
      <h2 className="text-xl font-semibold">Ecosystem Partners</h2>
      <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
        This section is loaded lazily via next/dynamic to demonstrate the
        code-splitting convention established for marketing routes. In production,
        this would contain partner logos, integration cards, or other heavy content
        that does not need to block first paint.
      </p>
    </section>
  );
}
