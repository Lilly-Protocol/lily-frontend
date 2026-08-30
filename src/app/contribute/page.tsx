import type { Metadata } from "next";
import Link from "next/link";

import { routes } from "@/config/site";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Get started contributing to Lily Protocol. Setup, workflow, and validation guidance for new contributors.",
};

const CHECKS = [
  { cmd: "npm run lint", label: "Lint" },
  { cmd: "npm run typecheck", label: "Typecheck" },
  { cmd: "npm run test:run", label: "Unit tests" },
  { cmd: "npm run build", label: "Production build" },
  { cmd: "npm run check", label: "Full CI mirror" },
] as const;

export default function ContributePage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Contribute to Lily Protocol
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
          This repository is contributor-first. Pick a scoped issue, follow the
          approved Figma designs, and validate your work before opening a pull
          request.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-full bg-[var(--color-ink)] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            href="https://github.com/Lilly-Protocol/lily-frontend/issues"
          >
            Browse open issues
          </Link>
          <Link
            className="rounded-full border border-[var(--color-line)] px-5 py-2 text-sm font-medium hover:border-[var(--color-accent)]"
            href={routes.docs}
          >
            Read the docs
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="surface flex flex-col gap-4 rounded-[1.5rem] p-6">
          <h2 className="text-xl font-semibold">Local setup</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--color-muted)]">
            <li>Use Node.js 22 or newer.</li>
            <li>Install dependencies with `npm install`.</li>
            <li>Start the dev server with `npm run dev`.</li>
            <li>Treat existing UI as scaffold — implement from Figma.</li>
          </ul>
        </div>

        <div className="surface flex flex-col gap-4 rounded-[1.5rem] p-6">
          <h2 className="text-xl font-semibold">Workflow</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-[var(--color-muted)]">
            <li>Create a branch and link it to an issue.</li>
            <li>Keep changes scoped to a single concern.</li>
            <li>Move reusable logic out of route files.</li>
            <li>Update docs when behavior changes.</li>
            <li>Validate locally before requesting review.</li>
          </ol>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Validation checklist</h2>
        <p className="text-sm leading-7 text-[var(--color-muted)]">
          Run these commands before opening a pull request. `npm run check`
          mirrors CI end-to-end and is the fastest way to confirm readiness.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKS.map((check) => (
            <div
              key={check.cmd}
              className="flex items-center justify-between rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-4 py-3 text-sm"
            >
              <span className="font-medium">{check.label}</span>
              <code className="font-mono text-xs text-[var(--color-muted)]">
                {check.cmd}
              </code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Pull request expectations</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--color-muted)]">
          <li>Explain the problem being solved, not only the code that changed.</li>
          <li>Link the related issue and summarize key changes.</li>
          <li>Include screenshots or recordings for UI updates.</li>
          <li>Call out risks, tradeoffs, and intentional follow-up work.</li>
          <li>Complete the PR template so reviewers have full context.</li>
        </ul>
      </section>
    </div>
  );
}
