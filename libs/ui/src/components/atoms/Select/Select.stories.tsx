import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from './Select';
export default {
  title: 'Atoms/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const BaseSelect = Template.bind({});
BaseSelect.args = {
  options: [
    { name: 'Option 1', value: 'option1' },
    { name: 'Option 2', value: 'option2' },
  ],
};

export const DisabledSelect = Template.bind({});
DisabledSelect.args = {
  options: [
    { name: 'Option 1', value: 'option1' },
    { name: 'Option 2', value: 'option2' },
  ],
  disabled: true,
};

export const LongSelect = Template.bind({});
LongSelect.args = {
  options: [
    { name: 'Option 1', value: 'option1' },
    { name: 'Option 2', value: 'option2' },
  ],
  long: true,
};

export const FullWidthSelect = Template.bind({});
FullWidthSelect.args = {
  options: [
    { name: 'Option 1', value: 'option1' },
    { name: 'Option 2', value: 'option2' },
  ],
  full: true,
};

export const ErrorSelect = Template.bind({});
ErrorSelect.args = {
  options: [
    { name: 'Option 1', value: 'option1' },
    { name: 'Option 2', value: 'option2' },
  ],
  error: {
    type: 'error',
    message: 'This is an error message',
  },
};

export const WarningSelect = Template.bind({});
WarningSelect.args = {
  options: [
    { name: 'Option 1', value: 'option1' },
    { name: 'Option 2', value: 'option2' },
  ],
  warning: {
    type: 'warning',
    message: 'This is an error message',
  },
};
