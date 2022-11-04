import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WrappedTextArea } from './WrappedTextArea';
import { useFormContext } from 'react-hook-form';
import { H5 } from '../../atoms/Typography';

export default {
  title: 'Molecules/Form/WrappedTextArea',
  component: WrappedTextArea,
} as ComponentMeta<typeof WrappedTextArea>;

const Template: ComponentStory<typeof WrappedTextArea> = (args) => {
  const { watch } = useFormContext();
  const value = watch();

  return (
    <div style={{ margin: '4rem' }}>
      <WrappedTextArea {...args} />
      <H5>{value[args.id] || 'Textarea will appear here'}</H5>
    </div>
  );
};

export const FullWrappedTextArea = Template.bind({});
FullWrappedTextArea.args = {
  id: 'example',
  label: 'Complete TextArea',
  placeholder: 'Placeholder...',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  full: false,
  warning: undefined,
  error: undefined,
  success: undefined,
};
