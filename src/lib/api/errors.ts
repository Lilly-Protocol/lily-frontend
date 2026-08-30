export interface LilyApiErrorOptions {
  status: number;
  code: string;
  message: string;
  details?: unknown;
}

/** A normalized error returned by Lily API requests. */
export class LilyApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor({ status, code, message, details }: LilyApiErrorOptions) {
    super(message);
    this.name = "LilyApiError";
    this.status = status;
    this.code = code;

    if (details !== undefined) {
      this.details = details;
    }
  }
}

/** Returns true when a value has the normalized Lily API error shape. */
export function isLilyApiError(value: unknown): value is LilyApiError {
  if (value instanceof LilyApiError) {
    return true;
  }

  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    candidate.name === "LilyApiError" &&
    typeof candidate.status === "number" &&
    typeof candidate.code === "string" &&
    typeof candidate.message === "string"
  );
}
