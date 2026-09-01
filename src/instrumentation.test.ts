import { describe, expect, it, vi } from "vitest";

import { onRequestError, register } from "./instrumentation";

describe("Server Instrumentation", () => {
  it("registers without throwing an error", () => {
    expect(() => register()).not.toThrow();
  });

  it("handles onRequestError hook without unhandled rejections", async () => {
    const error = new Error("Simulated layout render error");
    const mockRequest = {
      path: "/app/activity",
      method: "GET",
      headers: { "x-request-id": "test-uuid" },
    };
    const mockContext = {
      routerKind: "App Router" as const,
      routePath: "/app/activity",
      routeType: "render" as const,
      renderSource: "react-server-components" as const,
      revalidateReason: undefined,
    };

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(
      onRequestError(error, mockRequest, mockContext),
    ).resolves.not.toThrow();

    spy.mockRestore();
  });
});
