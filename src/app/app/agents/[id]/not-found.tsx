import Link from "next/link";

export default function AgentNotFound() {
  return (
    <main className="surface rounded-[1.75rem] p-8 sm:p-10">
      <p className="eyebrow text-[var(--color-accent)]">dashboard</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Agent not found
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
        The agent ID is missing or invalid. Check the address, or return to the
        agents list to choose an available agent.
      </p>
      <Link
        href="/app/agents"
        className="mt-8 inline-flex rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-4 py-3 font-medium text-[var(--color-accent)]"
      >
        View all agents
      </Link>
    </main>
  );
}
