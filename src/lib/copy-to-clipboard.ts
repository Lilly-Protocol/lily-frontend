"use client";

export interface CopyToClipboardOptions {
  /** Duration in ms to wait before resetting the copied state */
  timeout?: number;
  /** Callback invoked on successful copy */
  onSuccess?: () => void;
  /** Callback invoked if copy fails */
  onError?: (error: unknown) => void;
}

export interface CopyToClipboardResult {
  success: boolean;
  error?: unknown;
}

/**
 * Copies text to the clipboard with fallback support.
 * Returns a result object indicating success or failure.
 */
export async function copyToClipboard(
  text: string,
  options: CopyToClipboardOptions = {},
): Promise<CopyToClipboardResult> {
  const { onSuccess, onError } = options;

  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers or non-secure contexts
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    onSuccess?.();
    return { success: true };
  } catch (error) {
    onError?.(error);
    return { success: false, error };
  }
}
