import type { Route } from "next";
import Link from "next/link";

import { routeScaffolds } from "@/config/routes";
import { siteConfig } from "@/config/site";

const FOOTER_SECTION_KEYS = ["legal", "docs"] as const;

type FooterSectionKey = (typeof FOOTER_SECTION_KEYS)[number];

const SECTION_LABELS: Record<FooterSectionKey, string> = {
  legal: "Legal",
  docs: "Support",
};

export function SiteFooter() {
  const footerGroups = FOOTER_SECTION_KEYS.map((key) => ({
    key,
    label: SECTION_LABELS[key],
    routes: routeScaffolds.filter(
      (r) => r.section === key && !r.path.includes("["),
    ),
  }));

  return (
    <footer
      aria-label="Site footer"
      className="border-t border-[var(--color-line)] bg-white/90"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          {/* Brand mark */}
          <div className="flex-none">
            <Link
              href={"/" as Route}
              className="text-base font-semibold tracking-tight text-[var(--color-ink)]"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--color-muted)]">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Link groups */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-10"
          >
            {footerGroups.map((group) => (
              <div key={group.key}>
                <p className="eyebrow text-[var(--color-accent)]">
                  {group.label}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.routes.map((route) => (
                    <li key={route.id}>
                      <Link
                        href={route.path as Route}
                        className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                      >
                        {route.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-[var(--color-line)] pt-6">
          <p className="text-sm text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
