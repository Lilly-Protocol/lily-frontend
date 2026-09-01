import { lilyFetch, toLilyApiError } from "./client";
import { isLilyApiError, LilyApiError } from "./errors";

describe("Lily API errors", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps network failures to a typed error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));

    await expect(lilyFetch("/api/agents")).rejects.toMatchObject({
      name: "LilyApiError",
      status: 0,
      code: "NETWORK_ERROR",
      message: "Unable to reach the Lily API.",
      details: { cause: "offline" },
    });
  });

  it("maps a JSON 4xx response and preserves validation details", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            code: "INVALID_AGENT_ID",
            message: "Agent id is invalid.",
            details: { field: "id" },
          }),
          {
            status: 422,
            headers: { "content-type": "application/json" },
          },
        ),
      ),
    );

    await expect(lilyFetch("/api/agents/nope")).rejects.toMatchObject({
      status: 422,
      code: "INVALID_AGENT_ID",
      message: "Agent id is invalid.",
      details: { field: "id" },
    });
  });

  it("maps a plain-text 5xx response to a stable fallback code", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("Service temporarily unavailable.", { status: 503 }),
      ),
    );

    await expect(lilyFetch("/api/payments")).rejects.toMatchObject({
      status: 503,
      code: "HTTP_503",
      message: "Service temporarily unavailable.",
    });
  });

  it("returns successful responses unchanged", async () => {
    const response = new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));

    await expect(lilyFetch("/api/status")).resolves.toBe(response);
  });

  it("recognizes and normalizes unknown errors", () => {
    const typed = new LilyApiError({
      status: 404,
      code: "NOT_FOUND",
      message: "Missing",
    });

    expect(isLilyApiError(typed)).toBe(true);
    expect(
      isLilyApiError({
        name: "LilyApiError",
        status: 401,
        code: "UNAUTHORIZED",
        message: "No",
      }),
    ).toBe(true);
    expect(isLilyApiError(new Error("No"))).toBe(false);
    expect(toLilyApiError(typed)).toBe(typed);
    expect(toLilyApiError(new Error("Unexpected"))).toMatchObject({
      status: 0,
      code: "UNKNOWN_ERROR",
      message: "Unexpected",
    });
  });
});
