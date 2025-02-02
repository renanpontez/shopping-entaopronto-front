import type { Meta, StoryObj } from '@storybook/react';
import { GrCart } from 'react-icons/gr';

import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['link', 'white', 'primary', 'secondary', 'warning', 'error'],
    },
    isOutlined: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    Icon: <GrCart />,
    isLoading: false,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    Icon: <GrCart />,
    isLoading: false,
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    variant: 'warning',
    Icon: <GrCart />,
    isLoading: false,
  },
};

export const OutlinedPrimary: Story = {
  args: {
    children: 'Outlined Primary',
    variant: 'primary',
    isOutlined: true,
    Icon: <GrCart />,
    isLoading: false,
  },
};

export const LoadingState: Story = {
  args: {
    children: 'Loading Button',
    variant: 'primary',
    Icon: <GrCart />,
    isLoading: true,
  },
};

export const LinkButton: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    Icon: <GrCart />,
    isLoading: false,
  },
};
