import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Checkbox } from './Checkbox';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(args.defaultChecked);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={() => setChecked(!checked)}
      {...args}
    />
  );
};

export const CheckboxAtom = Template.bind({});
CheckboxAtom.args = {
  id: 'Sample Checkbox Id',
  title: 'Sample Checkbox',
  defaultChecked: false,
  disabled: false,
  required: false,
};

export const CheckboxAtomChecked = Template.bind({});
CheckboxAtomChecked.args = {
  id: 'checked Checkbox Id',
  title: 'Checked Checkbox',
  defaultChecked: true,
};

export const CheckboxAtomDisabled = Template.bind({});
CheckboxAtomDisabled.args = {
  id: 'disabledCheckboxId',
  title: 'Disabled Checkbox',
  disabled: true,
};

export const CheckboxAtomRequired = Template.bind({});
CheckboxAtomRequired.args = {
  id: 'requiredCheckboxId',
  title: 'Required Checkbox',
  required: true,
};
