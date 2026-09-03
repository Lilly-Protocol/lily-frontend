export type BlogCategory = "Engineering" | "Compliance" | "Product";

export const blogCategories = [
  "All",
  "Engineering",
  "Compliance",
  "Product",
  "Research",
] as const;

export type BlogFilter = (typeof blogCategories)[number];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  featured?: boolean;
}

export function postHref(slug: string): string {
  return `/blog/${slug}`;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "tokenization-pipeline",
    title: "Inside the Lily tokenization pipeline",
    excerpt:
      "A walkthrough of how an issuer document becomes a compliant on-chain asset.",
    category: "Engineering",
    date: "2026-08-18",
    featured: true,
  },
  {
    slug: "custody-audits",
    title: "What our custody audits actually check",
    excerpt: "Reserve proofs, signer policies, and the attestation cadence.",
    category: "Compliance",
    date: "2026-08-04",
  },
  {
    slug: "lily-sdk-2-0",
    title: "lily-sdk 2.0: fewer calls, clearer errors",
    excerpt: "A leaner client surface with typed errors end to end.",
    category: "Engineering",
    date: "2026-07-21",
  },
  {
    slug: "issuer-onboarding",
    title: "Issuer onboarding, simplified",
    excerpt: "The new step-by-step flow from application to first asset.",
    category: "Product",
    date: "2026-07-07",
  },
  {
    slug: "reserve-attestations",
    title: "Reading a reserve attestation report",
    excerpt: "How to verify that on-chain supply matches off-chain reserves.",
    category: "Compliance",
    date: "2026-06-23",
  },
];
