import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute to Lilly Protocol",
  description:
    "Join the Lilly Protocol community. Find bounties, report bugs, and help build the future of decentralized AI.",
};

const STEPS = [
  {
    title: "Find an Issue",
    description:
      "Browse open issues labeled 'bounty' or 'good first issue' on our GitHub repository.",
  },
  {
    title: "Claim & Build",
    description:
      "Comment on the issue to claim it, fork the repo, and submit a pull request following our contribution guidelines.",
  },
  {
    title: "Get Paid",
    description:
      "Once your PR is reviewed and merged, the bounty is automatically processed to your connected wallet.",
  },
];

export default function ContributePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16">
      <section className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-foreground)]">
          Contribute to Lilly Protocol
        </h1>
        <p className="text-lg text-[var(--color-muted)]">
          Earn crypto while building open-source tooling for autonomous agents.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.title}
            className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
          >
            <h2 className="text-xl font-semibold text-[var(--color-foreground)]">
              {step.title}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              {step.description}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)]/10 p-8 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-[var(--color-foreground)]">
          Ready to start?
        </h2>
        <p className="mb-6 text-[var(--color-muted)]">
          Check out the open bounties and pick your first task.
        </p>
        <a
          href="https://github.com/Lilly-Protocol/lily-frontend/issues?q=is%3Aissue+is%3Aopen+label%3Abounty"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-[var(--color-accent)] px-6 py-3 font-medium text-[var(--color-accent-foreground)] transition-opacity hover:opacity-90"
        >
          Browse Open Bounties
        </a>
      </section>
    </main>
  );
}
