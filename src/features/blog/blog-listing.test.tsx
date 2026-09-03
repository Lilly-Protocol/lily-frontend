import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import BlogPage from "@/app/(marketing)/blog/page";
import { blogPosts, postHref } from "./blog-data";
import { BlogListing } from "./blog-listing";

describe("BlogListing", () => {
  it("renders a single h1 on the page", () => {
    render(<BlogPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders the featured post and a card grid where every card links to a stable href", () => {
    render(<BlogPage />);

    const featured = blogPosts.find((post) => post.featured);
    expect(featured).toBeDefined();
    expect(screen.getByRole("heading", { name: featured!.title })).toBeInTheDocument();

    for (const post of blogPosts) {
      const link = screen.getByRole("link", { name: new RegExp(post.title, "i") });
      expect(link).toHaveAttribute("href", postHref(post.slug));
    }
  });

  it("filters the visible cards by category", async () => {
    const user = userEvent.setup();
    render(<BlogPage />);

    const group = screen.getByRole("group", { name: /filter posts by category/i });
    await user.click(within(group).getByRole("button", { name: "Compliance" }));

    const engineering = blogPosts.find((post) => post.category === "Engineering" && !post.featured)!;
    expect(screen.queryByRole("link", { name: new RegExp(engineering.title, "i") })).not.toBeInTheDocument();
    for (const post of blogPosts.filter((p) => p.category === "Compliance")) {
      expect(screen.getByRole("link", { name: new RegExp(post.title, "i") })).toBeInTheDocument();
    }
  });

  it("shows the empty state when nothing matches the filter", async () => {
    const user = userEvent.setup();
    render(<BlogPage />);

    const group = screen.getByRole("group", { name: /filter posts by category/i });
    await user.click(within(group).getByRole("button", { name: "Research" }));

    expect(screen.getByText(/no posts here yet/i)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /inside the lily tokenization pipeline/i })).not.toBeInTheDocument();
  });
});
