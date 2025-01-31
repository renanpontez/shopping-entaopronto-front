import type { Meta, StoryObj } from '@storybook/react';
import { GrCart } from 'react-icons/gr';

import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['Link', 'white', 'primary', 'secondary', 'warning', 'error'],
    },
    outLine: {
      control: 'boolean',
    },
    Loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    color: 'primary',
    Icon: <GrCart />,
    Loading: false,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    color: 'secondary',
    Icon: <GrCart />,
    Loading: false,
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    color: 'warning',
    Icon: <GrCart />,
    Loading: false,
  },
};

export const OutlinePrimary: Story = {
  args: {
    children: 'Outline Primary',
    color: 'primary',
    outLine: true,
    Icon: <GrCart />,
    Loading: false,
  },
};

export const LoadingState: Story = {
  args: {
    children: 'Loading Button',
    color: 'primary',
    Icon: <GrCart />,
    Loading: true,
  },
};

export const LinkButton: Story = {
  args: {
    children: 'Link Button',
    color: 'Link',
    Icon: <GrCart />,
    Loading: false,
  },
};
