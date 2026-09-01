import type { Meta, StoryObj } from "@storybook/react";
import { SectionNav } from "./section-nav";
import { routeScaffolds } from "@/config/routes";

const meta: Meta<typeof SectionNav> = {
  title: "Scaffold/SectionNav",
  component: SectionNav,
  args: { routes: routeScaffolds.filter((r) => r.section === "marketing").slice(0, 5) },
};
export default meta;

type Story = StoryObj<typeof SectionNav>;

export const MarketingRoutes: Story = {};
export const EmptyRoutes: Story = { args: { routes: [] } };
