import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  MemberCard,
  MemberCardCopyAddress,
  MemberCardExplorerLink,
  MemberCardItem,
} from './MemberCard';

export default {
  title: 'Organisms/MemberCard',
  component: MemberCard,
  subcomponents: {
    MemberCardExplorerLink,
    MemberCardCopyAddress,
    MemberCardItem,
  },
} as ComponentMeta<typeof MemberCard>;

const Template: ComponentStory<typeof MemberCard> = (args) => (
  <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
    <MemberCard {...args} />
  </div>
);

export const MemberCardWithName = Template.bind({});

const sampleProfile = {
  name: 'DAO Guy',
  ens: 'daoguy.eth',
  address: '0xA8cadC2268B01395f8573682fb9DD00Bd582E8A0',
};

MemberCardWithName.args = {
  profile: sampleProfile,
  children: [
    <MemberCardExplorerLink
      profileAddress={sampleProfile.address}
      explorerNetworkId="0x1"
    >
      View on Etherscan
    </MemberCardExplorerLink>,
    <MemberCardCopyAddress profileAddress={sampleProfile.address}>
      Copy Me!
    </MemberCardCopyAddress>,
  ],
};

export const MemberCardWithEns = Template.bind({});

const sampleEnsProfile = {
  ens: 'daoguy.eth',
  address: '0xA8cadC2268B01395f8573682fb9DD00Bd582E8A0',
};

MemberCardWithEns.args = {
  profile: sampleEnsProfile,
  children: [
    <MemberCardExplorerLink
      profileAddress={sampleProfile.address}
      explorerNetworkId="0x1"
    >
      View on Etherscan
    </MemberCardExplorerLink>,
    <MemberCardCopyAddress profileAddress={sampleProfile.address}>
      Copy Me!
    </MemberCardCopyAddress>,
  ],
};

export const MemberCardWithRouterLink = Template.bind({});

MemberCardWithRouterLink.args = {
  profile: sampleEnsProfile,
  children: [
    <MemberCardExplorerLink
      profileAddress={sampleProfile.address}
      explorerNetworkId="0x1"
    >
      View on Etherscan
    </MemberCardExplorerLink>,
    <MemberCardCopyAddress profileAddress={sampleProfile.address}>
      Copy Me!
    </MemberCardCopyAddress>,
  ],
};
