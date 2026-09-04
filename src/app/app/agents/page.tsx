import type { Metadata } from "next";

import { getRouteScaffold } from "@/config/routes";
import { AgentsExplorer } from "@/features/agents/agents-explorer";
import { MOCK_AGENTS } from "@/features/agents/mock-agents";
import { createScaffoldMetadata } from "@/features/scaffold/page-factory";

export const metadata: Metadata = createScaffoldMetadata("agents");

export default function AgentsPage() {
  const route = getRouteScaffold("agents");

  return (
    <main className="surface rounded-[1.75rem] p-8 sm:p-10">
      <p className="eyebrow text-(--color-accent)">{route.section}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        {route.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-(--color-muted)">
        {route.purpose}
      </p>

      <AgentsExplorer agents={MOCK_AGENTS} />
    </main>
  );
}
