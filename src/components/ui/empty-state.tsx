import type { ReactNode } from "react";

type EmptyStateProps = {
  readonly icon: ReactNode;
  readonly title: string;
  readonly description: ReactNode;
  readonly eyebrow?: string;
  readonly action?: ReactNode;
};

export function EmptyState({
  icon,
  title,
  description,
  eyebrow,
  action,
}: EmptyStateProps) {
  return (
    <section className="surface rounded-[1.5rem] px-6 py-10 text-center sm:px-10">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel-muted)] text-[var(--color-accent)]">
        {icon}
      </div>
      {eyebrow ? (
        <p className="eyebrow mt-5 text-[var(--color-accent)]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-xl font-semibold text-[var(--color-ink)]">
        {title}
      </h2>
      <div className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--color-muted)]">
        {description}
      </div>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </section>
  );
}
