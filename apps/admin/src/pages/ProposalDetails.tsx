import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  BiColumnLayout,
  Card,
  SingleColumnLayout,
  Loading,
  widthQuery,
} from '@daohaus/ui';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { MulticallArg } from '@daohaus/utils';
import {
  isValidNetwork,
  ValidNetwork,
  Keychain,
} from '@daohaus/keychain-utils';

import { useDHConnect } from '@daohaus/connect';

import { loadProposal } from '../utils/dataFetchHelpers';
import { ProposalDetailsGuts } from '../components/ProposalDetailsGuts';
import { ProposalHistory } from '../components/ProposalHistory';
import { ActionLifeCycleFns, getProposalTypeLabel } from '../utils/general';
import { ProposalActions } from '../components/proposalCards/ProposalActions';
import { CancelProposal } from '../components/CancelProposal';
import {
  DecodedMultiTX,
  decodeProposalActions,
  isActionError,
} from '@daohaus/tx-builder';
import { ActionDisplay } from '../components/ActionDisplay';
import { TX } from '../legos/tx';

// generate a random hex string that is 900 characters long

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

const ActionContainer = styled.div`
  padding: 0rem 3.6rem;
`;

export function ProposalDetails() {
  const { daoid, daochain, proposalId } = useParams();
  const { address } = useDHConnect();

  const [proposal, setProposal] = useState<MolochV3Proposal | undefined>();
  const [proposalLoading, setProposalLoading] = useState<boolean>(false);
  const [decodeError, setDecodeError] = useState<boolean>(false);
  const [actionData, setActionData] = useState<DecodedMultiTX | null>();

  const fetchProposal = useCallback(() => {
    const shouldUpdate = true;
    if (!daochain || !daoid || !proposalId) return;
    loadProposal({
      daoid,
      daochain: daochain as keyof Keychain,
      proposalId,
      setProposal,
      setProposalLoading,
      shouldUpdate,
      connectedAddress: address,
    });
  }, [daochain, daoid, proposalId, address]);

  useEffect(() => {
    if (daochain && daoid && proposalId) {
      fetchProposal();
    }
  }, [daochain, daoid, proposalId, address, fetchProposal]);

  useEffect(() => {
    let shouldUpdate = true;
    const fetchPropActions = async (
      chainId: ValidNetwork,
      actionData: string,
      proposalType: string
    ) => {
      const multicallMeta = TX[proposalType]?.args?.find(
        (tx) => (tx as MulticallArg).type === 'multicall'
      );
      const proposalActions = await decodeProposalActions({
        chainId,
        actionData,
        actionsMeta: multicallMeta && (multicallMeta as MulticallArg).actions,
      });

      if (shouldUpdate) {
        setActionData(proposalActions);
        setDecodeError(
          proposalActions.length === 0 ||
            proposalActions.some((action) => isActionError(action))
        );
      }
    };

    if (!isValidNetwork(daochain) || !proposal) return;
    fetchPropActions(daochain, proposal.proposalData, proposal.proposalType);

    return () => {
      shouldUpdate = false;
    };
  }, [daochain, proposal]);

  const lifeCycleFnsOverride: ActionLifeCycleFns = {
    onPollSuccess: () => fetchProposal(),
  };

  if (proposalLoading) {
    return (
      <SingleColumnLayout>
        <Loading />
      </SingleColumnLayout>
    );
  }

  return (
    <BiColumnLayout
      title={proposal?.title}
      subtitle={`${proposal?.proposalId} | ${getProposalTypeLabel(
        proposal?.proposalType
      )}`}
      actions={
        proposal && (
          <CancelProposal proposal={proposal} onSuccess={fetchProposal} />
        )
      }
      left={
        <OverviewCard>
          {proposal && (
            <ProposalDetailsGuts
              decodeError={decodeError}
              proposal={proposal}
            />
          )}
          {actionData && (
            <ActionContainer>
              <ActionDisplay
                actions={actionData}
                proposalType={proposal?.proposalType}
              />
            </ActionContainer>
          )}
        </OverviewCard>
      }
      right={
        <RightCard>
          {proposal && (
            <ProposalActions
              lifeCycleFnsOverride={lifeCycleFnsOverride}
              proposal={proposal}
            />
          )}
          <ProposalHistory proposal={proposal} />
        </RightCard>
      }
    />
  );
}

export default ProposalDetails;
