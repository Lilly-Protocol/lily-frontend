import type { Meta, StoryObj } from "@storybook/react";

import { Accordion, AccordionItem } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  args: { children: null },
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

function AccordionExample({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <Accordion className="max-w-2xl">
      <AccordionItem title="What is Lilly?" defaultOpen={defaultOpen}>
        Lilly provides infrastructure for building and operating autonomous agents.
      </AccordionItem>
      <AccordionItem title="Can I use it with my existing workflow?">
        Yes. The shared primitives are designed to compose with the rest of the application.
      </AccordionItem>
    </Accordion>
  );
}

export const Closed: Story = {
  render: () => <AccordionExample />,
};

export const Open: Story = {
  render: () => <AccordionExample defaultOpen />,
};

export const Empty: Story = {
  render: () => <Accordion>{null}</Accordion>,
};
