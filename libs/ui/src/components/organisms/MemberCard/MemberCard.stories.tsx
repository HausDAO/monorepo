import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Link as RouterLink, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'storybook-addon-react-router-v6';

import { DropdownLinkStyles } from '../../molecules/Dropdown/Dropdown.styles';

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
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/users/:userId',
      routeParams: { userId: '42' },
    },
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
      key={'00001'}
      profileAddress={sampleProfile.address}
      explorerNetworkId="0x1"
    >
      View on Etherscan
    </MemberCardExplorerLink>,
    <MemberCardCopyAddress key={'00002'} profileAddress={sampleProfile.address}>
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
      key={'00001'}
      profileAddress={sampleProfile.address}
      explorerNetworkId="0x1"
    >
      View on Etherscan
    </MemberCardExplorerLink>,
    <MemberCardCopyAddress key={'00002'} profileAddress={sampleProfile.address}>
      Copy Me!
    </MemberCardCopyAddress>,
  ],
};

export const MemberCardWithRouterLink = Template.bind({});

const StyledRouterLink = styled(RouterLink)`
  ${DropdownLinkStyles}
`;

MemberCardWithRouterLink.story = {
  parameters: {
    reactRouter: {
      routePath: '/profile/:profileId',
      routeParams: { profileId: '42' },
      searchParams: { tab: 'activityLog' },
      routeState: { fromPage: 'homePage' },
    },
  },
};

MemberCardWithRouterLink.args = {
  profile: sampleEnsProfile,
  children: [
    <MemberCardExplorerLink
      key={'00001'}
      profileAddress={sampleProfile.address}
      explorerNetworkId="0x1"
    >
      View on Etherscan
    </MemberCardExplorerLink>,
    <MemberCardCopyAddress key="00002" profileAddress={sampleProfile.address}>
      Copy Me!
    </MemberCardCopyAddress>,
    <MemberCardItem key={'00003'}>
      <StyledRouterLink to="/profile">View Profile</StyledRouterLink>
    </MemberCardItem>,
  ],
};
