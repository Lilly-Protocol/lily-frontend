import { render, screen, within } from "@testing-library/react";

import { CareersContent } from "./careers-content";
import { cultureSections, openRoles } from "./mock-roles";
import type { OpenRole } from "./types";

const role: OpenRole = {
  id: "test-role",
  title: "Senior Protocol Engineer",
  team: "Protocol",
  location: "Remote (GMT-3 to GMT+3)",
  locationType: "Hybrid",
  applyHref: "mailto:careers@lilyprotocol.dev?subject=Senior%20Protocol%20Engineer",
};

describe("CareersContent", () => {
  it("renders exactly one <h1> for the page", () => {
    render(<CareersContent culture={cultureSections} roles={openRoles} />);

    expect(screen.getByRole("heading", { level: 1, name: "Careers" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders the culture and values sections", () => {
    render(<CareersContent culture={cultureSections} roles={openRoles} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Culture and values" }),
    ).toBeInTheDocument();

    for (const section of cultureSections) {
      expect(
        screen.getByRole("heading", { level: 3, name: section.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(section.body)).toBeInTheDocument();
    }
  });

  it("renders a role's title, team, location type, and application link", () => {
    render(<CareersContent culture={cultureSections} roles={[role]} />);

    expect(
      screen.getByRole("heading", { level: 3, name: role.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${role.team} · ${role.location}`),
    ).toBeInTheDocument();
    expect(screen.getByText(role.locationType)).toBeInTheDocument();

    const applyLink = screen.getByRole("link", {
      name: `Apply for this role: ${role.title}`,
    });
    expect(applyLink).toHaveAttribute("href", role.applyHref);
  });

  it("renders every mock role in the open roles list", () => {
    render(<CareersContent culture={cultureSections} roles={openRoles} />);

    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(openRoles.length);

    for (const openRole of openRoles) {
      expect(
        within(list).getByRole("heading", { level: 3, name: openRole.title }),
      ).toBeInTheDocument();
    }
  });

  it("renders the EmptyState instead of a list when no roles are open", () => {
    render(<CareersContent culture={cultureSections} roles={[]} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Nothing open at the moment" }),
    ).toBeInTheDocument();
    expect(screen.getByText("No open roles")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "careers@lilyprotocol.dev" })).toHaveAttribute(
      "href",
      "mailto:careers@lilyprotocol.dev",
    );

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.queryByText(role.title)).not.toBeInTheDocument();
  });

  it("still renders one <h1> in the empty-state variant", () => {
    render(<CareersContent culture={cultureSections} roles={[]} />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("omits the culture section when no culture content is provided", () => {
    render(<CareersContent roles={openRoles} />);

    expect(
      screen.queryByRole("heading", { name: "Culture and values" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Careers" })).toBeInTheDocument();
  });
});
