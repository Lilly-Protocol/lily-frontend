export interface LilyApiErrorDetails {
  field?: string;
  reason?: string;
}

export class LilyApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: LilyApiErrorDetails[];

  constructor(
    message: string,
    status: number,
    code: string,
    details?: LilyApiErrorDetails[],
  ) {
    super(message);
    this.name = "LilyApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function isLilyApiError(error: unknown): error is LilyApiError {
  return error instanceof LilyApiError;
}

export async function handleApiResponse(response: Response): Promise<void> {
  if (response.ok) return;

  let code = "UNKNOWN_ERROR";
  let message = response.statusText || "An unexpected error occurred";
  let details: LilyApiErrorDetails[] | undefined;

  try {
    const body = await response.json();
    if (typeof body === "object" && body !== null) {
      if (typeof body.code === "string") code = body.code;
      if (typeof body.message === "string") message = body.message;
      if (Array.isArray(body.details)) details = body.details;
    }
  } catch {
    // Non-JSON error response; use defaults from status text
  }

  throw new LilyApiError(message, response.status, code, details);
}
