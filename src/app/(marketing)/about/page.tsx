import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { AboutContent } from "@/features/about/about-content";
import { createScaffoldMetadata } from "@/features/scaffold/page-factory";

export const metadata: Metadata = {
  ...createScaffoldMetadata("about"),
  alternates: {
    canonical: new URL("/about", siteConfig.url).toString(),
  },
};

export default function AboutPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
        About
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)]">
        What Lily Protocol is, what we stand for, and who we build with.
      </p>
      <div className="mt-10">
        <AboutContent />
      </div>
    </>
  );
}
