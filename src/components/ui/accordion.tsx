"use client";

import * as React from "react";

type AccordionItemProps = {
  readonly title: string;
  readonly children: React.ReactNode;
  readonly defaultOpen?: boolean;
};

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const contentId = React.useId();
  const triggerId = React.useId();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const items = Array.from(
        document.querySelectorAll<HTMLButtonElement>(
          '[data-accordion-trigger="true"]'
        )
      );
      const currentIndex = items.indexOf(event.currentTarget);
      const nextIndex =
        event.key === "ArrowDown"
          ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length;
      items[nextIndex]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      document
        .querySelectorAll<HTMLButtonElement>(
          '[data-accordion-trigger="true"]'
        )[0]
        ?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      const all = document.querySelectorAll<HTMLButtonElement>(
        '[data-accordion-trigger="true"]'
      );
      all[all.length - 1]?.focus();
    }
  };

  return (
    <div className="border-b border-[var(--color-line)]">
      <h3>
        <button
          type="button"
          data-accordion-trigger="true"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          className="flex w-full items-center justify-between py-4 text-left font-[family-name:var(--font-space-grotesk)] text-sm font-medium text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
        >
          <span>{title}</span>
          <span
            aria-hidden="true"
            className={`ml-4 transition-transform duration-200 motion-reduce:transition-none ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className="overflow-hidden"
      >
        <div className="pb-4 pt-0 font-[family-name:var(--font-ibm-plex-mono)] text-sm leading-relaxed text-[var(--color-ink)] opacity-90">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Accordion({ children }: { readonly children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}
