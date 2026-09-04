"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";

import type { Agent, AgentStatus } from "./types";

type StatusFilter = "all" | AgentStatus;

const STATUS_FILTERS: readonly { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "registered", label: "Registered" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
];

const STATUS_BADGE_CLASS: Record<AgentStatus, string> = {
  registered:
    "border-[var(--color-line)] bg-[var(--color-panel-muted)] text-[var(--color-muted)]",
  active:
    "border-[var(--color-accent)] bg-[var(--color-panel-muted)] text-[var(--color-accent)]",
  paused:
    "border-[var(--color-line)] bg-transparent text-[var(--color-muted)]",
};

type AgentsExplorerProps = {
  readonly agents: readonly Agent[];
};

export function AgentsExplorer({ agents }: AgentsExplorerProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const visibleAgents = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return agents.filter((agent) => {
      const matchesStatus =
        statusFilter === "all" || agent.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (needle.length === 0) {
        return true;
      }

      return (
        agent.name.toLowerCase().includes(needle) ||
        agent.description.toLowerCase().includes(needle)
      );
    });
  }, [agents, query, statusFilter]);

  return (
    <section aria-label="Agent registry explorer" className="mt-8">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex min-w-56 flex-col gap-1">
          <label
            className="text-sm font-medium text-[var(--color-ink)]"
            htmlFor="agents-search"
          >
            Search agents
          </label>
          <input
            className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel-solid)] px-4 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            id="agents-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or description"
            type="search"
            value={query}
          />
        </div>

        <div
          aria-label="Filter by status"
          className="flex flex-wrap gap-2"
          role="group"
        >
          {STATUS_FILTERS.map((filter) => {
            const selected = statusFilter === filter.value;

            return (
              <button
                aria-pressed={selected}
                className={
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] motion-reduce:transition-none " +
                  (selected
                    ? "border-[var(--color-accent)] bg-[var(--color-panel-muted)] text-[var(--color-accent)]"
                    : "border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-accent)]")
                }
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <p
        aria-live="polite"
        aria-atomic="true"
        className="mt-4 text-sm text-[var(--color-muted)]"
      >
        Showing {visibleAgents.length} of {agents.length} agents
      </p>

      {visibleAgents.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            action={
              <button
                className="rounded-full border border-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-panel-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] motion-reduce:transition-none"
                onClick={() => {
                  setQuery("");
                  setStatusFilter("all");
                }}
                type="button"
              >
                Clear filters
              </button>
            }
            description="No agents match the current search and status filters. Adjust or clear the filters to see the full registry."
            icon={
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            }
            title="No agents match your filters"
          />
        </div>
      ) : (
        <ul className="mt-6 grid gap-3">
          {visibleAgents.map((agent) => (
            <li key={agent.id}>
              <Link
                className="block rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel-muted)] px-5 py-4 transition-colors hover:border-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] motion-reduce:transition-none"
                href={`/app/agents/${agent.id}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-base font-semibold text-[var(--color-ink)]">
                    {agent.name}
                  </span>
                  <span
                    className={
                      "rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide " +
                      STATUS_BADGE_CLASS[agent.status]
                    }
                  >
                    {agent.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {agent.description}
                </p>
                <p className="mt-2 font-mono text-xs text-[var(--color-muted)]">
                  {agent.id} · {agent.tasksCompleted} tasks completed
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
