import type { Meta, StoryObj } from "@storybook/react";

import { CopyButton } from "./CopyButton";

const meta: Meta<typeof CopyButton> = {
  title: "UI/CopyButton",
  component: CopyButton,
  parameters: { layout: "padded" },
  args: {
    text: "LILLY_AGENT_ID_123",
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {};

export const CustomLabels: Story = {
  args: {
    label: "Copy agent ID",
    copiedLabel: "Agent ID copied!",
  },
};

export const EmptyValue: Story = {
  args: {
    text: "",
    label: "Copy empty value",
  },
};
