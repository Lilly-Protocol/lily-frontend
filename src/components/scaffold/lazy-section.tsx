"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SectionSkeleton } from "./section-skeleton";

/**
 * Demonstrates the lazy-loading pattern for below-the-fold marketing content.
 * Satisfies bounty #83: establishes convention for code-splitting sections
 * with next/dynamic while keeping first-viewport content in the route bundle.
 *
 * Usage in marketing routes:
 *   <LazySection module={() => import("./heavy-section")} />
 */

type LazySectionProps = {
  /** Dynamic import returning a React component */
  module: () => Promise<{ default: React.ComponentType }>;
  /** Optional label for accessibility / debugging */
  label?: string;
};

const LazySectionInner = ({
  module,
}: Omit<LazySectionProps, "label">) => {
  const Component = dynamic(module, {
    ssr: true,
    loading: () => <SectionSkeleton />,
  });

  return <Component />;
};

export function LazySection({ module, label }: LazySectionProps) {
  return (
    <Suspense fallback={<SectionSkeleton aria-label={label ? `${label} loading` : undefined}>
      <div className="sr-only">{label ?? "Content"} is loading…</div>
    </SectionSkeleton>}>
      <LazySectionInner module={module} />
    </Suspense>
  );
}
