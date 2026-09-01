// types/api-error.ts
export interface ApiErrorDetails {
  [key: string]: string | string[] | undefined;
}

export class ApiError extends Error {
  readonly status: number;
  readonly details?: ApiErrorDetails;

  constructor(status: number, message: string, details?: ApiErrorDetails) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static fromResponse(response: Response): ApiError {
    const status = response.status;
    let message = response.statusText;
    let details: ApiErrorDetails | undefined;

    if (response.ok) {
      throw new Error("Cannot create ApiError from successful response");
    }

    // Try to parse JSON error body
    response.clone().json().then((data) => {
      if (data?.message) message = data.message;
      if (data?.details) details = data.details;
    }).catch(() => {
      // Fallback if not JSON
    });

    // For synchronous usage, assume defaults if parsing fails
    return new ApiError(status, message, details);
  }

  static badRequest(message: string, details?: ApiErrorDetails): ApiError {
    return new ApiError(400, message, details);
  }

  static unauthorized(message: string, details?: ApiErrorDetails): ApiError {
    return new ApiError(401, message, details);
  }

  static forbidden(message: string, details?: ApiErrorDetails): ApiError {
    return new ApiError(403, message, details);
  }

  static notFound(message: string, details?: ApiErrorDetails): ApiError {
    return new ApiError(404, message, details);
  }

  static internal(message: string, details?: ApiErrorDetails): ApiError {
    return new ApiError(500, message, details);
  }
}