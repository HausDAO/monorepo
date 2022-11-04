import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MemberCard } from './MemberCard';

export default {
  title: 'Organisms/MemberCard',
  component: MemberCard,
} as ComponentMeta<typeof MemberCard>;

const Template: ComponentStory<typeof MemberCard> = (args) => (
  <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
    <MemberCard {...args} />
  </div>
);

export const MemberCardWithName = Template.bind({});

MemberCardWithName.args = {
  profile: {
    name: 'DAO Guy',
    ens: 'daoguy.eth',
    address: '0xA8cadC2268B01395f8573682fb9DD00Bd582E8A0',
  },
  explorerNetworkId: '0x5',
};

export const MemberCardWithEns = Template.bind({});

MemberCardWithEns.args = {
  profile: {
    ens: 'daoguy.eth',
    address: '0xA8cadC2268B01395f8573682fb9DD00Bd582E8A0',
  },
  explorerNetworkId: '0x5',
};

export const MemberCardWithAddress = Template.bind({});

MemberCardWithAddress.args = {
  profile: {
    address: '0xA8cadC2268B01395f8573682fb9DD00Bd582E8A0',
  },
  explorerNetworkId: '0x5',
};
