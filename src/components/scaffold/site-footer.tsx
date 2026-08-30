import Link from "next/link";

import { routes, siteConfig } from "@/config/site";

const legalLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
] as const;

const supportLinks = [
  { label: "Docs", href: routes.docs },
  { label: "Status", href: routes.status },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-tight">{siteConfig.name}</p>
            <p className="text-sm leading-6 text-[var(--color-muted)]">
              {siteConfig.tagline}
            </p>
          </div>
          <nav aria-label="Legal" className="space-y-3">
            <p className="text-sm font-semibold tracking-tight">Legal</p>
            <ul className="space-y-2 text-sm text-[var(--color-muted)]">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="hover:text-[var(--color-accent)]"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Support" className="space-y-3">
            <p className="text-sm font-semibold tracking-tight">Support</p>
            <ul className="space-y-2 text-sm text-[var(--color-muted)]">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="hover:text-[var(--color-accent)]"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-tight">Connect</p>
            <p className="text-sm leading-6 text-[var(--color-muted)]">
              Built for contributors. Open source on GitHub.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-muted)]">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Designed for issue-driven development.</p>
        </div>
      </div>
    </footer>
  );
}
