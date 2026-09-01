"use client";

import type { RouteScaffold } from "@/types/site";

export function ImplementationAreas({ areas }: { readonly areas: readonly string[] }) {
  return (
    <ul className="mt-4 grid gap-3">
      {areas.map((area) => (
        <li
          key={area}
          className="rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-muted)]"
        >
          {area}
        </li>
      ))}
    </ul>
  );
}
