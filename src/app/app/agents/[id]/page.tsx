import { PageScaffold } from '@/components/scaffold/page-scaffold';
import { getRouteScaffold } from '@/config/routes';

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PageScaffold route={getRouteScaffold('agent-detail')} dynamicLabel={`/app/agents/${id}`} />
  );
}
