import type { Metadata } from "next";

import { PageScaffold } from "@/components/scaffold/page-scaffold";
import { getRouteScaffold } from "@/config/routes";

export function generateStaticParams() {
  // Placeholder ids for static prerendering; replace with real agent list later.
  return [{ id: "placeholder" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const scaffold = getRouteScaffold("agent-detail");

  return {
    title: `${scaffold.title} — ${id}`,
    description: scaffold.purpose,
  };
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PageScaffold
      route={getRouteScaffold("agent-detail")}
      dynamicLabel={`/app/agents/${id}`}
    />
  );
}
