import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contribute to Lily',
  description: 'Learn how to contribute to the Lily Protocol frontend project.',
};

const steps = [
  {
    title: 'Fork & Clone',
    description: 'Fork the repository and clone it locally. Install dependencies with `pnpm install`.',
  },
  {
    title: 'Pick an Issue',
    description: 'Browse open issues labeled "good first issue" or "bounty". Comment to claim before starting.',
  },
  {
    title: 'Develop & Test',
    description: 'Create a feature branch, implement your changes, and ensure `pnpm lint`, `pnpm format`, and `pnpm test` pass.',
  },
  {
    title: 'Submit PR',
    description: 'Open a pull request referencing the issue number. Include screenshots or recordings for UI changes.',
  },
];

export default function ContributePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Contribute to Lily
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        We welcome contributions of all sizes. Follow this guide to get started
        and ship your first pull request.
      </p>

      <section className="mt-12 space-y-8">
        {steps.map((step, index) => (
          <div key={step.title} className="relative pl-8">
            <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <h2 className="text-xl font-semibold text-foreground">{step.title}</h2>
            <p className="mt-2 text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </section>

      <div className="mt-12 rounded-lg border border-border bg-muted/50 p-6">
        <h3 className="font-semibold text-foreground">Need help?</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Join our Discord community or open a discussion on GitHub if you have
          questions about the codebase, tooling, or bounty eligibility.
        </p>
      </div>
    </main>
  );
}
