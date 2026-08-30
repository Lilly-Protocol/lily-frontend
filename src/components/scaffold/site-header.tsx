"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes, siteConfig } from "@/config/site";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getLinkClass = (href: string, baseClass: string) => {
    const active = isActive(href);
    if (baseClass.includes("bg-[var(--color-ink)]")) {
      return `${baseClass} ${active ? "ring-2 ring-offset-2 ring-[var(--color-accent)]" : ""}`;
    }
    return `${baseClass} ${active ? "border-[var(--color-accent)] bg-[var(--color-panel-muted)] font-medium" : ""}`;
  };

  return (
    <header className="border-b border-[var(--color-line)] bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link
            className={`text-lg font-semibold tracking-tight ${isActive("/") ? "text-[var(--color-accent)]" : ""}`}
            href={routes.home as Route}
            aria-current={isActive("/") ? "page" : undefined}
          >
            {siteConfig.name}
          </Link>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Contributor-ready scaffold
          </p>
        </div>
        <nav aria-label="Global" className="flex flex-wrap gap-2 text-sm">
          <Link
            className={getLinkClass(routes.docs, "rounded-full border border-[var(--color-line)] px-4 py-2 hover:border-[var(--color-accent)]")}
            href={routes.docs as Route}
            aria-current={isActive(routes.docs) ? "page" : undefined}
          >
            Docs
          </Link>
          <Link
            className={getLinkClass(routes.signin, "rounded-full border border-[var(--color-line)] px-4 py-2 hover:border-[var(--color-accent)]")}
            href={routes.signin as Route}
            aria-current={isActive(routes.signin) ? "page" : undefined}
          >
            Sign in
          </Link>
          <Link
            className={getLinkClass(routes.dashboard, "rounded-full bg-[var(--color-ink)] px-4 py-2 text-white hover:opacity-90")}
            href={routes.dashboard as Route}
            aria-current={isActive(routes.dashboard) ? "page" : undefined}
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
