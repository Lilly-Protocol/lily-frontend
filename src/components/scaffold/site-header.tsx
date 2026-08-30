import type { Route } from "next";
"use client";
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
            className={`text-lg font-semibold tracking-tight ${pathname === routes.home ? "underline decoration-[var(--color-accent)] underline-offset-4" : ""}`}
            href={routes.home as Route}
            aria-current={pathname === routes.home ? "page" : undefined}
          >
            {siteConfig.name}
          </Link>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Contributor-ready scaffold
          </p>
        </div>
        <nav aria-label="Global" className="flex flex-wrap gap-2 text-sm">
          <Link
            className={`rounded-full border px-4 py-2 hover:border-[var(--color-accent)] ${pathname === routes.docs ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10" : "border-[var(--color-line)]"}`}
            href={routes.docs as Route}
            aria-current={pathname === routes.docs ? "page" : undefined}
          >
            Docs
          </Link>
          <Link
            className={`rounded-full border px-4 py-2 hover:border-[var(--color-accent)] ${pathname === routes.signin ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10" : "border-[var(--color-line)]"}`}
            href={routes.signin as Route}
            aria-current={pathname === routes.signin ? "page" : undefined}
          >
            Sign in
          </Link>
          <Link
            className={`rounded-full px-4 py-2 text-white hover:opacity-90 ${pathname.startsWith("/app") ? "bg-[var(--color-accent)]" : "bg-[var(--color-ink)]"}`}
            href={routes.dashboard as Route}
            aria-current={pathname.startsWith("/app") ? "page" : undefined}
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
