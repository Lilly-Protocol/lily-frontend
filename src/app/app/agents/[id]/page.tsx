import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageScaffold } from '@/components/scaffold/page-scaffold';
import { getRouteScaffold } from '@/config/routes';
import { siteConfig } from '@/config/site';

/**
 * Agent ids are either seeded demo agents (agentlily_demo_<n>) or UUIDs.
 * Anything else 404s.
 */
const AGENT_ID_PATTERN =
  /^(agentlily_demo_\d+|agent-\d+|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

const SEEDED_DEMO_AGENTS = [{ id: 'agentlily_demo_001' }] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return SEEDED_DEMO_AGENTS.map(({ id }) => ({ id }));
}

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id || !AGENT_ID_PATTERN.test(id)) {
    notFound();
  }

  return (
    <PageScaffold route={getRouteScaffold('agent-detail')} dynamicLabel={`/app/agents/${id}`} />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const route = getRouteScaffold("agent-detail");
  const title = `${route.title}: ${id}`;
  const description = `${route.purpose} (agent: ${id})`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteConfig.name,
      url: new URL(route.path.replace("[id]", id), siteConfig.url).toString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
