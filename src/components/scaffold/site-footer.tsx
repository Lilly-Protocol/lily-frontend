import type { Route } from "next";
import Link from "next/link";

import { getSectionRoutes } from "@/config/routes";
import { routes, siteConfig } from "@/config/site";

const footerSections = [
  {
    title: "Legal",
    routes: getSectionRoutes("legal"),
  },
  {
    title: "Resources",
    routes: getSectionRoutes("docs"),
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link
              className="text-lg font-semibold tracking-tight"
              href={routes.home as Route}
            >
              {siteConfig.name}
            </Link>
            <p className="text-sm leading-6 text-[var(--color-muted)]">
              {siteConfig.tagline}
            </p>
          </div>
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <p className="mb-3 text-sm font-semibold text-[var(--color-ink)]">
                {section.title}
              </p>
              <ul className="grid gap-2">
                {section.routes.map((route) => (
                  <li key={route.id}>
                    <Link
                      className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                      href={route.path as Route}
                    >
                      {route.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="border-t border-[var(--color-line)] pt-6">
          <p className="text-xs text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
