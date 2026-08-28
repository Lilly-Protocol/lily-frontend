"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";


import { routes, siteConfig } from "@/config/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--color-line)] bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link
            aria-current={pathname === routes.home ? "page" : undefined}
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
            aria-current={pathname === routes.docs ? "page" : undefined}
            className={`rounded-full border px-4 py-2 transition-colors ${
              pathname === routes.docs
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-semibold text-[var(--color-accent)]"
                : "border-[var(--color-line)] hover:border-[var(--color-accent)]"
            }`}
            href={routes.docs as Route}
          >
            Docs
          </Link>
          <Link
            aria-current={pathname === routes.signin ? "page" : undefined}
            className={`rounded-full border px-4 py-2 transition-colors ${
              pathname === routes.signin
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-semibold text-[var(--color-accent)]"
                : "border-[var(--color-line)] hover:border-[var(--color-accent)]"
            }`}
            href={routes.signin as Route}
          >
            Sign in
          </Link>
          <Link
            aria-current={pathname === routes.dashboard ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-white transition-opacity ${
              pathname === routes.dashboard
                ? "bg-[var(--color-accent)]"
                : "bg-[var(--color-ink)] hover:opacity-90"
            }`}
            href={routes.dashboard as Route}
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}

