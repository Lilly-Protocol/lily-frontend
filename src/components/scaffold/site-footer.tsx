 import type { Route } from "next";
import Link from "next/link";

 import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <nav aria-label="Legal and support" className="flex flex-wrap gap-4 text-sm">
          <Link
            className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            href={"/terms" as Route}
          >
            Terms
          </Link>
          <Link
            className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            href={"/privacy" as Route}
          >
            Privacy
          </Link>
          <Link
            className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            href={"/cookies" as Route}
          >
            Cookies
          </Link>
          <Link
            className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            href={"/contact" as Route}
          >
            Support
          </Link>
        </nav>
      </div>
    </footer>
  );
}
