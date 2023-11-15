import { useDHConnect } from '@daohaus/connect';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { useProfile } from '@daohaus/moloch-v3-hooks';
import {
  DataIndicator,
  Link,
  MemberCard,
  MemberCardItem,
  MemberCardExplorerLink,
  MemberCardCopyAddress,
  ParMd,
} from '@daohaus/ui';
import {
  dynamicDecimals,
  formatShortDateTimeFromSeconds,
  formatValueTo,
  fromWei,
} from '@daohaus/utils';

import {
  DataContainer,
  OverviewContainer,
  StyledRouterLink,
} from './ProposalDetails.styles';
import { ProposalAddtionalDetails } from './ProposalAdditionalDetails';
import { DecodedMultiTX } from '@daohaus/tx-builder';
import { ProposalWarning } from '../ProposalActionData/ProposalWarning';
import styled from 'styled-components';
import { ProposalActionConfig } from '../ProposalActionData';

import ReactMarkdown from "react-markdown";

const Spacer = styled.div`
  margin-bottom: 2rem;
`;

const ReactMarkdownWrapper = styled.div`

    font-size: 1.6rem;

    .description {
      p, h1, h2, h3, h4 {
        margin-top: 1rem;
      }
      h2 + p {
        margin-top: 0;
      }
      h3 + p {
        margin-top: 0;
      }
      h4 + p {
        margin-top: 0;
      }
    }


`;

type ProposalDetailsProps = {
  daoChain: string;
  daoId: string;
  proposal: MolochV3Proposal;
  includeLinks: boolean;
  actionData?: DecodedMultiTX | null;
  decodeError: boolean;
  proposalActionConfig?: ProposalActionConfig;
};

export const ProposalDetails = ({
  daoChain,
  daoId,
  proposal,
  includeLinks = false,
  actionData,
  decodeError = false,
  proposalActionConfig,
}: ProposalDetailsProps) => {
  const { networks } = useDHConnect();
  const { profile: submitterProfile } = useProfile({
    address: proposal.createdBy,
  });

  return (
    <OverviewContainer>
      <ReactMarkdownWrapper><ReactMarkdown className="description">{proposal.description}</ReactMarkdown></ReactMarkdownWrapper>
      {proposal.contentURI && (
        <Link href={proposal.contentURI} className="proposal-link">
          Link
        </Link>
      )}
      <DataContainer>
        <div>
          <ParMd>Submitted by</ParMd>
          <MemberCard
            variant="ghost"
            profile={
              submitterProfile || {
                address: proposal.createdBy,
              }
            }
          >
            {includeLinks && (
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
        </div>
        <DataIndicator
          label="Expiration Date"
          data={
            Number(proposal.expiration)
              ? formatShortDateTimeFromSeconds(proposal.expiration)
              : '--'
          }
          size="sm"
        />
      </DataContainer>

      {proposal.proposedBy && proposal.proposedBy !== proposal.createdBy && (
        <DataContainer style={{ marginTop: '1rem' }}>
          <div>
            <ParMd>Through Contract</ParMd>
            <MemberCard
              variant="ghost"
              profile={{
                address: proposal.proposedBy,
              }}
            >
              {includeLinks && (
                <MemberCardItem asChild>
                  <StyledRouterLink
                    to={`/molochv3/${daoChain}/${daoId}/members/${proposal.proposedBy}`}
                  >
                    View Profile
                  </StyledRouterLink>
                </MemberCardItem>
              )}
              <MemberCardExplorerLink
                explorerNetworkId={daoChain as ValidNetwork}
                profileAddress={proposal.proposedBy}
              >
                View on Etherscan
              </MemberCardExplorerLink>
              <MemberCardCopyAddress profileAddress={proposal.proposedBy}>
                Copy Address
              </MemberCardCopyAddress>
            </MemberCard>
          </div>
        </DataContainer>
      )}

      {Number(proposal.proposalOffering) > 0 && (
        <DataIndicator
          label="Proposal Offering"
          data={formatValueTo({
            value: fromWei(proposal.proposalOffering),
            format: 'number',
            unit: networks?.[daoChain as ValidNetwork]?.symbol,
            decimals: dynamicDecimals({
              baseUnits: Number(proposal.proposalOffering),
            }),
          })}
          size="sm"
        />
      )}

      <ProposalAddtionalDetails
        daoChain={daoChain}
        daoId={daoId}
        proposal={proposal}
        includeLinks={includeLinks}
        actionData={actionData}
      />

      <Spacer />

      <ProposalWarning
        proposalType={proposal.proposalType}
        decodeError={decodeError}
        txHash={proposal.txHash}
        daoChain={daoChain}
        proposalActionConfig={proposalActionConfig}
      />
    </OverviewContainer>
  );
};
