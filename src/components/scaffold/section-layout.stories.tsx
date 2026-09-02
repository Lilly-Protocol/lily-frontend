import type { Meta, StoryObj } from "@storybook/react";
import { SectionLayout } from "./section-layout";
import { routeScaffolds, sectionDefinitions } from "@/config/routes";

const marketingDef = sectionDefinitions.find((s) => s.key === "marketing")!;
const marketingRoutes = routeScaffolds.filter((r) => r.section === "marketing");

const meta: Meta<typeof SectionLayout> = {
  title: "Scaffold/SectionLayout",
  component: SectionLayout,
  args: {
    title: marketingDef.label,
    description: marketingDef.description,
    routes: marketingRoutes,
  },
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof SectionLayout>;

export const Marketing: Story = {
  args: { children: <div className="surface rounded-2xl p-8 text-center text-[var(--color-muted)]">Page content area</div> },
};
