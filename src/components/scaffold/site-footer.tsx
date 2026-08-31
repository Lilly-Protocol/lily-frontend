import type { Route } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { getSectionRoutes } from "@/config/routes";

const footerLinks = [
  ...getSectionRoutes("legal").map((r) => ({ href: r.path, label: r.title })),
  ...getSectionRoutes("docs").map((r) => ({ href: r.path, label: r.title })),
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-tight text-[var(--color-foreground)]">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              {siteConfig.tagline}
            </p>
          </div>
          <nav aria-label="Legal and support" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as Route}
                className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
