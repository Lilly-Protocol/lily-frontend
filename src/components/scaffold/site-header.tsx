"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import { routes, siteConfig } from "@/config/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="border-b border-[var(--color-line)] bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link
            className="text-lg font-semibold tracking-tight"
            href={routes.home as Route}
          >
            {siteConfig.name}
          </Link>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Contributor-ready scaffold
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Global"
          className="hidden md:flex flex-wrap gap-2 text-sm"
        >
          <Link
            className="rounded-full border border-[var(--color-line)] px-4 py-2 hover:border-[var(--color-accent)]"
            href={routes.docs as Route}
          >
            Docs
          </Link>
          <Link
            className="rounded-full border border-[var(--color-line)] px-4 py-2 hover:border-[var(--color-accent)]"
            href={routes.signin as Route}
          >
            Sign in
          </Link>
          <Link
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-white hover:opacity-90"
            href={routes.dashboard as Route}
          >
            Dashboard
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg border border-[var(--color-line)] p-2 text-[var(--color-ink)] hover:bg-[var(--color-panel-muted)]"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="border-t border-[var(--color-line)] bg-white px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3 text-sm">
            <Link
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-[var(--color-line)] px-4 py-2 text-center hover:border-[var(--color-accent)]"
              href={routes.docs as Route}
            >
              Docs
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-[var(--color-line)] px-4 py-2 text-center hover:border-[var(--color-accent)]"
              href={routes.signin as Route}
            >
              Sign in
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-[var(--color-ink)] px-4 py-2 text-center text-white hover:opacity-90"
              href={routes.dashboard as Route}
            >
              Dashboard
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
