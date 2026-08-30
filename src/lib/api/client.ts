export interface ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;
}

export interface RequestOptions extends RequestInit {
  timeout?: number;
}

export async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(path, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      let errorBody: Record<string, unknown> | undefined;
      try {
        errorBody = await response.json();
      } catch {
        // Response body is not JSON
      }

      const error: ApiError = new Error(
        (errorBody?.message as string) || `Request failed with status ${response.status}`
      );
      error.status = response.status;
      error.code = errorBody?.code as string | undefined;
      error.details = errorBody?.details;
      throw error;
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      const error: ApiError = new Error(`Request to ${path} timed out after ${timeout}ms`);
      error.status = 408;
      error.code = 'TIMEOUT';
      throw error;
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
