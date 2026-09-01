import type { ReactNode } from "react";

type TimelineItemProps = {
  readonly date: string;
  readonly title: string;
  readonly children: ReactNode;
  readonly status?: string;
};

export function TimelineItem({
  date,
  title,
  children,
  status,
}: TimelineItemProps) {
  return (
    <li className="relative flex gap-4 pb-8 last:pb-0">
      <div className="absolute left-[7px] top-2 h-full w-px bg-[var(--color-line)] last:hidden" aria-hidden="true" />
      <div className="relative mt-1.5 h-3.5 w-3.5 flex-none rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-panel-muted)]" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <time className="text-xs font-medium text-[var(--color-muted)]">{date}</time>
          {status && (
            <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-muted)]">
              {status}
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold leading-tight">{title}</h3>
        <div className="text-sm leading-6 text-[var(--color-muted)]">{children}</div>
      </div>
    </li>
  );
}

type TimelineProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function Timeline({ children, className }: TimelineProps) {
  return (
    <ul className={className} role="list">
      {children}
    </ul>
  );
}
