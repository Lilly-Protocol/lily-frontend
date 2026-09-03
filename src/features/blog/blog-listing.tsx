"use client";

import { useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";

import { blogCategories, postHref, type BlogFilter, type BlogPost } from "./blog-data";

function EmptyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 7v2m0 4v2m-7 2h14a1 1 0 0 0 .894-1.447l-7-14a1 1 0 0 0-1.788 0l-7 14A1 1 0 0 0 5 17Z"
      />
    </svg>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={postHref(post.slug)}
      className="flex flex-col gap-2 rounded-2xl border border-(--color-line) bg-(--color-panel-muted) p-5 transition-colors hover:border-(--color-accent)"
    >
      <span className="eyebrow">{post.category}</span>
      <h3 className="text-base font-semibold text-[var(--color-ink)]">
        {post.title}
      </h3>
      <p className="text-sm text-[var(--color-muted)]">{post.excerpt}</p>
      <time className="text-xs text-[var(--color-muted)]" dateTime={post.date}>
        {post.date}
      </time>
    </a>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={postHref(post.slug)}
      className="flex flex-col gap-3 rounded-2xl border border-(--color-accent) bg-(--color-panel-muted) p-6 transition-opacity hover:opacity-90"
    >
      <span className="eyebrow">Featured · {post.category}</span>
      <h2 className="text-xl font-semibold text-[var(--color-ink)]">
        {post.title}
      </h2>
      <p className="text-sm text-[var(--color-muted)]">{post.excerpt}</p>
      <time className="text-xs text-[var(--color-muted)]" dateTime={post.date}>
        {post.date}
      </time>
    </a>
  );
}

function FilterBar({
  active,
  onSelect,
}: {
  active: BlogFilter;
  onSelect: (filter: BlogFilter) => void;
}) {
  return (
    <div role="group" aria-label="Filter posts by category" className="flex flex-wrap gap-2">
      {blogCategories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={active === category}
          onClick={() => onSelect(category)}
          className={[
            "rounded-full border px-4 py-1.5 text-sm transition-colors",
            active === category
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-medium text-[var(--color-ink)]"
              : "border-(--color-line) text-[var(--color-muted)] hover:border-(--color-accent)",
          ].join(" ")}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export function BlogListing({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState<BlogFilter>("All");

  const matching =
    filter === "All" ? posts : posts.filter((post) => post.category === filter);
  const featured = matching.find((post) => post.featured);
  const rest = matching.filter((post) => post !== featured);

  return (
    <div className="flex flex-col gap-8">
      <FilterBar active={filter} onSelect={setFilter} />

      {matching.length === 0 ? (
        <EmptyState
          icon={<EmptyIcon />}
          eyebrow={filter}
          title="No posts here yet"
          description={`We have not published anything in ${filter} yet. Try another category.`}
        />
      ) : (
        <>
          {featured && <FeaturedCard post={featured} />}
          {rest.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
