import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  args: {
    children: "Click me",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { variant: "default", size: "default" } };
export const Primary: Story = {
  args: { variant: "default", size: "lg" },
};
export const Secondary: Story = {
  args: { variant: "secondary", size: "default" },
};
export const Destructive: Story = {
  args: { variant: "destructive", size: "default" },
};
export const Ghost: Story = {
  args: { variant: "ghost", size: "default" },
};
export const Link: Story = {
  args: { variant: "link", size: "default" },
};
export const Outline: Story = {
  args: { variant: "outline", size: "default" },
};
