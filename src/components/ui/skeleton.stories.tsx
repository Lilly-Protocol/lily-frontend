import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton, SkeletonCard, SkeletonText } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: { variant: "text" },
};

export const Avatar: Story = {
  args: { variant: "avatar" },
};

export const Card: Story = {
  args: { variant: "card" },
};

export const LoadingText: Story = {
  render: () => <SkeletonText lines={4} className="max-w-xl" />,
};

export const LoadingCard: Story = {
  render: () => <SkeletonCard className="max-w-xl" />,
};
