import type { Metadata } from "next";

import { BlogListing } from "@/features/blog/blog-listing";
import { blogPosts } from "@/features/blog/blog-data";
import { createScaffoldMetadata } from "@/features/scaffold/page-factory";

export const metadata: Metadata = createScaffoldMetadata("blog");

export default function BlogPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
        Blog
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)]">
        Engineering notes, compliance explainers, and product updates from the
        Lily Protocol team.
      </p>
      <div className="mt-10">
        <BlogListing posts={blogPosts} />
      </div>
    </>
  );
}
