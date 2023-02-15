import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AccountProfile } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';
import { Link as RouterLink } from 'react-router-dom';

import {
  DropdownLinkStyles,
  MemberCard,
  MemberCardCopyAddress,
  MemberCardExplorerLink,
  MemberCardItem,
} from '@daohaus/ui';

import { fetchProfile } from '../utils/cacheProfile';

type MemberProfileProps = {
  memberAddress: string;
  daochain: keyof Keychain;
  daoid?: string;
};

const MemberContainer = styled.div`
  button {
    padding-left: 0 !important;
  }
`;

const StyledRouterLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  :hover {
    text-decoration: none;
  }
`;

export const MemberProfileAvatar = ({
  memberAddress,
  daochain,
  daoid,
}: MemberProfileProps) => {
  const [memberProfile, setMemberProfile] = useState<AccountProfile>();
  const customProfileURI =
    daoid && daoid && `/molochv3/${daochain}/${daoid}/members/${memberAddress}`;

  const fetchMemberProfile = useCallback(
    async (address: string, setter: typeof setMemberProfile) => {
      const profile = await fetchProfile(address, daochain);
      setter(profile);
    },
    []
  );

  useEffect(() => {
    if (
      !memberProfile ||
      memberProfile.address.toLowerCase() !== memberAddress.toLowerCase()
    ) {
      fetchMemberProfile(memberAddress, setMemberProfile);
    }
  }, [fetchMemberProfile, memberAddress, memberProfile, setMemberProfile]);

  return (
    <MemberContainer>
      <MemberCard
        fullWidth={true}
        variant="ghost"
        profile={
          memberProfile || {
            address: memberAddress,
          }
        }
      >
        <MemberCardItem asChild>
          <StyledRouterLink to={customProfileURI ? customProfileURI : '/'}>
            View Profile
          </StyledRouterLink>
        </MemberCardItem>
        <MemberCardExplorerLink
          explorerNetworkId={daochain as keyof Keychain}
          profileAddress={memberProfile?.address || memberAddress}
        >
          View on Etherscan
        </MemberCardExplorerLink>
        <MemberCardCopyAddress
          profileAddress={memberProfile?.address || memberAddress}
        >
          Copy Address
        </MemberCardCopyAddress>
      </MemberCard>
    </MemberContainer>
  );
};
