import {
  MemberCard,
  MemberCardCopyAddress,
  MemberCardExplorerLink,
  MemberCardItem,
  ParMd,
} from '@daohaus/ui';
import { ProposalDataPoint } from '../../utils/proposalDetailsHelpers';
import { StyledRouterLink } from './ProposalDetails.styles';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { useProfile } from '@daohaus/moloch-v3-hooks';

type MemberDataPointProps = {
  daoChain: string;
  daoId: string;
  dataPoint: ProposalDataPoint;
  includeLinks: boolean;
};

export const MemberDataPoint = ({
  dataPoint,
  includeLinks = false,
  daoChain,
  daoId,
}: MemberDataPointProps) => {
  const { profile } = useProfile({
    address: dataPoint.value,
  });

  return (
    <div key={dataPoint.label}>
      <ParMd>{dataPoint.label}</ParMd>
      <MemberCard
        variant="ghost"
        profile={
          profile || {
            address: dataPoint.value,
          }
        }
      >
        {includeLinks && (
          <MemberCardItem asChild>
            <StyledRouterLink
              to={`/molochV3/${daoChain}/${daoId}/member/${dataPoint.value}`}
            >
              View Profile
            </StyledRouterLink>
          </MemberCardItem>
        )}
        <MemberCardExplorerLink
          explorerNetworkId={daoChain as ValidNetwork}
          profileAddress={dataPoint.value}
        >
          View On Etherscan
        </MemberCardExplorerLink>
        <MemberCardCopyAddress profileAddress={dataPoint.value}>
          Copy Address
        </MemberCardCopyAddress>
      </MemberCard>
    </div>
  );
};
