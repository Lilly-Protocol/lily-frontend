/**
 * Fetch wrapper with timeout and AbortController support.
 * Satisfies bounty #74: prevents dashboard routes from hanging on slow requests.
 */

export interface FetchWithTimeoutOptions extends RequestInit {
  /** Timeout in milliseconds. Defaults to 10000 (10s). */
  timeout?: number;
}

/**
 * A fetch wrapper that enforces a timeout and properly composes caller-provided
 * AbortSignals. Timers are always cleared on completion to avoid leaks.
 *
 * @param url - The URL to fetch.
 * @param options - Standard RequestInit plus an optional `timeout`.
 * @returns The Response from fetch.
 * @throws DOMException (AbortError) if the request times out or is cancelled.
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchWithTimeoutOptions = {},
): Promise<Response> {
  const { timeout = 10_000, signal: callerSignal, ...fetchOptions } = options;

  // Create an internal controller so we can enforce the timeout independently
  // of any caller-supplied signal.
  const internalController = new AbortController();
  const { signal: internalSignal } = internalController;

  // Compose signals: abort if EITHER the caller cancels OR our timeout fires.
  // We use AbortSignal.any when available (Node 20+, modern browsers), falling
  // back to manual listener composition for older runtimes.
  let composedSignal: AbortSignal;
  let cleanupListeners: (() => void) | undefined;

  if (typeof AbortSignal !== 'undefined' && typeof (AbortSignal as any).any === 'function') {
    composedSignal = (AbortSignal as any).any([internalSignal, ...(callerSignal ? [callerSignal] : [])]);
  } else {
    // Manual composition for environments without AbortSignal.any
    const combinedController = new AbortController();
    composedSignal = combinedController.signal;

    const onAbort = () => combinedController.abort();

    internalSignal.addEventListener('abort', onAbort);
    callerSignal?.addEventListener('abort', onAbort);

    cleanupListeners = () => {
      internalSignal.removeEventListener('abort', onAbort);
      callerSignal?.removeEventListener('abort', onAbort);
    };
  }

  const timer = setTimeout(() => internalController.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: composedSignal,
    });
    return response;
  } finally {
    clearTimeout(timer);
    cleanupListeners?.();
  }
}
