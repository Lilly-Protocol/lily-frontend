import type { Route } from "next";
import Link from "next/link";

import { getSectionRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const legalRoutes = getSectionRoutes("legal");
  const docsRoutes = getSectionRoutes("docs");

  return (
    <footer className="border-t border-[var(--color-line)] bg-white/50 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="eyebrow text-xs text-[var(--color-accent)] font-semibold">
              {siteConfig.name}
            </span>
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-4 text-xs text-[var(--color-muted)]">
            {[...docsRoutes, ...legalRoutes].map((route) => (
              <Link
                key={route.id}
                className="hover:text-[var(--color-ink)] hover:underline"
                href={route.path as Route}
              >
                {route.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-[var(--color-line)] pt-4 text-xs text-[var(--color-muted)]">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
