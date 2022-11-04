import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WrappedSelect } from './WrappedSelect';
import { useFormContext } from 'react-hook-form';
import { H3 } from '../../atoms/Typography';

export default {
  title: 'Molecules/Form/WrappedSelect',
  component: WrappedSelect,
} as ComponentMeta<typeof WrappedSelect>;

const Template: ComponentStory<typeof WrappedSelect> = (args) => {
  const { watch } = useFormContext();
  const value = watch();

  return (
    <div style={{ margin: '4rem' }}>
      <WrappedSelect {...args} />
      <H3>{value[args.id] || 'Select text will appear here'}</H3>
    </div>
  );
};

export const FullWrappedSelect = Template.bind({});
FullWrappedSelect.args = {
  id: 'example',
  label: 'Complete Select',
  placeholder: 'placeholder',
  helperText: 'Test the action/controls',
  info: 'This is controlled by the info prop',
  options: [
    { value: 'selectValue1', name: 'Select Label 1' },
    { value: 'selectValue2', name: 'Select Label 2' },
  ],
  long: false,
  full: false,
  warning: undefined,
  error: undefined,
};
