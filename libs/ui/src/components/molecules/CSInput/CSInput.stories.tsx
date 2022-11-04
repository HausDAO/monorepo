import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CSInput } from './CSInput';
import { useFormContext } from 'react-hook-form';
import { H3 } from '../../atoms/Typography';

export default {
  title: 'Molecules/Form/CSInput',
  component: CSInput,
} as ComponentMeta<typeof CSInput>;

const Template: ComponentStory<typeof CSInput> = (args) => {
  const { watch } = useFormContext();
  const value = watch();

  return (
    <div style={{ margin: '4rem' }}>
      <CSInput {...args} />
      <H3>
        {typeof value[args.id] === 'string'
          ? value[args.id]
          : JSON.stringify(value[args.id]) || 'Input text will appear here'}
      </H3>
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
