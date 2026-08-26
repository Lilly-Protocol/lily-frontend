"use client";

import { useId, useRef, useState } from "react";

import type { KeyboardEvent, ReactNode } from "react";

export type AccordionItem = {
  readonly id: string;
  readonly title: ReactNode;
  readonly content: ReactNode;
};

type AccordionProps = {
  readonly items: readonly AccordionItem[];
  readonly defaultOpenId?: string;
  readonly label?: string;
  readonly className?: string;
};

export function Accordion({
  items,
  defaultOpenId,
  label = "Frequently asked questions",
  className,
}: AccordionProps) {
  const initialOpenId =
    defaultOpenId && items.some((item) => item.id === defaultOpenId)
      ? defaultOpenId
      : null;
  const [openId, setOpenId] = useState<string | null>(initialOpenId);
  const baseId = useId();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function toggleItem(itemId: string) {
    setOpenId((currentId) => (currentId === itemId ? null : itemId));
  }

  function focusItem(index: number) {
    buttonRefs.current[index]?.focus();
  }

  function handleHeaderKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    itemId: string,
  ) {
    const lastIndex = items.length - 1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(index === lastIndex ? 0 : index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItem(index === 0 ? lastIndex : index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(0);
        break;
      case "End":
        event.preventDefault();
        focusItem(lastIndex);
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        toggleItem(itemId);
        break;
      default:
        break;
    }
  }

  return (
    <section
      aria-label={label}
      className={cx(
        "overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-panel)]",
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const triggerId = `${baseId}-${item.id}-trigger`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <article
            className="border-b border-[var(--color-line)] last:border-b-0"
            key={item.id}
          >
            <h3 className="text-base font-semibold">
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left text-[var(--color-ink)] outline-none transition-colors hover:bg-[var(--color-panel-muted)] focus-visible:bg-[var(--color-panel-muted)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-inset motion-reduce:transition-none"
                id={triggerId}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(event) =>
                  handleHeaderKeyDown(event, index, item.id)
                }
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                type="button"
              >
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className="grid size-8 flex-none place-items-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel-muted)] text-lg leading-none text-[var(--color-accent)]"
                >
                  {isOpen ? "-" : "+"}
                </span>
              </button>
            </h3>
            <div
              aria-labelledby={triggerId}
              className="grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
              hidden={!isOpen}
              id={panelId}
              role="region"
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-sm leading-7 text-[var(--color-muted)]">
                  {item.content}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function cx(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}
