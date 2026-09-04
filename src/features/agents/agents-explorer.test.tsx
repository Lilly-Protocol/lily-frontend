import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AgentsPage from "@/app/app/agents/page";
import { AgentsExplorer } from "./agents-explorer";
import { MOCK_AGENTS } from "./mock-agents";

describe("AgentsExplorer", () => {
  it("renders every mock agent as a row with an accessible status badge and a detail link", () => {
    render(<AgentsExplorer agents={MOCK_AGENTS} />);

    for (const agent of MOCK_AGENTS) {
      const link = screen.getByRole("link", { name: new RegExp(agent.name, "i") });
      expect(link).toHaveAttribute("href", `/app/agents/${agent.id}`);
      expect(
        within(link).getByText(agent.status, { exact: false }),
      ).toBeInTheDocument();
    }

    expect(
      screen.getByText(`Showing ${MOCK_AGENTS.length} of ${MOCK_AGENTS.length} agents`),
    ).toBeInTheDocument();
  });

  it("filters rows by status and updates the live region count", async () => {
    const user = userEvent.setup();
    render(<AgentsExplorer agents={MOCK_AGENTS} />);

    await user.click(
      screen.getByRole("button", { name: "Active" }),
    );

    const activeCount = MOCK_AGENTS.filter((a) => a.status === "active").length;
    expect(screen.getByText(`Showing ${activeCount} of ${MOCK_AGENTS.length} agents`)).toBeInTheDocument();
    expect(screen.queryByText("Cartographer")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /atlas indexer/i })).toBeInTheDocument();
  });

  it("narrows rows by search text and shows the empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<AgentsExplorer agents={MOCK_AGENTS} />);

    await user.type(
      screen.getByLabelText("Search agents"),
      "relays signed messages",
    );

    expect(screen.getByText("Showing 1 of 6 agents")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /echo relayer/i })).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search agents"), "zzz");

    expect(screen.getByRole("button", { name: /^all$/i })).toBeInTheDocument();
    expect(screen.getByText("No agents match your filters")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /clear filters/i }));

    expect(
      screen.getByText(`Showing ${MOCK_AGENTS.length} of ${MOCK_AGENTS.length} agents`),
    ).toBeInTheDocument();
    expect(screen.queryByText("No agents match your filters")).not.toBeInTheDocument();
  });
});

describe("AgentsPage", () => {
  it("renders exactly one h1 with the registry title", () => {
    render(<AgentsPage />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Agents Registry");
  });
});
