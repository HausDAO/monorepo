import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from './Input';
import { RiSearchLine } from 'react-icons/ri/index.js';

export default {
  title: 'Atoms/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

// Setting displayName manually since Storybook displays it as [Object, object]
Input.displayName = 'Input';

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const AtomInput = Template.bind({});

AtomInput.args = {
  placeholder: 'Placeholder',
};

export const InputWithIcon = Template.bind({});
InputWithIcon.args = {
  placeholder: 'Placeholder',
  icon: RiSearchLine,
  full: false,
};

export const InputDisabled = Template.bind({});
InputDisabled.args = {
  placeholder: 'Disabled',
  disabled: true,
};

export const InputSuccess = Template.bind({});
InputSuccess.args = {
  placeholder: 'Success',
  success: {
    type: 'success',
    message: 'This should not be visible',
  },
};

export const InputWarning = Template.bind({});
InputWarning.args = {
  placeholder: 'Warning',
  warning: {
    type: 'warning',
    message: 'This should not be visible',
  },
};

export const InputError = Template.bind({});
InputError.args = {
  placeholder: 'Error',
  error: {
    type: 'error',
    message: 'This should not be visible',
  },
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  placeholder: '0123456789',
  number: true,
};
export const LongInput = Template.bind({});
LongInput.args = {
  placeholder: '52rem',
  long: true,
};
export const FullWidthInput = Template.bind({});
FullWidthInput.args = {
  placeholder: '100% of container',
  full: true,
};
export const AddressInput = Template.bind({});
AddressInput.args = {
  placeholder: '0x',
  address: true,
};
