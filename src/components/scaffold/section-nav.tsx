"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { RouteScaffold } from "@/types/site";

type SectionNavProps = {
  readonly routes: readonly RouteScaffold[];
};

export function SectionNav({ routes }: SectionNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Section routes">
      <ul className="grid gap-2">
        {routes.map((route) => (
          <li key={route.id}>
            {route.path === "/app/agents/[id]" ? (
              <div className="flex items-center justify-between rounded-2xl border border-dashed border-[var(--color-line)] bg-[var(--color-panel-muted)] px-4 py-3 text-sm">
                <span>{route.title}</span>
                <span className="font-mono text-xs text-[var(--color-muted)]">
                  {route.path}
                </span>
              </div>
            ) : (
              <Link
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${pathname === route.path ? "border-[var(--color-accent)] bg-[var(--color-surface)] font-medium" : "border-[var(--color-line)] bg-[var(--color-panel-muted)] hover:border-[var(--color-accent)]"}`}
                href={route.path as Route}
                aria-current={pathname === route.path ? "page" : undefined}
              >
                <span>{route.title}</span>
                <span className="font-mono text-xs text-[var(--color-muted)]">
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
