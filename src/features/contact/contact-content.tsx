"use client";

import { useState, type FormEvent } from "react";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { FormField } from "@/components/ui/form-field";

import {
  contactChannels,
  faqEntries,
  responseTimeGuidance,
  type FaqEntry,
} from "./contact-data";

interface InquiryDraft {
  name: string;
  email: string;
  message: string;
}

type InquiryErrors = Partial<Record<keyof InquiryDraft, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInquiry(draft: InquiryDraft): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!draft.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!draft.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(draft.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!draft.message.trim()) {
    errors.message = "Please enter a message.";
  }
  return errors;
}

function ChannelCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {contactChannels.map((channel) => (
        <div
          key={channel.id}
          className="flex flex-col gap-2 rounded-2xl border border-(--color-line) bg-(--color-panel-muted) p-5"
        >
          <h3 className="text-sm font-semibold text-[var(--color-ink)]">
            {channel.title}
          </h3>
          <p className="text-sm text-[var(--color-muted)]">
            {channel.description}
          </p>
          <a
            href={channel.href}
            {...(channel.external
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
            className="mt-auto text-sm font-medium text-[var(--color-accent)] underline underline-offset-4 hover:opacity-80"
          >
            {channel.linkLabel}
          </a>
        </div>
      ))}
    </div>
  );
}

function InquiryForm() {
  const [draft, setDraft] = useState<InquiryDraft>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateInquiry(draft);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  return (
    <form aria-label="Contact inquiry" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-4">
        <FormField
          label="Name"
          name="name"
          value={draft.name}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, name: event.target.value }))
          }
          error={errors.name ?? ""}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={draft.email}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, email: event.target.value }))
          }
          error={errors.email ?? ""}
          hint="We only use this to reply to your inquiry."
        />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={draft.message}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, message: event.target.value }))
            }
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className="rounded-md border border-(--color-line) bg-(--color-surface) px-3 py-2 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
          />
          {errors.message && (
            <p id="contact-message-error" className="text-xs text-red-600" role="alert">
              {errors.message}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="rounded-xl bg-[var(--color-ink)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Send inquiry
          </button>
          <p aria-live="polite" className="mt-3 text-sm text-[var(--color-muted)]">
            {submitted
              ? "Thank you. Your inquiry has been recorded and we will reply soon."
              : responseTimeGuidance}
          </p>
        </div>
      </div>
    </form>
  );
}

function FaqSection({ entries }: { entries: FaqEntry[] }) {
  return (
    <Accordion>
      {entries.map((entry) => (
        <AccordionItem key={entry.question} title={entry.question}>
          <p>{entry.answer}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function ContactContent() {
  return (
    <div className="flex flex-col gap-12">
      <section aria-labelledby="contact-channels-heading">
        <h2 className="eyebrow" id="contact-channels-heading">
          Channels
        </h2>
        <ChannelCards />
      </section>

      <section aria-labelledby="contact-form-heading">
        <h2 className="eyebrow" id="contact-form-heading">
          Send an inquiry
        </h2>
        <InquiryForm />
      </section>

      <section aria-labelledby="contact-faq-heading">
        <h2 className="eyebrow" id="contact-faq-heading">
          FAQ
        </h2>
        <FaqSection entries={faqEntries} />
      </section>
    </div>
  );
}
