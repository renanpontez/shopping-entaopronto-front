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
    onOptionSelected: {
      action: 'selected',
      description: 'Callback function when an option is selected',
    },
  },

};
export default meta;
type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
      { label: 'Option 4', value: 'option4' },
    ],
    placeholder: 'Select an option',
    onOptionSelected: (option: string) => (option),
  },
};

export const WithManyOptions: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
      { label: 'Option 4', value: 'option4' },
    ],
    placeholder: 'Select from many options',
    onOptionSelected: (option: string) => (option),
  },
};

export const Empty: Story = {
  args: {
    options: [],
    placeholder: 'No options available',
    onOptionSelected: (option: string) => (option),
  },
};
