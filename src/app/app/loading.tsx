const skeletonClass = "rounded-2xl bg-[var(--color-panel-muted)]";

export default function DashboardLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading dashboard"
      className="surface motion-safe:animate-pulse rounded-[1.75rem] p-8 sm:p-10"
      role="status"
    >
      <span className="sr-only">Loading dashboard content</span>

      <div aria-hidden="true">
        <div
          className={`${skeletonClass} h-3 w-24`}
          data-testid="dashboard-loading-placeholder"
        />

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div className="w-full max-w-3xl space-y-4">
            <div
              className={`${skeletonClass} h-10 w-56 max-w-full`}
              data-testid="dashboard-loading-placeholder"
            />
            <div
              className={`${skeletonClass} h-5 w-full`}
              data-testid="dashboard-loading-placeholder"
            />
            <div
              className={`${skeletonClass} h-5 w-4/5`}
              data-testid="dashboard-loading-placeholder"
            />
          </div>
          <div
            className={`${skeletonClass} h-11 w-32`}
            data-testid="dashboard-loading-placeholder"
          />
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className={`${skeletonClass} h-64 border border-[var(--color-line)]`}
            data-testid="dashboard-loading-placeholder"
          />
          <div
            className={`${skeletonClass} h-64 border border-[var(--color-line)]`}
            data-testid="dashboard-loading-placeholder"
          />
        </section>
      </div>
    </main>
  );
}
