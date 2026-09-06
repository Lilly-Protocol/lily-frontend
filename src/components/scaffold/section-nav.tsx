'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { RouteScaffold } from '@/types/site';

type SectionNavProps = {
  readonly routes: readonly RouteScaffold[];
  readonly ariaLabel?: string;
};

/**
 * A section link is current when the pathname equals the route path or is
 * nested underneath it (e.g. visiting /app/agents/<id> keeps the Agents
 * Registry /app/agents link current). The root path only matches exactly so
 * "/" is never reported active on deeper routes.
 */
function isCurrentSection(
  pathname: string | null | undefined,
  routePath: string,
): boolean {
  if (!pathname) {
    return false;
  }
  if (routePath === "/") {
    return pathname === "/";
  }
  return pathname === routePath || pathname.startsWith(`${routePath}/`);
}

export function SectionNav({
  routes,
  ariaLabel = "Section routes",
}: SectionNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel}>
      <ul className="grid gap-2">
        {routes.map((route) => {
          const isActive = isCurrentSection(pathname, route.path);

          return (
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
                  className={`flex items-center justify-between rounded-2xl border ${
                    isActive
                      ? "border-(--color-accent)"
                      : "border-(--color-line)"
                  } bg-(--color-panel-muted) px-4 py-3 text-sm hover:border-(--color-accent)`}
                  href={route.path as Route}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{route.title}</span>
                  <span className="font-mono text-xs text-(--color-muted)">
                    {route.path}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
