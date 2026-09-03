export interface AboutValue {
  title: string;
  description: string;
}

export interface EcosystemEntry {
  name: string;
  description: string;
}

export const missionStatement =
  "Lily Protocol builds open tokenization infrastructure so any issuer can bring compliant assets on-chain with clear custody, transparent audits, and simple developer tooling.";

export const aboutValues: AboutValue[] = [
  {
    title: "Transparency",
    description:
      "Every contract, audit, and reserve attestation is published and verifiable.",
  },
  {
    title: "Compliance first",
    description:
      "Issuance flows are designed around regulatory clarity from day one.",
  },
  {
    title: "Builder ergonomics",
    description:
      "SDKs and docs that make integrating tokenized assets a one-afternoon task.",
  },
];

export const ecosystemEntries: EcosystemEntry[] = [
  {
    name: "Issuers",
    description:
      "Funds and asset managers that tokenize portfolios through the protocol.",
  },
  {
    name: "Auditors",
    description:
      "Independent firms reviewing custody flows and reserve proofs.",
  },
  {
    name: "Integrators",
    description:
      "Wallets, custodians, and marketplaces consuming the lily-sdk.",
  },
];

export const aboutSections = [
  { id: "mission", heading: "Mission" },
  { id: "values", heading: "Values" },
  { id: "ecosystem", heading: "Ecosystem" },
] as const;
