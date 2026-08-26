import type { Route } from "next";
import Link from "next/link";

import { routes, siteConfig, siteHeaderLinks } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-line)] bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link
            className="text-lg font-semibold tracking-tight"
            href={routes.home as Route}
          >
            {siteConfig.name}
          </Link>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Contributor-ready scaffold
          </p>
        </div>
        <nav aria-label="Global" className="flex flex-wrap gap-2 text-sm">
          {siteHeaderLinks.map((link) => (
            <Link
              className="rounded-full border border-[var(--color-line)] px-4 py-2 hover:border-[var(--color-accent)]"
              href={link.href as Route}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
