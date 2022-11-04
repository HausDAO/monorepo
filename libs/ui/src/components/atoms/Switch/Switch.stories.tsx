import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Switch } from './Switch';

export default {
  title: 'Atoms/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

// Setting displayName manually since Storybook displays it as [Object, object]
Switch.displayName = 'Switch';

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const AtomSwitch = Template.bind({});

AtomSwitch.args = {
  id: 'switchOff',
  fieldLabel: 'Default Unchecked Switch',
  defaultOn: false,
};

export const AtomSwitchOn = Template.bind({});

AtomSwitchOn.args = {
  id: 'switchOn',
  fieldLabel: 'Default Checked Switch',
  defaultOn: true,
};

export const SwitchDisabled = Template.bind({});
SwitchDisabled.args = {
  id: 'switchDisabledOn',
  fieldLabel: 'Disabled Unchecked Switch',
  disabled: true,
  defaultOn: false,
};

export const SwitchDisabledOn = Template.bind({});
SwitchDisabledOn.args = {
  id: 'switchDisabledOff',
  fieldLabel: 'Disabled Checked Switch',
  disabled: true,
  defaultOn: true,
};
