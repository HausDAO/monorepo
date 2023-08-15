import styled from 'styled-components';
import { useCurrentDao, useDaoProposal } from '@daohaus/moloch-v3-hooks';
import {
  ProposalActions,
  ProposalDetailsContainer,
  ProposalHistory,
} from '@daohaus/moloch-v3-macro-ui';
import { BiColumnLayout, Card, ParLg, Loading, widthQuery } from '@daohaus/ui';
import {
  DAO_METHOD_TO_PROPOSAL_TYPE,
  getProposalTypeLabel,
  PROPOSAL_TYPE_LABELS,
  PROPOSAL_TYPE_WARNINGS,
  ProposalTypeIds,
  SENSITIVE_PROPOSAL_TYPES,
} from '@daohaus/utils';

import { CancelProposal } from '../components/CancelProposal';

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

const CUSTOM_APP_PROPOSAL_TYPE_LABELS: Record<string, string> = {
  INIT_VOTE: 'Initiate Vote',
};

const CUSTOM_PROPOSAL_TYPE_WARNINGS: Record<ProposalTypeIds | string, string> =
  {
    INIT_VOTE: 'Proposal for DAO voting signal. No transactions are executed.',
  };

export const Proposal = () => {
  const { proposal, refetch } = useDaoProposal();
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
        <Loading size={60} />
      </LoadingContainer>
    );

  return (
    <BiColumnLayout
      title={proposal?.title}
      subtitle={`${proposal?.proposalId} | ${getProposalTypeLabel(
        proposal?.proposalType,
        { ...PROPOSAL_TYPE_LABELS, ...CUSTOM_APP_PROPOSAL_TYPE_LABELS }
      )}`}
      actions={
        proposal && (
          <CancelProposal proposal={proposal} onSuccess={() => refetch()} />
        )
      }
      left={
        <OverviewCard>
          {daoChain && daoId && proposal && (
            <ProposalDetailsContainer
              daoChain={daoChain}
              daoId={daoId}
              proposal={proposal}
              includeLinks={true}
              proposalActionConfig={{
                sensitiveProposalTypes: SENSITIVE_PROPOSAL_TYPES,
                actionToProposalType: DAO_METHOD_TO_PROPOSAL_TYPE,
                proposalTypeWarning: {
                  ...PROPOSAL_TYPE_WARNINGS,
                  ...CUSTOM_PROPOSAL_TYPE_WARNINGS,
                },
              }}
            />
          )}
        </OverviewCard>
      }
      right={
        <RightCard>
          <ProposalActions
            proposal={proposal}
            daoChain={daoChain}
            daoId={daoId}
            lifeCycleFnsOverride={{
              onPollError: () => refetch(),
              onPollSuccess: () => refetch(),
            }}
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
