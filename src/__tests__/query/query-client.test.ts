 import { describe, expect, it, vi } from "vitest";

 import { getQueryClient } from "../../lib/query/query-client";

 describe("getQueryClient", () => {
   it("returns a QueryClient instance with default options", () => {
     const client = getQueryClient();
     expect(client).toBeDefined();
     expect(client.getDefaultOptions().queries?.staleTime).toBe(60_000);
     expect(client.getDefaultOptions().queries?.retry).toBe(1);
   });

   it("reuses the same client across calls in the browser environment", () => {
     // Simulate browser global
     vi.stubGlobal("window", {});
     const a = getQueryClient();
     const b = getQueryClient();
     expect(a).toBe(b);
     vi.unstubAllGlobals();
   });
 });
