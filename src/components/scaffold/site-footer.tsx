import type { Route } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { getSectionRoutes } from "@/config/routes";

export function SiteFooter() {
  const legalRoutes = getSectionRoutes("legal");
  const docsRoutes = getSectionRoutes("docs");
  const footerLinks = [...legalRoutes, ...docsRoutes];

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <nav aria-label="Legal and support" className="flex flex-wrap gap-4 text-sm">
          {footerLinks.map((route) => (
            <Link
              key={route.id}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
              href={route.path as Route}
            >
              {route.title}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
