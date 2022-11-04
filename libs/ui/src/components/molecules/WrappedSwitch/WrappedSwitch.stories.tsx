import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WrappedSwitch } from './WrappedSwitch';

export default {
  title: 'Molecules/Form/WrappedSwitch',
  component: WrappedSwitch,
} as ComponentMeta<typeof WrappedSwitch>;

const Template: ComponentStory<typeof WrappedSwitch> = (args) => {
  return (
    <div style={{ margin: '4rem' }}>
      <WrappedSwitch {...args} />
    </div>
  );
};

export const FullWrappedSwitch = Template.bind({});
FullWrappedSwitch.args = {
  id: 'exampleSwitch',
  label: 'Wrapped Switch',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  switches: [
    {
      id: 'exampleSwitch',
      defaultChecked: false,
      disabled: false,
      fieldLabel: 'Check this switch',
    },
  ],
};

export const SecondWrappedSwitch = Template.bind({});
SecondWrappedSwitch.args = {
  id: 'wrappedSwitch',
  label: 'Wrapped Disabled Switch',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  switches: [
    {
      id: 'childSwitchId1',
      name: 'switch1',
      fieldLabel: 'Switch 1',
      defaultChecked: true,
      disabled: true,
    },
    {
      id: 'childSwitchId2',
      name: 'switch2',
      fieldLabel: 'Switch 2',
      defaultChecked: true,
      disabled: false,
    },
    {
      id: 'childSwitchId3',
      name: 'switch3',
      fieldLabel: 'Switch 3',
      defaultChecked: false,
      disabled: false,
    },
  ],
};
