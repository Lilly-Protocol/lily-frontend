import Link from "next/link";

import { getSectionRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const legalRoutes = getSectionRoutes("legal");
  const docsRoutes = getSectionRoutes("docs");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="eyebrow text-[var(--color-accent)]">{siteConfig.name}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {siteConfig.tagline}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-[var(--color-foreground)]">Legal</p>
              {legalRoutes.map((route) => (
                <Link
                  key={route.id}
                  href={route.path}
                  className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  {route.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-[var(--color-foreground)]">Resources</p>
              {docsRoutes.map((route) => (
                <Link
                  key={route.id}
                  href={route.path}
                  className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  {route.title}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="border-t border-[var(--color-border)] pt-8 text-center text-xs text-[var(--color-muted)]">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
