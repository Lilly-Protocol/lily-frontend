import { describe, expect, it } from "vitest";

import {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from "./page";

describe("agent detail route", () => {
  it("pre-renders the seeded demo agent and rejects unknown IDs", () => {
    expect(generateStaticParams()).toEqual([{ id: "agentlily_demo_001" }]);
    expect(dynamicParams).toBe(false);
  });

  it("includes the agent ID in route metadata", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ id: "agentlily_demo_001" }),
    });

    expect(metadata.title).toBe("Agent Detail View: agentlily_demo_001");
    expect(metadata.description).toContain("agentlily_demo_001");
  });
});
