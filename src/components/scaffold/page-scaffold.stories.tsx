import type { Meta, StoryObj } from "@storybook/react";
import { PageScaffold } from "./page-scaffold";
import { routeScaffolds } from "@/config/routes";

const landingRoute = routeScaffolds.find((r) => r.id === "landing")!;

const meta: Meta<typeof PageScaffold> = {
  title: "Scaffold/PageScaffold",
  component: PageScaffold,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof PageScaffold>;

export const Landing: Story = { args: { route: landingRoute } };
export const WithDynamicLabel: Story = {
  args: { route: landingRoute, dynamicLabel: "/app/agents/abc123" },
};
