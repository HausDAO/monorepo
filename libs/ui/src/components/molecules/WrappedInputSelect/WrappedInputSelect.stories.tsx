import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useFormContext } from 'react-hook-form';
import { H3 } from '../../atoms';

import { WrappedInputSelect } from './WrappedInputSelect';

export default {
  title: 'Molecules/Form/WrappedInputSelect',
  component: WrappedInputSelect,
} as ComponentMeta<typeof WrappedInputSelect>;

const Template: ComponentStory<typeof WrappedInputSelect> = (args) => {
  const { watch } = useFormContext();
  const value = watch();

  return (
    <div style={{ margin: '4rem' }}>
      <WrappedInputSelect {...args} />
      <H3>{value[args.selectId] || 'Select Value'}</H3>
      <H3>{value[args.id] || 'Input Value'}</H3>
    </div>
  );
};

export const BaseInputSelect = Template.bind({});
BaseInputSelect.args = {
  id: 'inputId',
  label: 'Wrapped Input Select',
  selectId: 'selectID',
  info: 'This is controlled by the info prop',
  options: [
    { value: 'Scam Token', name: 'SCAM' },
    { value: 'Rug Token', name: 'RUG' },
    { value: 'Pull Token', name: 'PULL' },
  ],
  placeholder: 'placeholder',
  selectPlaceholder: '-token-',
  warning: {
    type: 'warning',
    message: 'Whoa!!!',
  },
};
