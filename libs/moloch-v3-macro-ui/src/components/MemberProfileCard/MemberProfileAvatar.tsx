import { AccountProfile } from '@daohaus/utils';
import { ValidNetwork } from '@daohaus/keychain-utils';
import {
  MemberCard,
  MemberCardCopyAddress,
  MemberCardExplorerLink,
  MemberCardItem,
} from '@daohaus/ui';

import { MemberContainer, StyledRouterLink } from './MemberProfileCard.styles';
import { useProfile } from '@daohaus/moloch-v3-hooks';

type MemberProfileProps = {
  memberAddress: string;
  memberProfile?: AccountProfile;
  daoChain: ValidNetwork;
  daoId?: string;
  includeLinks?: boolean;
};

export const MemberProfileAvatar = ({
  memberAddress,
  memberProfile,
  daoChain,
  daoId,
  includeLinks = false,
}: MemberProfileProps) => {
  const { profile: currentProfile } = useProfile({
    address: !memberProfile ? memberAddress : '',
  });

  return (
    <MemberContainer>
      <MemberCard
        fullWidth={true}
        variant="ghost"
        profile={
          memberProfile ||
          currentProfile || {
            address: memberAddress,
          }
        }
      >
        {includeLinks && (
          <MemberCardItem asChild>
            <StyledRouterLink
              to={
                daoId
                  ? `/molochv3/${daoChain}/${daoId}/member/${memberAddress}`
                  : '/'
              }
            >
              View Profile
            </StyledRouterLink>
          </MemberCardItem>
        )}
        <MemberCardExplorerLink
          explorerNetworkId={daoChain as ValidNetwork}
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
