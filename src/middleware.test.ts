import { describe, it, expect } from "vitest";
import { middleware } from "./middleware";
import { NextRequest } from "next/server";

function createRequest(path: string, cookies: Record<string, string> = {}) {
  const url = new URL(path, "http://localhost:3000");
  const request = new NextRequest(url);
  for (const [key, value] of Object.entries(cookies)) {
    request.cookies.set(key, value);
  }
  return request;
}

describe("middleware", () => {
  it("allows public routes through", () => {
    const request = createRequest("/about");
    const response = middleware(request);
    expect(response.status).toBe(200);
  });

  it("redirects unauthenticated /app requests to signin", () => {
    const request = createRequest("/app/agents");
    const response = middleware(request);
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("/signin");
    expect(response.headers.get("location")).toContain("redirect=");
  });

  it("allows authenticated /app requests through", () => {
    const request = createRequest("/app/agents", { session: "abc123" });
    const response = middleware(request);
    expect(response.status).toBe(200);
  });

  it("does not redirect the signin page itself", () => {
    const request = createRequest("/signin");
    const response = middleware(request);
    expect(response.status).toBe(200);
  });
});
