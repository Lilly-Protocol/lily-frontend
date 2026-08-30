import { createScaffoldPage } from "@/features/scaffold/page-factory";
import { LazySection } from "@/components/scaffold/lazy-section";

/**
 * Landing page with lazy-loaded below-the-fold content.
 * Demonstrates the code-splitting convention for bounty #83.
 */
const ScaffoldPage = createScaffoldPage("landing");

export default function LandingPage() {
  return (
    <>
      <ScaffoldPage />
      {/* Example: below-the-fold section loaded lazily to reduce initial bundle size */}
      <LazySection
        label="Ecosystem partners"
        module={() => import("@/components/scaffold/example-below-fold")}
      />
    </>
  );
}
