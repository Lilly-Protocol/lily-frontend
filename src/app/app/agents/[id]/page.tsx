import { PageScaffold } from "@/components/scaffold/page-scaffold";
import { getRouteScaffold } from "@/config/routes";
import { notFound } from "next/navigation";

// Agent IDs are canonical UUIDs: 8-4-4-4-12 hexadecimal characters.
const AGENT_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;

  if (!id || !AGENT_ID_PATTERN.test(id)) {
    notFound();
  }

  return (
    <PageScaffold
      route={getRouteScaffold("agent-detail")}
      dynamicLabel={`/app/agents/${id}`}
    />
  );
}
