import type { Meta, StoryObj } from "@storybook/react";

import { EmptyState } from "./empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
  args: {
    icon: <span aria-hidden="true">✦</span>,
    title: "Nothing here yet",
    description: "Create your first item to get started.",
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Empty: Story = {};

export const WithEyebrow: Story = {
  args: {
    eyebrow: "Getting started",
  },
};

export const WithAction: Story = {
  args: {
    action: (
      <button
        type="button"
        className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
      >
        Create item
      </button>
    ),
  },
};
