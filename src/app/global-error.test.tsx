import { fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { vi } from "vitest";

import GlobalError, { GlobalErrorPanel } from "./global-error";

vi.mock("next/font/google", () => ({
  IBM_Plex_Mono: () => ({ variable: "font-ibm-plex-mono" }),
  Space_Grotesk: () => ({ variable: "font-space-grotesk" }),
}));

describe("GlobalError", () => {
  it("renders a full document error boundary with font variables", () => {
    const reset = vi.fn();
    const error = Object.assign(new Error("Font failed"), {
      digest: "error-digest-123",
    });
    const markup = renderToStaticMarkup(
      <GlobalError error={error} reset={reset} />,
    );

    expect(markup).toContain("<html");
    expect(markup).toContain("font-space-grotesk");
    expect(markup).toContain("font-ibm-plex-mono");
    expect(markup).toContain("Digest: error-digest-123");
  });

  it("calls reset from the recovery action", () => {
    const reset = vi.fn();
    const error = new Error("Font failed");

    render(<GlobalErrorPanel error={error} reset={reset} />);

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(reset).toHaveBeenCalledOnce();
  });
});
