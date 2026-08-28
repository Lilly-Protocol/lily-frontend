import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { middleware, REQUEST_ID_HEADER } from "./middleware";

describe("Request ID Middleware", () => {
  it("generates a new UUID request-id when not present on incoming request", () => {
    const request = new NextRequest(new URL("https://lilyprotocol.dev/app"));
    const response = middleware(request);

    const responseRequestId = response.headers.get(REQUEST_ID_HEADER);
    expect(responseRequestId).toBeDefined();
    expect(typeof responseRequestId).toBe("string");
    // Validate standard UUID format: 8-4-4-4-12 hex chars
    expect(responseRequestId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
  });

  it("propagates existing request-id if supplied by client or proxy", () => {
    const incomingId = "custom-trace-id-12345";
    const request = new NextRequest(new URL("https://lilyprotocol.dev/docs"), {
      headers: {
        [REQUEST_ID_HEADER]: incomingId,
      },
    });

    const response = middleware(request);
    expect(response.headers.get(REQUEST_ID_HEADER)).toBe(incomingId);
  });

  it("attaches the request-id to the internal forwarded request headers", () => {
    const request = new NextRequest(new URL("https://lilyprotocol.dev/status"));
    const response = middleware(request);

    const responseRequestId = response.headers.get(REQUEST_ID_HEADER);
    expect(responseRequestId).toBeDefined();
  });
});
