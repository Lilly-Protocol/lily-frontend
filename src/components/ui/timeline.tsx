import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export type TimelineItemProps = {
  readonly date: string;
  readonly title: string;
  readonly children: ReactNode;
  readonly status?: string;
  /** Injected by <Timeline> for the last child; hides the connecting line. */
  readonly isLast?: boolean | undefined;
};

export function TimelineItem({
  date,
  title,
  children,
  status,
  isLast = false,
}: TimelineItemProps) {
  return (
    <li className="relative flex gap-4 pb-8 last:pb-0">
      {isLast ? null : (
        <div
          data-testid="timeline-line"
          className="absolute left-[7px] top-2 h-full w-px bg-[var(--color-line)]"
          aria-hidden="true"
        />
      )}
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
  const items = Children.toArray(children);
  return (
    <ol className={className}>
      {items.map((child, index) =>
        isValidElement(child) && child.type === TimelineItem
          ? cloneElement(child as ReactElement<TimelineItemProps>, {
              isLast: index === items.length - 1,
            })
          : child,
      )}
    </ol>
  );
}
