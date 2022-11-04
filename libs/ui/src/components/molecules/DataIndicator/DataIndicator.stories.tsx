import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DataIndicator } from './DataIndicator';

export default {
  title: 'Molecules/DataIndicator',
  component: DataIndicator,
} as ComponentMeta<typeof DataIndicator>;

const Template: ComponentStory<typeof DataIndicator> = (args) => (
  <DataIndicator {...args} />
);
export const LargeCase = Template.bind({});

LargeCase.args = {
  size: 'lg',
  label: 'Vault Total',
  data: '$120k',
};

export const SmallCase = Template.bind({});

SmallCase.args = {
  size: 'sm',
  label: 'Expiration Date',
  data: 'May 10, 2022 15:55pm PST',
};

export const ToolTipCase = Template.bind({});

ToolTipCase.args = {
  label: 'Shamans',
  data: '2',
  info: 'Shamans are dao admins',
};
