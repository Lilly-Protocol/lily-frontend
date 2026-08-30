import { notFound } from "next/navigation";
import { PageScaffold } from "@/components/scaffold/page-scaffold";
import { getRouteScaffold } from "@/config/routes";

const AGENT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
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
