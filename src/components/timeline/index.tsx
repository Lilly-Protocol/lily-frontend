import type { ReactNode } from "react";

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className = "" }: TimelineProps) {
  if (items.length === 0) return null;

  return (
    <div className={`relative border-l border-[var(--color-border)] pl-8 ${className}`}>
      {items.map((item, index) => (
        <div key={item.id} className="relative pb-12 last:pb-0">
          {/* Dot */}
          <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-background)]" />

          {/* Content */}
          <div className="flex flex-col gap-1">
            <time className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
              {item.date}
            </time>
            <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
