import { isLilyApiError, LilyApiError } from "./errors";

interface ErrorPayload {
  code?: unknown;
  message?: unknown;
  details?: unknown;
}

async function readErrorPayload(response: Response): Promise<ErrorPayload> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const payload: unknown = await response.json();

      return typeof payload === "object" && payload !== null
        ? (payload as ErrorPayload)
        : { details: payload };
    } catch {
      return {};
    }
  }

  try {
    const message = await response.text();
    return message ? { message } : {};
  } catch {
    return {};
  }
}

/**
 * Fetches a Lily API resource and normalizes transport and HTTP failures.
 * Network failures use status `0` and code `NETWORK_ERROR`.
 */
export async function lilyFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  let response: Response;

  try {
    response = await fetch(input, init);
  } catch (error) {
    throw new LilyApiError({
      status: 0,
      code: "NETWORK_ERROR",
      message: "Unable to reach the Lily API.",
      details:
        error instanceof Error
          ? { cause: error.message }
          : { cause: "Unknown network error" },
    });
  }

  if (response.ok) {
    return response;
  }

  const payload = await readErrorPayload(response);

  throw new LilyApiError({
    status: response.status,
    code:
      typeof payload.code === "string"
        ? payload.code
        : `HTTP_${response.status}`,
    message:
      typeof payload.message === "string"
        ? payload.message
        : response.statusText || "Lily API request failed.",
    details: payload.details,
  });
}

/** Converts an unknown thrown value into the shared API error model. */
export function toLilyApiError(error: unknown): LilyApiError {
  if (isLilyApiError(error)) {
    return error;
  }

  return new LilyApiError({
    status: 0,
    code: "UNKNOWN_ERROR",
    message: error instanceof Error ? error.message : "An unknown error occurred.",
  });
}
