"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes, siteConfig } from '@/config/site';

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--color-line)] bg-[var(--color-header-bg)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link className="text-lg font-semibold tracking-tight" href={routes.home as Route}>
            {siteConfig.name}
          </Link>
          <p className="mt-1 text-sm text-(--color-muted)">
            Contributor-ready scaffold
          </p>
        </div>
        <nav aria-label="Global" className="flex flex-wrap gap-2 text-sm">
          <Link
            className="rounded-full border border-(--color-line) px-4 py-2 hover:border-(--color-accent)"
            href={routes.docs as Route}
            aria-current={pathname === routes.docs ? "page" : undefined}
          >
            Docs
          </Link>
          <Link
            className="rounded-full border border-(--color-line) px-4 py-2 hover:border-(--color-accent)"
            href={routes.signin as Route}
            aria-current={pathname === routes.signin ? "page" : undefined}
          >
            Sign in
          </Link>
          <Link
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[var(--color-panel-contrast)] hover:opacity-90"
            href={routes.dashboard as Route}
            aria-current={pathname === routes.dashboard ? "page" : undefined}
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
