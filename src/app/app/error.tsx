"use client";

type DashboardErrorProps = {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
};

export default function DashboardError({ reset }: DashboardErrorProps) {
  return (
    <main
      aria-labelledby="dashboard-error-title"
      className="surface rounded-[1.75rem] p-8 sm:p-10"
      role="alert"
    >
      <p className="eyebrow text-[var(--color-accent)]">Dashboard</p>
      <div className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-semibold" id="dashboard-error-title">
          Dashboard unavailable
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
          We could not load this dashboard view. Your data has not been changed,
          and you can retry the request now.
        </p>
        <button
          className="mt-6 rounded-lg border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
