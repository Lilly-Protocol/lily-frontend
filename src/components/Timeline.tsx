import type { ReactNode } from 'react';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className = '' }: TimelineProps) {
  return (
    <div className={`relative space-y-8 ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-4 top-2 bottom-2 w-px bg-border" aria-hidden />

      {events.map((event) => (
        <div key={event.id} className="relative pl-12">
          {/* Node marker */}
          <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm">
            {event.icon ?? (
              <span className="block h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </div>

          <time className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {event.date}
          </time>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{event.title}</h3>
          {event.description && (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
