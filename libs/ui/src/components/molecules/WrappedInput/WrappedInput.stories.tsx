import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WrappedInput } from './WrappedInput';
import { useFormContext } from 'react-hook-form';
import { H3 } from '../../atoms/Typography';

export default {
  title: 'Molecules/Form/WrappedInput',
  component: WrappedInput,
} as ComponentMeta<typeof WrappedInput>;

const Template: ComponentStory<typeof WrappedInput> = (args) => {
  const { watch } = useFormContext();
  const value = watch();

  return (
    <div style={{ margin: '4rem' }}>
      <WrappedInput {...args} />
      <H3>{value[args.id] || 'Input text will appear here'}</H3>
    </div>
  );
};

export const FullWrappedInput = Template.bind({});
FullWrappedInput.args = {
  id: 'example',
  label: 'Complete Input',
  placeholder: 'placeholder',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  number: false,
  address: false,
  long: false,
  full: false,
  warning: undefined,
  error: undefined,
  success: undefined,
};
