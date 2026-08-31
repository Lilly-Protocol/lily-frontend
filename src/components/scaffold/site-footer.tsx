import Link from "next/link";

import { getSectionRoutes } from "@/config/routes";

const footerLinks = [
  ...getSectionRoutes("legal").map((r) => ({ href: r.path, label: r.title })),
  ...getSectionRoutes("docs")
    .filter((r) => r.id === "docs" || r.id === "status")
    .map((r) => ({ href: r.path, label: r.title })),
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} Lilly Protocol. All rights reserved.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
