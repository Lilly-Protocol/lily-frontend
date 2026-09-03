import Link from 'next/link';

export default function AgentNotFound() {
  return (
    <main className="min-h-[60vh] bg-(--color-surface) px-4 py-16 text-(--color-ink) sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col justify-center">
        <p className="eyebrow text-(--color-accent)">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Agent not found</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-(--color-muted)">
          The agent ID you requested does not exist or is no longer available. Please check the URL
          or browse the agents directory.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <Link
            className="rounded-full border border-(--color-line) bg-(--color-panel-muted) px-5 py-3 hover:border-(--color-accent)"
            href="/app/agents"
          >
            Browse all agents
          </Link>
        </div>
      </div>
    </main>
  );
}
