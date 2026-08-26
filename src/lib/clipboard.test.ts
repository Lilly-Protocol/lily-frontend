import { copyText } from "./clipboard";

describe("copyText", () => {
  const originalClipboard = navigator.clipboard;
  const originalExecCommand = document.execCommand;

  afterEach(() => {
    vi.restoreAllMocks();
    defineClipboard(originalClipboard);
    defineExecCommand(originalExecCommand);
  });

  it("uses the async clipboard API when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    defineClipboard({ writeText } as unknown as Clipboard);

    await expect(copyText("API key")).resolves.toEqual({
      ok: true,
      method: "clipboard",
    });
    expect(writeText).toHaveBeenCalledWith("API key");
  });

  it("falls back to execCommand when async clipboard fails", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    const execCommand = vi.fn().mockReturnValue(true);
    defineClipboard({ writeText } as unknown as Clipboard);
    defineExecCommand(execCommand);

    await expect(copyText("npm install lily")).resolves.toEqual({
      ok: true,
      method: "execCommand",
    });
    expect(execCommand).toHaveBeenCalledWith("copy");
  });

  it("reports failure when both clipboard paths fail", async () => {
    const error = new Error("denied");
    const writeText = vi.fn().mockRejectedValue(error);
    defineClipboard({ writeText } as unknown as Clipboard);
    defineExecCommand(vi.fn().mockReturnValue(false));

    await expect(copyText("secret")).resolves.toEqual({
      ok: false,
      error,
    });
  });

  it("reports fallback exceptions without leaving textarea nodes behind", async () => {
    const execCommand = vi.fn(() => {
      throw new Error("blocked");
    });
    defineClipboard(undefined);
    defineExecCommand(execCommand);

    const result = await copyText("reference");

    expect(result.ok).toBe(false);
    expect(result.error).toBeInstanceOf(Error);
    expect(document.querySelector("textarea")).not.toBeInTheDocument();
  });
});

function defineClipboard(value: Clipboard | undefined) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value,
  });
}

function defineExecCommand(value: Document["execCommand"] | undefined) {
  Object.defineProperty(document, "execCommand", {
    configurable: true,
    value,
  });
}
