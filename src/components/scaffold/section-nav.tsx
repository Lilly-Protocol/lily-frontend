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
        {routes.map((route) => {
          const isDynamicPlaceholder = route.path === "/app/agents/[id]";
          const isActive =
            !isDynamicPlaceholder &&
            (pathname === route.path || pathname.startsWith(route.path + "/"));

          if (isDynamicPlaceholder) {
            return (
              <li key={route.id}>
                <div className="flex items-center justify-between rounded-2xl border border-dashed border-[var(--color-line)] bg-[var(--color-panel-muted)] px-4 py-3 text-sm">
                  <span>{route.title}</span>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {route.path}
                  </span>
                </div>
              </li>
            );
          }

          return (
            <li key={route.id}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between rounded-2xl border bg-[var(--color-panel-muted)] px-4 py-3 text-sm hover:border-[var(--color-accent)] ${
                  isActive
                    ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
                    : "border-[var(--color-line)]"
                }`}
                href={route.path as Route}
              >
                <span>{route.title}</span>
                <span className="font-mono text-xs text-[var(--color-muted)]">
                  {route.path}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
