import styled from 'styled-components';
import { useCurrentDao, useDaoProposal } from '@daohaus/moloch-v3-hooks';
import {
  ProposalActionData,
  ProposalActions,
  ProposalDetails,
  ProposalHistory,
} from '@daohaus/moloch-v3-macro-ui';
import { BiColumnLayout, Card, ParLg, Spinner, widthQuery } from '@daohaus/ui';
import {
  getProposalTypeLabel,
  PROPOSAL_TYPE_LABELS,
  TXLego,
} from '@daohaus/utils';

const LoadingContainer = styled.div`
  margin-top: 5rem;
`;

const OverviewCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  height: fit-content;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const RightCard = styled(Card)`
  width: 45.7rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  height: 100%;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

// TODO: Import TxLegos
const TX: Record<string, TXLego> = {};

export const Proposal = () => {
  const { proposal } = useDaoProposal();
  const { daoChain, daoId } = useCurrentDao();

  if (!daoChain || !daoId)
    return (
      <LoadingContainer>
        <ParLg>DAO Not Found</ParLg>
      </LoadingContainer>
    );

  if (!proposal)
    return (
      <LoadingContainer>
        <Spinner size="6rem" />
      </LoadingContainer>
    );

  return (
    <BiColumnLayout
      title={proposal?.title}
      subtitle={`${proposal?.proposalId} | ${getProposalTypeLabel(
        proposal?.proposalType,
        PROPOSAL_TYPE_LABELS
      )}`}
      // TODO:
      // actions={
      //   proposal && (
      //     <CancelProposal proposal={proposal} onSuccess={fetchProposal} />
      //   )
      // }
      left={
        <OverviewCard>
          {daoChain && daoId && proposal && (
            <ProposalDetails
              daoChain={daoChain}
              daoId={daoId}
              proposal={proposal}
              includeLinks
            />
          )}
          <ProposalActionData
            daoChain={daoChain}
            daoId={daoId}
            proposal={proposal}
            txLegos={TX}
          />
        </OverviewCard>
      }
      right={
        <RightCard>
          <ProposalActions
            proposal={proposal}
            daoChain={daoChain}
            daoId={daoId}
          />
          <ProposalHistory
            proposalId={proposal.proposalId}
            daoChain={daoChain}
            daoId={daoId}
            includeLinks
          />
        </RightCard>
      }
    />
  );
};
