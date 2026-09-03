import { describe, expect, it } from "vitest";

import * as lib from "@/lib";

describe("@/lib barrel exports", () => {
  it("exports lilyFetch as a function", () => {
    expect(typeof lib.lilyFetch).toBe("function");
  });

  it("exports toLilyApiError as a function", () => {
    expect(typeof lib.toLilyApiError).toBe("function");
  });

  it("exports LilyApiError as a class constructor", () => {
    expect(typeof lib.LilyApiError).toBe("function");
    const error = new lib.LilyApiError("Test failure", 400, "BAD_REQUEST");
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("LilyApiError");
    expect(error.status).toBe(400);
    expect(error.code).toBe("BAD_REQUEST");
  });

  it("exports isLilyApiError as a type guard function", () => {
    expect(typeof lib.isLilyApiError).toBe("function");
    const error = new lib.LilyApiError("Test failure", 500, "INTERNAL_ERROR");
    expect(lib.isLilyApiError(error)).toBe(true);
    expect(lib.isLilyApiError(new Error("standard error"))).toBe(false);
    expect(lib.isLilyApiError(null)).toBe(false);
  });

  it("exports handleApiResponse as a function", () => {
    expect(typeof lib.handleApiResponse).toBe("function");
  });
});
