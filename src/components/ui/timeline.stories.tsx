import type { Meta, StoryObj } from "@storybook/react";

import { Timeline, TimelineItem } from "./timeline";

const meta: Meta<typeof Timeline> = {
  title: "UI/Timeline",
  component: Timeline,
  args: { children: null },
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline className="max-w-2xl">
      <TimelineItem date="Today" title="Agent created">
        The agent profile and runtime configuration were initialized.
      </TimelineItem>
      <TimelineItem date="Yesterday" title="Wallet connected">
        A payout wallet was connected to the account.
      </TimelineItem>
    </Timeline>
  ),
};

export const WithStatuses: Story = {
  render: () => (
    <Timeline className="max-w-2xl">
      <TimelineItem date="10:30" title="Deployment started" status="Running">
        The new agent version is being deployed.
      </TimelineItem>
      <TimelineItem date="10:21" title="Checks completed" status="Passed">
        Validation completed successfully.
      </TimelineItem>
    </Timeline>
  ),
};

export const Empty: Story = {
  render: () => <Timeline>{null}</Timeline>,
};
