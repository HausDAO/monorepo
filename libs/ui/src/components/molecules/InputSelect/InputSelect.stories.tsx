import { ComponentMeta, ComponentStory } from '@storybook/react';

import { InputSelect } from './InputSelect';

export default {
  title: 'Molecules/Form/InputSelect',
  component: InputSelect,
} as ComponentMeta<typeof InputSelect>;

const Template: ComponentStory<typeof InputSelect> = (args) => (
  <InputSelect {...args} />
);
export const BaseInputSelect = Template.bind({});
BaseInputSelect.args = {
  id: 'inputId',
  selectId: 'selectID',
  options: [
    { value: 'test', name: 'SCAM' },
    { value: 'test2', name: 'RUG' },
    { value: 'blort!', name: 'PULL' },
  ],
  placeholder: 'placeholder',
  selectPlaceholder: '-token-',
};
