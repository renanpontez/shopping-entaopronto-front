import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput } from '@/components/SelectInput';

const meta: Meta<typeof SelectInput> = {
  title: 'Components/SelectInput',
  component: SelectInput,
  tags: ['autodocs'],
  argTypes: {
    options: {

      control: { type: 'object' },
      description: 'Array of options to be displayed in the select',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    setState: {
      action: 'selected',
      description: 'Callback function when an option is selected',
    },
  },

};
export default meta;
type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    placeholder: 'Select an option',
    setState: (option: string) => (option),
  },
};

export const WithManyOptions: Story = {
  args: {
    options: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7',
      'Option 8',
      'Option 9',
      'Option 10',
    ],
    placeholder: 'Select from many options',
    setState: (option: string) => (option),
  },
};

export const Empty: Story = {
  args: {
    options: [],
    placeholder: 'No options available',
    setState: (option: string) => (option),
  },
};
