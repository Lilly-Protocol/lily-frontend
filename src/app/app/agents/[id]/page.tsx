import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageScaffold } from "@/components/scaffold/page-scaffold";
import { getRouteScaffold } from "@/config/routes";
import { siteConfig } from "@/config/site";

const AGENT_ID_PATTERN = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}|agentlily_demo_001)$/;

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "agentlily_demo_001" }];
}

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const route = getRouteScaffold("agent-detail");
  const title = `Agent Detail View: ${id}`;
  const description = `${route.purpose} for ${id}`;

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
