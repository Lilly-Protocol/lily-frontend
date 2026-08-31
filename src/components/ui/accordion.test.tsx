import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionItem } from "./accordion";

describe("AccordionItem", () => {
  it("renders with correct aria attributes in collapsed state", () => {
    render(
      <Accordion>
        <AccordionItem title="Question">Answer</AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole("button", { name: /question/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls");
    const contentId = trigger.getAttribute("aria-controls")!;
    const region = document.getElementById(contentId);
    expect(region).toHaveAttribute("hidden");
  });

  it("toggles expanded state on click and exposes content", async () => {
    render(
      <Accordion>
        <AccordionItem title="Toggle Me">Visible Content</AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole("button", { name: /toggle me/i });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const contentId = trigger.getAttribute("aria-controls")!;
    const region = document.getElementById(contentId);
    expect(region).not.toHaveAttribute("hidden");
    expect(screen.getByText(/visible content/i)).toBeInTheDocument();
  });

  it("supports keyboard activation with Enter key", async () => {
    render(
      <Accordion>
        <AccordionItem title="Keyboard Test">Content</AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole("button", { name: /keyboard test/i });
    await userEvent.keyboard("{Enter}");
    // Focus the button first then press enter
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("respects defaultOpen prop", () => {
    render(
      <Accordion>
        <AccordionItem title="Open By Default" defaultOpen>
          Shown
        </AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole("button", { name: /open by default/i });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});
