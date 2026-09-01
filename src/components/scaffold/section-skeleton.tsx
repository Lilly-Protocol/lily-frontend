/**
 * Skeleton placeholder for below-the-fold marketing sections.
 * Used as Suspense fallback when lazy-loading content with next/dynamic.
 */
export function SectionSkeleton() {
  return (
    <div className="animate-pulse rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-panel-muted)] p-6">
      <div className="h-6 w-1/3 rounded bg-[var(--color-line)]" />
      <div className="mt-4 space-y-3">
        <div className="h-4 w-full rounded bg-[var(--color-line)]" />
        <div className="h-4 w-5/6 rounded bg-[var(--color-line)]" />
        <div className="h-4 w-4/6 rounded bg-[var(--color-line)]" />
      </div>
    </div>
  );
}
