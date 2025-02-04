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
      options: [
        'link',
        'white',
        'white-outlined',
        'primary',
        'primary-dark',
        'primary-outlined',
        'secondary',
        'secondary-outlined',
        'warning',
        'error',
      ],
    },
    isLoading: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'link'],
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

export const PrimaryDark: Story = {
  args: {
    children: 'Primary Dark Button',
    variant: 'primary-dark',
    Icon: <GrCart />,
    isLoading: false,
  },
};

export const PrimaryOutlined: Story = {
  args: {
    children: 'Primary Outlined',
    variant: 'primary-outlined',
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

export const SecondaryOutlined: Story = {
  args: {
    children: 'Secondary Outlined',
    variant: 'secondary-outlined',
    Icon: <GrCart />,
    isLoading: false,
  },
};

export const White: Story = {
  args: {
    children: 'White Button',
    variant: 'white',
    Icon: <GrCart />,
    isLoading: false,
  },
};

export const WhiteOutlined: Story = {
  args: {
    children: 'White Outlined',
    variant: 'white-outlined',
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

export const Error: Story = {
  args: {
    children: 'Error Button',
    variant: 'error',
    Icon: <GrCart />,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    variant: 'primary',
    Icon: <GrCart />,
    isLoading: true,
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    Icon: <GrCart />,
    type: 'link',
    href: '#',
  },
};
