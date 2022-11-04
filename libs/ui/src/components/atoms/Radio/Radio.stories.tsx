import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Radio } from './Radio';

export default {
  title: 'Atoms/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

// Setting displayName manually since Storybook displays it as [Object, object]
Radio.displayName = 'Radio';

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const AtomRadio = Template.bind({});

AtomRadio.args = {
  id: 'radioGroup',
  radios: [{ value: '2r1', disabled: false, label: 'option 1', id: '2r1Id' }],
};
export const AtomRadioGroup = Template.bind({});

AtomRadioGroup.args = {
  id: 'radioGroup2',
  defaultValue: 'r3',
  radios: [
    { value: 'r1', disabled: false, label: 'Value 1', id: 'r1Id' },
    { value: 'r2', disabled: false, label: 'Value 2', id: 'r2Id' },
    { value: 'r3', disabled: false, label: 'Value 3 (default)', id: 'r3Id' },
    { value: 'r4', disabled: true, label: 'Value 4 (disabled)', id: 'r4Id' },
  ],
};

export const AtomRadioDisabled = Template.bind({});

AtomRadioDisabled.args = {
  id: 'radioGroup3',
  defaultValue: 'r3',
  radios: [
    { value: 'r3', disabled: true, label: 'Value 3 (default)', id: 'r3Id' },
    { value: 'r4', disabled: true, label: 'Value 4', id: 'r4Id' },
    { value: 'r5', disabled: true, label: 'Value 5', id: 'r5Id' },
  ],
};
