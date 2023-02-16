import React from 'react';
import { Keychain } from '@daohaus/keychain-utils';

import {
  MemberCard,
  MemberCardCopyAddress,
  MemberCardExplorerLink,
  MemberCardItem,
} from '@daohaus/ui';
import { MemberContainer, StyledRouterLink } from './MemberDisplay.styles';
import { useProfile } from '@daohaus/moloch-v3-hooks';

type MemberProfileProps = {
  memberAddress: string;
  daoChain: keyof Keychain;
  daoId?: string;
  includeLinks?: boolean;
};

export const MemberDisplay = ({
  memberAddress,
  daoChain,
  daoId,
  includeLinks = false,
}: MemberProfileProps) => {
  const { profile } = useProfile({ address: memberAddress });

  const customProfileURI =
    daoId && daoId && `/molochv3/${daoChain}/${daoId}/members/${memberAddress}`;

  return (
    <MemberContainer>
      <MemberCard
        fullWidth={true}
        variant="ghost"
        profile={
          profile || {
            address: memberAddress,
          }
        }
      >
        <MemberCardItem asChild>
          {includeLinks && (
            <StyledRouterLink to={customProfileURI ? customProfileURI : '/'}>
              View Profile
            </StyledRouterLink>
          )}
        </MemberCardItem>
        <MemberCardExplorerLink
          explorerNetworkId={daoChain as keyof Keychain}
          profileAddress={profile?.address || memberAddress}
        >
          View on Etherscan
        </MemberCardExplorerLink>
        <MemberCardCopyAddress
          profileAddress={profile?.address || memberAddress}
        >
          Copy Address
        </MemberCardCopyAddress>
      </MemberCard>
    </MemberContainer>
  );
};
