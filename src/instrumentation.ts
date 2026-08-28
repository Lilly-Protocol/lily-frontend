import type { Instrumentation } from "next";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node.js runtime initialization (e.g. error reporting client setup)
  }
}

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context,
) => {
  const errorDetails = {
    message: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
    path: request.path,
    method: request.method,
    headers: request.headers,
    routerKind: context.routerKind,
    routePath: context.routePath,
    routeType: context.routeType,
    timestamp: new Date().toISOString(),
  };

  // Structured logging for server observability
  if (process.env.NODE_ENV !== "test") {
    console.error(
      `[Server Error] [${context.routerKind}] ${request.method} ${request.path}:`,
      JSON.stringify(errorDetails, null, 2),
    );
  }
};
