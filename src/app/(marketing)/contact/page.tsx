"use client";

import { useState, type FormEvent } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { FormField } from "@/components/ui/form-field";

interface ChannelCard {
  title: string;
  description: string;
  linkText: string;
  href: string;
}

const channels: ChannelCard[] = [
  {
    title: "Support",
    description: "General assistance, account questions, and technical help.",
    linkText: "support@lilyprotocol.dev",
    href: "mailto:support@lilyprotocol.dev",
  },
  {
    title: "Security",
    description: "Vulnerability disclosures, security reports, and audits.",
    linkText: "security@lilyprotocol.dev",
    href: "mailto:security@lilyprotocol.dev",
  },
  {
    title: "Community",
    description: "Join community discussions, propose grants, and meet builders.",
    linkText: "community@lilyprotocol.dev",
    href: "mailto:community@lilyprotocol.dev",
  },
];

const faqs = [
  {
    question: "How quickly does the team respond to inquiries?",
    answer:
      "We monitor channels during regular business hours and typically respond within 24 to 48 hours.",
  },
  {
    question: "Where should I submit security vulnerability disclosures?",
    answer:
      "Please email security@lilyprotocol.dev with details and reproduction steps. We acknowledge security reports within 24 hours.",
  },
  {
    question: "How can I contribute to Lily Protocol?",
    answer:
      "Explore our open GitHub issues, join developer discussions, and read our contributing guidelines to get started.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-ink)]">
          Contact
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          Have questions or want to collaborate? Connect with the Lily Protocol team across our dedicated channels.
        </p>
      </header>

      {/* Channel Cards */}
      <section className="mb-16">
        <h2 className="mb-6 text-xl font-semibold text-[var(--color-ink)]">
          Inbound Channels
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {channels.map((channel) => (
            <div
              key={channel.title}
              className="flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-6 shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium text-[var(--color-ink)]">
                  {channel.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  {channel.description}
                </p>
              </div>
              <div className="mt-4">
                <a
                  href={channel.href}
                  className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                >
                  {channel.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="mb-16">
        <h2 className="mb-6 text-xl font-semibold text-[var(--color-ink)]">
          Send an Inquiry
        </h2>
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-6 sm:p-8">
          {isSubmitted ? (
            <div className="rounded-lg bg-teal-50 p-6 text-teal-800" role="status">
              <p className="font-medium">Thank you for reaching out!</p>
              <p className="mt-1 text-sm">
                Your message has been received. Our team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              <FormField
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                placeholder="Your full name"
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="you@example.com"
              />

              <FormField
                label="Subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                error={errors.subject}
                placeholder="Inquiry topic"
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
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you?"
                  className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] p-3 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                />
                {errors.message && (
                  <p className="text-xs text-red-600" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="mb-6 text-xl font-semibold text-[var(--color-ink)]">
          Frequently Asked Questions
        </h2>
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-6">
          <Accordion>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} title={faq.question}>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
