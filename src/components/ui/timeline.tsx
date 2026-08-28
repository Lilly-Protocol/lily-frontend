import type { ReactNode } from "react";

export type TimelineStatus = "completed" | "in-progress" | "planned" | "released";

export type TimelineItemProps = {
  readonly date: string;
  readonly title: string;
  readonly description?: ReactNode;
  readonly status?: TimelineStatus | string;
  readonly tag?: string;
  readonly isLast?: boolean;
};

export type TimelineProps = {
  readonly items: readonly TimelineItemProps[];
  readonly className?: string;
};

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  released: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "in-progress": "bg-amber-50 text-amber-700 border-amber-200",
  planned: "bg-slate-50 text-slate-600 border-slate-200",
};

export function TimelineItem({
  date,
  title,
  description,
  status,
  tag,
  isLast = false,
}: TimelineItemProps) {
  const badgeText = tag ?? status;
  const badgeStyle =
    status && statusStyles[status]
      ? statusStyles[status]
      : "bg-[var(--color-panel-muted)] text-[var(--color-muted)] border-[var(--color-line)]";

  return (
    <li className="relative flex gap-4 sm:gap-6">
      {/* Timeline line and node */}
      <div className="flex flex-col items-center">
        <div
          data-testid="timeline-node"
          className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-white shadow-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        </div>
        {!isLast && (
          <div
            data-testid="timeline-line"
            className="w-0.5 grow bg-[var(--color-line)]"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-8 pt-0.5 grow">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <time
            dateTime={date}
            className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--color-accent)]"
          >
            {date}
          </time>
          {badgeText && (
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${badgeStyle}`}
            >
              {badgeText}
            </span>
          )}
        </div>

        <h3 className="mt-1 text-base font-semibold text-[var(--color-ink)]">
          {title}
        </h3>

        {description && (
          <div className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            {description}
          </div>
        )}
      </div>
    </li>
  );
}

export function Timeline({ items, className = "" }: TimelineProps) {
  return (
    <ol
      aria-label="Timeline"
      className={`relative list-none p-0 ${className}`}
    >
      {items.map((item, index) => (
        <TimelineItem
          key={`${item.date}-${item.title}-${index}`}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </ol>
  );
}
