import type { Route } from "next";
import Link from "next/link";

import type { RouteScaffold } from "@/types/site";

type SectionNavProps = {
  readonly routes: readonly RouteScaffold[];
};

export function SectionNav({ routes }: SectionNavProps) {
  return (
    <nav aria-label="Section routes">
      <ul className="grid gap-2">
        {routes.map((route) => (
          <li key={route.id}>
            {route.path === "/app/agents/[id]" ? (
              <div className="flex items-center justify-between rounded-2xl border border-dashed border-(--color-line) bg-(--color-panel-muted) px-4 py-3 text-sm">
                <span>{route.title}</span>
                <span className="font-mono text-xs text-(--color-muted)">
                  {route.path}
                </span>
              </div>
            ) : (
              <Link
                className="flex items-center justify-between rounded-2xl border border-(--color-line) bg-(--color-panel-muted) px-4 py-3 text-sm hover:border-(--color-accent)"
                href={route.path as Route}
              >
                <span>{route.title}</span>
                <span className="font-mono text-xs text-(--color-muted)">
                  {route.path}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
