"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { routes, siteConfig } from "@/config/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
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

        {/* Mobile hamburger */}
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-ink)] hover:bg-[var(--color-surface)] md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          )}
        </button>

        {/* Desktop nav */}
        <nav aria-label="Global" className="hidden flex-wrap gap-2 text-sm md:flex">
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
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          ref={menuRef}
          className="border-t border-[var(--color-line)] bg-white px-4 pb-4 pt-2 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-2 text-sm">
            <Link
              className="rounded-md px-3 py-2 hover:bg-[var(--color-surface)]"
              href={routes.docs as Route}
              onClick={() => setIsOpen(false)}
            >
              Docs
            </Link>
            <Link
              className="rounded-md px-3 py-2 hover:bg-[var(--color-surface)]"
              href={routes.signin as Route}
              onClick={() => setIsOpen(false)}
            >
              Sign in
            </Link>
            <Link
              className="rounded-md bg-[var(--color-ink)] px-3 py-2 text-center text-white hover:opacity-90"
              href={routes.dashboard as Route}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
