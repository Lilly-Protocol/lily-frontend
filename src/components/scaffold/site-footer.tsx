import type { Route } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { routeScaffolds } from "@/config/routes";

const FOOTER_ROUTE_IDS = ["terms", "privacy", "cookies", "docs", "status"] as const;

export function SiteFooter() {
  const footerRoutes = routeScaffolds.filter((r) =>
    (FOOTER_ROUTE_IDS as readonly string[]).includes(r.id),
  );

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-panel-muted)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </span>
          <p className="text-xs text-[var(--color-muted)]">
            {siteConfig.tagline}
          </p>
        </div>

        <nav aria-label="Legal and support" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {footerRoutes.map((route) => (
            <Link
              key={route.id}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:underline"
              href={route.path as Route}
            >
              {route.title}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
