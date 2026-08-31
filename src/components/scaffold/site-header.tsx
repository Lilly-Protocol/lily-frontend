import type { Route } from "next";
import Link from "next/link";

import { routes, siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-line)] bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 p-4 sm:px-6 lg:px-8">
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
          <Link
            className="rounded-full border border-[var(--color-line)] px-4 py-2 hover:border-[var(--color-accent)]"
            href={routes.docs as Route}
          >
            Docs
          </Link>
          <Link
            className="rounded-full border border-[var(--color-line)] px-4 py-2 hover:border-[var(--color-accent)]"
            href={routes.signin as Route}
          >
            Sign in
          </Link>
          <Link
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-white hover:opacity-90"
            href={routes.dashboard as Route}
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
