import Link from "next/link";

export default function AgentNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
        Agent not found
      </h1>
      <p className="max-w-md text-lg text-slate-600 dark:text-slate-400">
        The agent ID you requested does not exist or is no longer available.
        Please check the URL or browse the agents directory.
      </p>
      <Link
        href="/app/agents"
        className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-6 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Browse all agents
      </Link>
    </div>
  );
}
