import { describe, it, expect } from "vitest";
import { createScaffoldMetadata } from "./page-factory";

describe("createScaffoldMetadata", () => {
  it("returns unique title and description for about route", () => {
    const meta = createScaffoldMetadata("about");
    expect(meta.title).toBe("About");
    expect(meta.description).toContain("team");
  });

  it("returns unique title for blog route", () => {
    const meta = createScaffoldMetadata("blog");
    expect(meta.title).toBe("Blog");
  });

  it("includes openGraph and twitter cards", () => {
    const meta = createScaffoldMetadata("landing");
    expect(meta.openGraph?.title).toBe("Landing Page");
    expect(meta.twitter?.title).toBe("Landing Page");
  });
});
