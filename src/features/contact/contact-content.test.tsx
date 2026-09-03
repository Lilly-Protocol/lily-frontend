import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ContactPage from "@/app/(marketing)/contact/page";
import { contactChannels } from "./contact-data";
import { ContactContent } from "./contact-content";

describe("ContactContent", () => {
  it("renders one h1 heading for the page", () => {
    render(<ContactPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders all channel cards with their contact links", () => {
    render(<ContactContent />);
    for (const channel of contactChannels) {
      const link = screen.getByRole("link", { name: channel.linkLabel });
      expect(link).toHaveAttribute("href", channel.href);
      expect(screen.getByText(channel.title)).toBeInTheDocument();
    }
  });

  it("renders exactly one form landmark", () => {
    render(<ContactContent />);
    const forms = screen.getAllByRole("form");
    expect(forms).toHaveLength(1);
  });

  it("shows inline errors and does not navigate when submitting an empty form", async () => {
    const user = userEvent.setup();
    render(<ContactContent />);

    const form = screen.getByRole("form", { name: /contact inquiry/i });
    await user.click(within(form).getByRole("button", { name: /send inquiry/i }));

    const alerts = screen.getAllByRole("alert");
    expect(alerts).toHaveLength(3);
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument();
    expect(form).not.toHaveAttribute("action");
  });

  it("clears errors and confirms submission when the form is filled validly", async () => {
    const user = userEvent.setup();
    render(<ContactContent />);

    const form = screen.getByRole("form", { name: /contact inquiry/i });
    await user.type(within(form).getByLabelText(/name/i), "Ada");
    await user.type(within(form).getByLabelText(/email/i), "ada@example.com");
    await user.type(within(form).getByLabelText(/message/i), "Hello there");
    await user.click(within(form).getByRole("button", { name: /send inquiry/i }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText(/thank you\. your inquiry has been recorded/i)).toBeInTheDocument();
  });

  it("toggles FAQ accordion panels on click", async () => {
    const user = userEvent.setup();
    render(<ContactContent />);

    const firstQuestion = screen.getByRole("button", { name: /how fast will i get a response/i });
    expect(firstQuestion).toHaveAttribute("aria-expanded", "false");

    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByRole("region", { name: /how fast will i get a response/i });
    expect(within(panel).getByText(/reply to support and security inquiries within two business days/i)).toBeInTheDocument();

    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
  });
});
