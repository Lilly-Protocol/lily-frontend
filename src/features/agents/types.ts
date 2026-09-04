export type AgentStatus = "registered" | "active" | "paused";

export type Agent = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly status: AgentStatus;
  readonly tasksCompleted: number;
};
