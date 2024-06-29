import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AddressDisplay } from './AddressDisplay';

export default {
  title: 'Molecules/AddressDisplay',
  component: AddressDisplay,
} as ComponentMeta<typeof AddressDisplay>;

const Template: ComponentStory<typeof AddressDisplay> = (args) => (
  <AddressDisplay {...args} />
);
export const FullAddressCase = Template.bind({});

FullAddressCase.args = {
  address: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
  explorerNetworkId: '0xa4b1',
  copy: true,
};

export const TruncatedAddressCase = Template.bind({});

TruncatedAddressCase.args = {
  address: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
  explorerNetworkId: '0xa4b1',
  copy: true,
  truncate: true,
};
