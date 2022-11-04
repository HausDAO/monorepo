import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WrappedFileInput } from './WrappedFileInput';

export default {
  title: 'Molecules/Form/WrappedFileInput',
  component: WrappedFileInput,
} as ComponentMeta<typeof WrappedFileInput>;

const Template: ComponentStory<typeof WrappedFileInput> = (args) => {
  return (
    <div style={{ margin: '4rem' }}>
      <WrappedFileInput {...args} />
    </div>
  );
};

export const FullWrappedFileInput = Template.bind({});
FullWrappedFileInput.args = {
  id: 'example',
  label: 'Complete Input',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  warning: undefined,
  error: undefined,
  success: undefined,
  accept: 'image/png, image/jpeg',
  multiple: false,
};
