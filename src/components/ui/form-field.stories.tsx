import type { Meta, StoryObj } from "@storybook/react";

import { FormField } from "./form-field";

const meta: Meta<typeof FormField> = {
  title: "UI/FormField",
  component: FormField,
  parameters: { layout: "padded" },
  args: {
    label: "Agent name",
    placeholder: "Research assistant",
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: "Use a short, descriptive name.",
  },
};

export const Error: Story = {
  args: {
    defaultValue: "a",
    error: "Name must be at least 3 characters.",
  },
};

export const MultipleErrors: Story = {
  args: {
    defaultValue: "?",
    error: ["Name must be at least 3 characters.", "Use letters, numbers, spaces, or hyphens."],
  },
};
