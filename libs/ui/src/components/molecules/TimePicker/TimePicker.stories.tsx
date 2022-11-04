import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useFormContext } from 'react-hook-form';
import { H4 } from '../../atoms';

import { TimePicker } from './TimePicker';

export default {
  title: 'Molecules/Form/TimePicker',
  component: TimePicker,
} as ComponentMeta<typeof TimePicker>;

const Template: ComponentStory<typeof TimePicker> = (args) => {
  const { watch } = useFormContext();
  const [amt, units, seconds] = watch([
    args.id,
    `${args.id}Units`,
    `${args.id}InSeconds`,
  ]);

  return (
    <div style={{ margin: '4rem' }}>
      <TimePicker {...args} />
      <H4>{amt ? `Time Amount ${amt}` : 'Time Amount'}</H4>
      <H4>{units ? `Time Unit: ${units}` : 'Time Unit'}</H4>
      <H4>{seconds != null ? `Total Seconds: ${seconds}` : 'Total Seconds'}</H4>
    </div>
  );
};

export const BaseInputSelect = Template.bind({});
BaseInputSelect.args = {
  id: 'timeInput',
  label: 'TimePicker',
  info: 'This is helps us pick time',
  placeholder: '0',
};
