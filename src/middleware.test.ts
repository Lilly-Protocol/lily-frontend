import { describe, it, expect } from "vitest";
import { middleware } from "./middleware";
import { NextRequest } from "next/server";

describe("middleware", () => {
  it("sets x-request-id header on response when missing in request", () => {
    const request = new NextRequest(new URL("/", "http://localhost:3000"));
    const response = middleware(request);
    expect(response.headers.get("x-request-id")).toBeTruthy();
    expect(response.headers.get("x-request-id")?.length).toBeGreaterThan(0);
  });

  it("preserves existing x-request-id from request", () => {
    const existingId = "test-request-id-123";
    const request = new NextRequest(new URL("/", "http://localhost:3000"), {
      headers: { "x-request-id": existingId },
    });
    const response = middleware(request);
    expect(response.headers.get("x-request-id")).toBe(existingId);
  });
});
