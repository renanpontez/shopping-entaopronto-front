import type { Meta, StoryObj } from '@storybook/react';
import { GrSearch } from 'react-icons/gr';
import { Input } from '../components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'textArea', 'search'],
    },
    isInvalid: { control: 'boolean' },
    value: { control: 'text' },
    icon: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['white-outlined', 'secondary-outlined'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    value: '',
    variant: 'white-outlined',
    onChange: () => {},
  },
};

export const SecondaryOutlined: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    value: '',
    variant: 'secondary-outlined',
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    value: '',
    isInvalid: true,
    onChange: () => {},
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    value: '',
    onChange: () => {},
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    placeholder: 'Enter your age',
    type: 'number',
    value: '',
    onChange: () => {},
  },
};

export const Search: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search products...',
    type: 'search',
    value: '',
    icon: <GrSearch />,
    onChange: () => {},
    variant: 'secondary-outlined',
  },
};
