import { fireEvent, render, screen } from "@testing-library/react";

import { Accordion } from "./accordion";

const items = [
  {
    id: "fees",
    title: "What fees does Lilly charge?",
    content: "Lilly shows network and protocol fees before confirmation.",
  },
  {
    id: "wallets",
    title: "Can I connect more than one wallet?",
    content: "You can connect and manage multiple wallets from settings.",
  },
  {
    id: "security",
    title: "How is account recovery handled?",
    content: "Recovery options are explained before any account action.",
  },
];

describe("Accordion", () => {
  it("links each trigger to its panel and toggles expanded state", () => {
    render(<Accordion defaultOpenId="fees" items={items} />);

    const feesButton = screen.getByRole("button", {
      name: /what fees does lilly charge/i,
    });
    const panelId = feesButton.getAttribute("aria-controls");

    expect(feesButton).toHaveAttribute("aria-expanded", "true");
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId ?? "")).toHaveTextContent(
      /shows network and protocol fees/i,
    );

    fireEvent.click(feesButton);

    expect(feesButton).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById(panelId ?? "")).toHaveAttribute("hidden");
  });

  it("supports keyboard focus movement and open or close behavior", () => {
    render(<Accordion items={items} />);

    const buttons = screen.getAllByRole("button");
    const firstButton = buttons[0];
    const secondButton = buttons[1];
    const thirdButton = buttons[2];

    expect(firstButton).toBeDefined();
    expect(secondButton).toBeDefined();
    expect(thirdButton).toBeDefined();

    firstButton?.focus();
    fireEvent.keyDown(firstButton as HTMLButtonElement, { key: "ArrowDown" });
    expect(secondButton).toHaveFocus();

    fireEvent.keyDown(secondButton as HTMLButtonElement, { key: " " });
    expect(secondButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(secondButton as HTMLButtonElement, { key: "Enter" });
    expect(secondButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(secondButton as HTMLButtonElement, { key: "Home" });
    expect(firstButton).toHaveFocus();

    fireEvent.keyDown(firstButton as HTMLButtonElement, { key: "End" });
    expect(thirdButton).toHaveFocus();

    fireEvent.keyDown(thirdButton as HTMLButtonElement, { key: "ArrowDown" });
    expect(firstButton).toHaveFocus();

    fireEvent.keyDown(firstButton as HTMLButtonElement, { key: "ArrowUp" });
    expect(thirdButton).toHaveFocus();
  });

  it("includes a reduced-motion fallback for the panel transition", () => {
    render(<Accordion defaultOpenId="security" items={items} />);

    const securityButton = screen.getByRole("button", {
      name: /account recovery/i,
    });
    const panelId = securityButton.getAttribute("aria-controls");
    const panel = document.getElementById(panelId ?? "");

    expect(panel).toHaveClass("motion-reduce:transition-none");
  });
});
