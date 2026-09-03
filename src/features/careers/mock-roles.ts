import type { CultureSection, OpenRole } from "./types";

export const openRoles: readonly OpenRole[] = [
  {
    id: "protocol-engineer",
    title: "Senior Protocol Engineer",
    team: "Protocol",
    location: "Remote (GMT-3 to GMT+3)",
    locationType: "Remote",
    applyHref: "mailto:careers@lilyprotocol.dev?subject=Senior%20Protocol%20Engineer",
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer, Dashboard",
    team: "Product",
    location: "Remote (GMT-5 to GMT+2)",
    locationType: "Remote",
    applyHref: "mailto:careers@lilyprotocol.dev?subject=Frontend%20Engineer%2C%20Dashboard",
  },
  {
    id: "developer-relations",
    title: "Developer Relations Engineer",
    team: "Ecosystem",
    location: "Lisbon, Portugal",
    locationType: "Hybrid",
    applyHref: "mailto:careers@lilyprotocol.dev?subject=Developer%20Relations%20Engineer",
  },
  {
    id: "security-reviewer",
    title: "Smart Contract Security Reviewer",
    team: "Security",
    location: "Remote (worldwide)",
    locationType: "Remote",
    applyHref:
      "mailto:careers@lilyprotocol.dev?subject=Smart%20Contract%20Security%20Reviewer",
  },
];

export const cultureSections: readonly CultureSection[] = [
  {
    id: "how-we-work",
    title: "How we work",
    body: "We are a small, fully distributed team that ships in public. Work happens in the open: design docs, protocol changes, and incident reviews are written down and reviewed asynchronously so nobody has to sit in a meeting to stay informed.",
  },
  {
    id: "what-we-value",
    title: "What we value",
    body: "Clarity over cleverness. We favour the boring, auditable solution, we write the test before the optimisation, and we treat a clear explanation as part of the deliverable rather than an afterthought.",
  },
  {
    id: "how-we-hire",
    title: "How we hire",
    body: "Every loop is the same shape: a scoping conversation, a paired work session on a real problem from our backlog, and a conversation about how you make decisions under uncertainty. We give a decision within five business days.",
  },
];
