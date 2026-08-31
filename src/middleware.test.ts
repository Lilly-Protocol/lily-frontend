import { describe, it, expect, vi } from "vitest";
import { middleware } from "./middleware";

vi.mock("next/server", () => {
  return {
    NextResponse: {
      next: vi.fn(({ request }: { request?: { headers: Headers } } = {}) => {
        const responseHeaders = new Map<string, string>();
        return {
          headers: {
            set: (k: string, v: string) => responseHeaders.set(k, v),
            get: (k: string) => responseHeaders.get(k),
          },
          _requestHeaders: request?.headers ?? null,
        };
      }),
    },
  };
});

describe("middleware", () => {
  it("sets x-request-id on response and forwards to request for document requests", () => {
    const headers = new Headers({ "sec-fetch-dest": "document" });
    const req = { headers } as any;
    const res = middleware(req);
    const id = res.headers.get("x-request-id");
    expect(id).toBeTruthy();
    expect(res._requestHeaders.get("x-request-id")).toBe(id);
  });

  it("skips non-document requests", () => {
    const headers = new Headers({ "sec-fetch-dest": "script" });
    const req = { headers } as any;
    const res = middleware(req);
    expect(res.headers.get("x-request-id")).toBeUndefined();
  });

  it("assigns request id when sec-fetch-dest is missing", () => {
    const headers = new Headers();
    const req = { headers } as any;
    const res = middleware(req);
    expect(res.headers.get("x-request-id")).toBeTruthy();
  });
});
