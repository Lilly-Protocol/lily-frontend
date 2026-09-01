// src/types/error.ts
export interface ApiErrorDetails {
  field?: string;
  value?: unknown;
  constraints?: Record<string, string>;
  [key: string]: unknown;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ApiErrorDetails[];
  timestamp: string;
  path?: string;
  method?: string;
}

export interface ErrorResponse {
  error?: ApiError;
  errors?: ApiErrorDetails[];
  message?: string;
  timestamp?: string;
  path?: string;
  method?: string;
  [key: string]: unknown;
}

// src/utils/error.ts
import { ApiError, ErrorResponse } from '@/types/error';

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
}

export function normalizeApiError(error: ErrorResponse | string): ApiError {
  if (typeof error === 'string') {
    return {
      code: 'UNKNOWN_ERROR',
      message: error,
      timestamp: new Date().toISOString(),
    };
  }

  if (isApiError(error)) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
      timestamp: error.timestamp || new Date().toISOString(),
      path: error.path,
      method: error.method,
    };
  }

  // Handle common error response formats
  const message = error.message || (error.error?.message ?? 'An unknown error occurred');
  const code = error.error?.code || (error.errors?.[0]?.constraints?.[Object.keys(error.errors?.[0]?.constraints || {})[0]] ?? 'API_ERROR');
  
  return {
    code: typeof code === 'string' ? code : 'API_ERROR',
    message,
    details: error.errors,
    timestamp: error.timestamp || new Date().toISOString(),
    path: error.path,
    method: error.method,
  };
}

export function formatApiError(error: ApiError): string {
  if (error.details && error.details.length > 0) {
    const fieldErrors = error.details
      .filter(d => d.field)
      .map(d => `${d.field}: ${Object.values(d.constraints || {}).join(', ')}`)
      .join('; ');
    
    if (fieldErrors) {
      return `${error.message} (${fieldErrors})`;
    }
  }
  
  return error.message;
}