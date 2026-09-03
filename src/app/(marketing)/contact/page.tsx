import type { Metadata } from "next";

import { ContactContent } from "@/features/contact/contact-content";
import { createScaffoldMetadata } from "@/features/scaffold/page-factory";

export const metadata: Metadata = createScaffoldMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
        Contact
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-muted)]">
        Reach the right team through a channel below, or send an inquiry and we
        will get back to you.
      </p>
      <div className="mt-10">
        <ContactContent />
      </div>
    </>
  );
}
