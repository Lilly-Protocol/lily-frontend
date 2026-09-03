"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { RouteScaffold } from "@/types/site";

type SectionNavProps = {
  readonly routes: readonly RouteScaffold[];
  readonly ariaLabel?: string;
};

function isCurrentSection(pathname: string | null, routePath: string): boolean {
  if (pathname === null) return false;
  return pathname === routePath || pathname.startsWith(`${routePath}/`);
}

export function SectionNav({ routes, ariaLabel }: SectionNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel}>
      <ul className="grid gap-2">
        {routes.map((route) => (
          <li key={route.id} className="sm:w-64 sm:flex-none">
            {route.path === "/app/agents/[id]" ? (
              <div className="flex items-center justify-between rounded-2xl border border-dashed border-(--color-line) bg-(--color-panel-muted) px-4 py-3 text-sm">
                <span>{route.title}</span>
                <span className="font-mono text-xs text-(--color-muted)">
                  {route.path}
                </span>
              </div>
            ) : (
              <Link
                className={`flex items-center justify-between rounded-2xl border bg-(--color-panel-muted) px-4 py-3 text-sm hover:border-(--color-accent) ${
                  isCurrentSection(pathname, route.path)
                    ? "border-[var(--color-accent)]"
                    : "border-(--color-line)"
                }`}
                href={route.path as Route}
                aria-current={isCurrentSection(pathname, route.path) ? "page" : undefined}
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
