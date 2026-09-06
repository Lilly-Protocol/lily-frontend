import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { contactChannels, faqItems } from "@/features/contact/contact-data";
import ContactPage from "./page";

describe("ContactPage", () => {
  it("renders exactly one h1 and one form landmark", () => {
    render(<ContactPage />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/contact/i);

    const formElements = document.querySelectorAll("form");
    expect(formElements).toHaveLength(1);
  });

  it("renders support, security, and community channel cards with links", () => {
    render(<ContactPage />);

    for (const channel of contactChannels) {
      expect(screen.getByText(channel.title)).toBeInTheDocument();
      const link = screen.getByRole("link", {
        name: new RegExp(channel.actionLabel, "i"),
      });
      expect(link).toHaveAttribute("href", channel.href);
    }
  });

  it("submits an empty form and displays validation errors without navigating", async () => {
    render(<ContactPage />);

    const submitButton = screen.getByRole("button", { name: /submit inquiry/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });

    // Form remains in document (no submission / navigation)
    expect(
      screen.getByRole("button", { name: /submit inquiry/i }),
    ).toBeInTheDocument();
  });

  it("validates invalid email address format", async () => {
    render(<ContactPage />);

    await userEvent.type(screen.getByLabelText(/full name/i), "Alice");
    await userEvent.type(screen.getByLabelText(/email address/i), "not-an-email");
    await userEvent.type(screen.getByLabelText(/message/i), "Need help");
    await userEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i),
      ).toBeInTheDocument();
    });
  });

  it("toggles FAQ accordion panels on click", async () => {
    render(<ContactPage />);

    const firstFaq = faqItems[0]!;
    const faqButton = screen.getByRole("button", {
      name: new RegExp(firstFaq.question, "i"),
    });
    expect(faqButton).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(faqButton);
    expect(faqButton).toHaveAttribute("aria-expanded", "true");
  });
});
