import { RiErrorWarningLine, RiTimeLine } from 'react-icons/ri/index.js';
import { Link as RouterLink } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { charLimit, formatShortDateTimeFromSeconds } from '@daohaus/utils';

import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import {
  Button,
  ParLg,
  ParMd,
  useBreakpoint,
  widthQuery,
  Tooltip,
  ParSm,
  Theme,
  Icon,
  MemberCard,
  MemberCardExplorerLink,
  MemberCardCopyAddress,
  MemberCardItem,
  DropdownLinkStyles,
} from '@daohaus/ui';

import { getProposalTypeLabel } from './cardUtils';
import { useProfile } from '@daohaus/moloch-v3-hooks';
import { ValidNetwork } from '@daohaus/keychain-utils';

const OverviewBox = styled.div<{ allowLinks?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.1rem;
  height: 100%;
  .title {
    margin-top: ${(props) => (props.allowLinks ? '0' : '1.5rem')};
    margin-bottom: 2rem;
  }
  .description {
    margin-bottom: auto;
  }
  @media ${widthQuery.md} {
    .description {
      margin-bottom: 2rem;
    }
  }
`;

const SubmittedContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  .submitted-by {
    margin-right: 1rem;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
  }
`;

const StyledRouterLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  :hover {
    text-decoration: none;
  }
`;

type ProposalCardOverviewProps = {
  loading: boolean;
  proposal: MolochV3Proposal;
  proposalTypes: Record<string, string>;
  sensitiveProposalTypes: Record<string, boolean>;
  daoChain: string;
  daoId: string;
  allowLinks?: boolean;
};

export const ProposalCardOverview = ({
  loading,
  proposal,
  proposalTypes,
  sensitiveProposalTypes,
  daoChain,
  daoId,
  allowLinks,
}: ProposalCardOverviewProps) => {
  const theme = useTheme();
  const isMobile = useBreakpoint(widthQuery.sm);
  const isMd = useBreakpoint(widthQuery.md);
  const { profile: submitterProfile } = useProfile({
    address: proposal.createdBy,
  });

  return (
    <OverviewBox allowLinks={allowLinks}>
      <OverviewHeader
        loading={loading}
        proposal={proposal}
        proposalTypes={proposalTypes}
        sensitiveProposalTypes={sensitiveProposalTypes}
        daoChain={daoChain}
        daoId={daoId}
        allowLinks={allowLinks}
      />

      <ParLg className="title">{proposal.title}</ParLg>
      <ParMd className="description" color={theme.secondary.step11}>
        {charLimit(proposal.description, 145)}
      </ParMd>
      {isMd && allowLinks && (
        <StyledRouterLink
          to={`/molochV3/${daoChain}/${daoId}/proposal/${proposal.proposalId}`}
        >
          <Button
            color="secondary"
            size="sm"
            fullWidth={isMobile}
            disabled={loading}
          >
            View Details
          </Button>
        </StyledRouterLink>
      )}
      <SubmittedContainer>
        <ParMd color={theme.secondary.step11} className="submitted-by">
          Submitted by
        </ParMd>
        <MemberCard
          variant="ghost"
          profile={
            submitterProfile || {
              address: proposal.createdBy,
            }
          }
        >
          {allowLinks && (
            <MemberCardItem asChild>
              <StyledRouterLink
                to={`/molochV3/${daoChain}/${daoId}/proposal/${proposal.proposalId}`}
              >
                View Profile
              </StyledRouterLink>
            </MemberCardItem>
          )}
          <MemberCardExplorerLink
            explorerNetworkId={daoChain as ValidNetwork}
            profileAddress={submitterProfile?.address || proposal.createdBy}
          >
            View On Etherscan
          </MemberCardExplorerLink>
          <MemberCardCopyAddress
            profileAddress={submitterProfile?.address || proposal.createdBy}
          >
            Copy Address
          </MemberCardCopyAddress>
        </MemberCard>
      </SubmittedContainer>
    </OverviewBox>
  );
};

const OverviewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media ${widthQuery.md} {
    align-items: center;
    margin-bottom: 2rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
`;

const StyledPropType = styled.span`
  color: ${({ theme, warning }: { theme: Theme; warning: boolean }) =>
    warning && theme.warning.step9};
`;

const WarningIcon = styled(RiErrorWarningLine)`
  color: ${({ theme }: { theme: Theme }) => theme.warning.step9};
  height: 2rem;
  width: 2rem;
  margin-right: 0.5rem;
`;

const PropIdText = styled(ParSm)`
  margin-right: 0.5rem;
`;

export const OverviewHeader = ({
  loading,
  proposal,
  proposalTypes,
  sensitiveProposalTypes,
  daoChain,
  daoId,
  allowLinks,
}: {
  daoChain: string;
  daoId: string;
  loading: boolean;
  proposal: MolochV3Proposal;
  proposalTypes: Record<string, string>;
  sensitiveProposalTypes: Record<string, boolean>;
  allowLinks?: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useBreakpoint(widthQuery.md);
  return (
    <OverviewContainer>
      {isMobile ? (
        <>
          <HeaderContainer>
            <PropIdText color={theme.secondary.step11}>
              {proposal.proposalId} |
            </PropIdText>
            {sensitiveProposalTypes[proposal.proposalType] && (
              <Icon label="Warning">
                <WarningIcon />
              </Icon>
            )}
            <ParSm
              color={
                sensitiveProposalTypes[proposal.proposalType]
                  ? theme.warning.step9
                  : theme.secondary.step11
              }
            >
              {getProposalTypeLabel(proposal.proposalType, proposalTypes)}
            </ParSm>
          </HeaderContainer>
          <Tooltip
            content={formatShortDateTimeFromSeconds(proposal.createdAt)}
            triggerEl={
              <RiTimeLine color={theme.secondary.step9} size="1.6rem" />
            }
          />
        </>
      ) : (
        <>
          <HeaderContainer>
            <PropIdText color={theme.secondary.step11}>
              {proposal.proposalId} |
            </PropIdText>
            {sensitiveProposalTypes[proposal.proposalType] && (
              <Icon label="Warning">
                <WarningIcon />
              </Icon>
            )}
            <ParSm color={theme.secondary.step11}>
              <StyledPropType
                warning={sensitiveProposalTypes[proposal.proposalType]}
              >
                {getProposalTypeLabel(proposal.proposalType, proposalTypes)}
              </StyledPropType>{' '}
              | {formatShortDateTimeFromSeconds(proposal.createdAt)}
            </ParSm>
          </HeaderContainer>
          {allowLinks && (
            <StyledRouterLink
              to={`/molochV3/${daoChain}/${daoId}/proposal/${proposal.proposalId}`}
            >
              <Button color="secondary" size="sm" disabled={loading}>
                View Details
              </Button>
            </StyledRouterLink>
          )}
        </>
      )}
    </OverviewContainer>
  );
};
