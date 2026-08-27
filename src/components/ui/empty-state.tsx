import type { Route } from "next";
import Link from "next/link";

type EmptyStateAction = {
  readonly label: string;
  readonly href: Route;
};

type EmptyStateProps = {
  readonly title: string;
  readonly description: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly eyebrow?: string;
  readonly action?: EmptyStateAction;
};

export function EmptyState({
  title,
  description,
  icon,
  eyebrow = "No data yet",
  action,
}: EmptyStateProps) {
  return (
    <section className="surface rounded-[1.5rem] p-6 text-center">
      {icon ? (
        <div
          aria-hidden="true"
          className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[var(--color-panel-muted)] text-[var(--color-accent)]"
        >
          {icon}
        </div>
      ) : null}
      <p className="eyebrow mt-5 text-[var(--color-accent)]">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
        {description}
      </div>
      {action ? (
        <Link
          className="mt-6 inline-flex rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
          href={action.href}
        >
          {action.label}
        </Link>
      ) : null}
    </section>
  );
}
