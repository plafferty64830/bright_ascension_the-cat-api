import type { Meta, StoryObj } from "@storybook/react";
import { CatCard } from "./CatCard";

const meta: Meta<typeof CatCard> = {
  title: "Components/CatCard",
  component: CatCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    url: { control: "text" },
    filename: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
    isFavourite: { control: "boolean" },
    votes: { control: "number" },
  },
};

export default meta;

type Story = StoryObj<typeof CatCard>;

const defaultArgs = {
  url: "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg",
  filename: "cute-cat.jpg",
  width: 500,
  height: 333,
  isFavourite: false,
  favouriteId: 0,
  votes: 5,
  id: "abc-123",
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const Favourited: Story = {
  args: {
    ...defaultArgs,
    isFavourite: true,
    favouriteId: 42,
  },
};

export const HighVotes: Story = {
  args: {
    ...defaultArgs,
    votes: 124,
  },
};

export const PortraitImage: Story = {
  args: {
    ...defaultArgs,
    width: 400,
    height: 600,
  },
};

export const SquareImage: Story = {
  args: {
    ...defaultArgs,
    width: 500,
    height: 500,
  },
};