"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ImplementationAreas = dynamic(
  () => import("./implementation-areas").then((m) => m.ImplementationAreas),
  { ssr: false }
);

export function ImplementationAreasWrapper({ areas }: { readonly areas: readonly string[] }) {
  return (
    <Suspense
      fallback={
        <div className="mt-4 grid gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel-muted)]"
            />
          ))}
        </div>
      }
    >
      <ImplementationAreas areas={areas} />
    </Suspense>
  );
}
