export type CopyTextMethod = "clipboard" | "execCommand";

export type CopyTextResult = {
  readonly ok: boolean;
  readonly method?: CopyTextMethod;
  readonly error?: unknown;
};

export async function copyText(text: string): Promise<CopyTextResult> {
  let clipboardError: unknown;

  if (canUseAsyncClipboard()) {
    try {
      await navigator.clipboard.writeText(text);

      return {
        ok: true,
        method: "clipboard",
      };
    } catch (error) {
      clipboardError = error;
    }
  }

  try {
    if (copyWithExecCommand(text)) {
      return {
        ok: true,
        method: "execCommand",
      };
    }
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }

  return {
    ok: false,
    error: clipboardError,
  };
}

function canUseAsyncClipboard() {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.clipboard?.writeText === "function"
  );
}

function copyWithExecCommand(text: string) {
  if (
    typeof document === "undefined" ||
    typeof document.execCommand !== "function" ||
    !document.body
  ) {
    return false;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.inset = "0";
  textArea.style.opacity = "0";
  textArea.style.pointerEvents = "none";

  document.body.append(textArea);
  textArea.select();
  textArea.setSelectionRange(0, textArea.value.length);

  try {
    return document.execCommand("copy");
  } finally {
    textArea.remove();
  }
}
