import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WrappedCheckbox } from './WrappedCheckbox';

export default {
  title: 'Molecules/Form/WrappedCheckbox',
  component: WrappedCheckbox,
} as ComponentMeta<typeof WrappedCheckbox>;

const Template: ComponentStory<typeof WrappedCheckbox> = (args) => {
  return (
    <div style={{ margin: '4rem' }}>
      <WrappedCheckbox {...args} />
    </div>
  );
};

export const FullWrappedCheckbox = Template.bind({});
FullWrappedCheckbox.args = {
  id: 'exampleCheckbox',
  label: 'Complete Input',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  checkboxes: [
    {
      id: 'exampleCheckbox',
      title: 'completeInput',
      name: 'test0',
      defaultChecked: false,
      disabled: false,
      required: false,
    },
  ],
};

export const MultipleWrappedCheckbox = Template.bind({});
MultipleWrappedCheckbox.args = {
  id: 'multipleCheckboxId',
  label: 'Multiple Checkboxes',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  checkboxes: [
    {
      id: 'childCheckboxId1',
      title: 'Checkbox 1',
      name: 'checkbox1',
      defaultChecked: false,
      disabled: false,
      required: true,
    },
    {
      id: 'childCheckboxId2',
      title: 'Checkbox 2',
      name: 'checkbox2',
      defaultChecked: true,
      disabled: false,
      required: false,
    },
    {
      id: 'childCheckboxId3',
      title: 'Checkbox 3',
      name: 'checkbox3',
      defaultChecked: false,
      disabled: true,
      required: false,
    },
  ],
};
