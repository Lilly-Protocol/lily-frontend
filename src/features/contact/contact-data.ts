export interface ContactChannel {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  external?: boolean;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export const contactChannels: ContactChannel[] = [
  {
    id: "support",
    title: "Support",
    description: "Questions about the protocol, integrations, or your account.",
    href: "mailto:support@lilyprotocol.com",
    linkLabel: "Email support",
  },
  {
    id: "community",
    title: "Community",
    description: "Discuss ideas and get updates with the builder community.",
    href: "https://github.com/Lilly-Protocol",
    linkLabel: "Visit the community hub",
    external: true,
  },
  {
    id: "security",
    title: "Security",
    description: "Report a vulnerability or a security concern responsibly.",
    href: "mailto:security@lilyprotocol.com",
    linkLabel: "Email security",
  },
];

export const responseTimeGuidance =
  "We reply to support and security inquiries within two business days.";

export const faqEntries: FaqEntry[] = [
  {
    question: "How fast will I get a response?",
    answer: responseTimeGuidance,
  },
  {
    question: "Where do I report a security issue?",
    answer:
      "Use the security channel above with details and reproduction steps. We acknowledge reports within two business days and never disclose them until a fix ships.",
  },
  {
    question: "Can I contribute to the protocol?",
    answer:
      "Yes. Start from the community hub, pick an open issue, and open a pull request following the contribution guide.",
  },
];
