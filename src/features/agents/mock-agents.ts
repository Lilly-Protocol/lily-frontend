import type { Agent } from "./types";

/**
 * Mock dataset backing the Agents Registry list view until the real
 * registry API is wired up. IDs follow the `/app/agents/[id]` detail
 * route so every row can link into its detail view.
 */
export const MOCK_AGENTS: readonly Agent[] = [
  {
    id: "agent-001",
    name: "Atlas Indexer",
    description: "Crawls and indexes on-chain registry events every epoch.",
    status: "active",
    tasksCompleted: 1284,
  },
  {
    id: "agent-002",
    name: "Beacon Sentinel",
    description: "Watches validator health and escalates anomalies.",
    status: "active",
    tasksCompleted: 942,
  },
  {
    id: "agent-003",
    name: "Cartographer",
    description: "Maps new protocol deployments into the registry graph.",
    status: "paused",
    tasksCompleted: 311,
  },
  {
    id: "agent-004",
    name: "Delta Swapper",
    description: "Executes routed swaps across configured liquidity venues.",
    status: "registered",
    tasksCompleted: 0,
  },
  {
    id: "agent-005",
    name: "Echo Relayer",
    description: "Relays signed messages between supported chains.",
    status: "active",
    tasksCompleted: 2077,
  },
  {
    id: "agent-006",
    name: "Fathom Auditor",
    description: "Runs scheduled risk audits over registered agents.",
    status: "paused",
    tasksCompleted: 456,
  },
];
