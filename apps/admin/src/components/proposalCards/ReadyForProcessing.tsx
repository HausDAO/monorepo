import React, { useEffect } from 'react';

import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { useBreakpoint, useToast, widthQuery } from '@daohaus/ui';
import styled from 'styled-components';
import { ActionTemplate, GasDisplay, Verdict } from './ActionPrimitives';
import { useParams } from 'react-router-dom';
import { useDHConnect } from '@daohaus/connect';
import { useDao } from '@daohaus/moloch-v3-context';
import { useTxBuilder } from '@daohaus/tx-builder';
import {
  checkHasQuorum,
  EthAddress,
  getProcessingGasLimit,
  handleErrorMessage,
  ReactSetter,
  roundedPercentage,
  TXLego,
} from '@daohaus/utils';
import {
  createViemClient,
  isValidNetwork,
  ValidNetwork,
} from '@daohaus/keychain-utils';

import { ACTION_TX } from '../../legos/tx';
import { GatedButton } from './GatedButton';
import { VotingBar } from '../VotingBar';
import { LOCAL_ABI } from '@daohaus/abis';

import { ActionLifeCycleFns } from '../../utils/general';

const ProcessBox = styled.div`
  display: flex;
  justify-content: flex-start;
  .execute {
    margin-left: auto;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    gap: 1.2rem;
    .execute {
      min-width: 0;
      width: 100%;
    }
  }
`;

const eligibableStatuses = [0, 6, 7, 3];

const checkCanProcess = async ({
  daoid,
  daochain,
  prevProposalId,
  setCanProcess,
}: {
  daoid: string;
  daochain: ValidNetwork;
  prevProposalId: string;
  setCanProcess: ReactSetter<string | true>;
}) => {
  try {
    // const state = await createContract({
    //   address: daoid,
    //   abi: LOCAL_ABI.BAAL,
    //   chainId: daochain,
    // })['state'](prevProposalId);
    const client = createViemClient({
      chainId: daochain,
    });

    const state = await client.readContract({
      abi: LOCAL_ABI.BAAL,
      address: daoid as EthAddress,
      functionName: 'state',
      args: [prevProposalId],
    });

    console.log('state', state);

    setCanProcess(
      eligibableStatuses.some((status) => status === state)
        ? true
        : 'Another proposal in the DAO needs to executed first.'
    );
  } catch (error) {
    setCanProcess('Network Error. Could not check for Proposal status');
  }
};

export const ReadyForProcessing = ({
  lifeCycleFnsOverride,
  proposal,
}: {
  lifeCycleFnsOverride?: ActionLifeCycleFns;
  proposal: MolochV3Proposal;
}) => {
  const { daochain, daoid } = useParams();
  const { chainId } = useDHConnect();
  const { fireTransaction } = useTxBuilder();
  const { errorToast, defaultToast, successToast } = useToast();
  const { refreshAll } = useDao();
  const isMobile = useBreakpoint(widthQuery.sm);

  const [canProcess, setCanProcess] = React.useState<string | true>(
    'Checking execution data.'
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const processProposal = async () => {
    const { proposalId, proposalData, actionGasEstimate } = proposal;
    // Usually a proposal actionGasEstimate === 0 when the safe vault takes longer to
    // be indexed by the Gnosis API (a DAO was recently summonned)
    // or when a proposal is submitted through a 3rd party contract with baalGas->0 (e.g. TributeMinion)

    if (!proposalId) return;
    setIsLoading(true);
    lifeCycleFnsOverride?.onActionTriggered?.();
    await fireTransaction({
      tx: {
        ...ACTION_TX.PROCESS,
        staticArgs: [proposalId, proposalData],
        staticOverrides: {
          gasLimit: getProcessingGasLimit(actionGasEstimate, chainId as string),
        },
      } as TXLego,
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Execution Failed', description: errMsg });
          lifeCycleFnsOverride?.onTxError?.(error);
          setIsLoading(false);
        },
        onTxSuccess: (...args) => {
          defaultToast({
            title: 'Execution Success',
            description: 'Please wait for subgraph to sync',
          });
          lifeCycleFnsOverride?.onTxSuccess?.(...args);
        },
        onPollError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Poll Error', description: errMsg });
          lifeCycleFnsOverride?.onPollError?.(error);
          setIsLoading(false);
        },
        onPollSuccess: (...args) => {
          successToast({
            title: 'Execution Success',
            description: 'Proposal executed',
          });
          refreshAll();
          lifeCycleFnsOverride?.onPollSuccess?.(...args);
          setIsLoading(false);
        },
      },
    });
  };

  useEffect(() => {
    if (daoid && isValidNetwork(daochain)) {
      checkCanProcess({
        daochain,
        daoid,
        prevProposalId: proposal.prevProposalId,
        setCanProcess,
      });
    }
  }, [proposal, daoid, daochain]);

  const isConnectedToDao =
    chainId === daochain
      ? true
      : 'You are not connected to the same network as the DAO';
  const isNotLoading = !isLoading
    ? true
    : 'Please wait for transaction to complete';

  const percentYes = roundedPercentage(
    Number(proposal.yesBalance),
    Number(proposal.dao.totalShares)
  );

  const failedQuroum = !checkHasQuorum({
    yesVotes: Number(proposal.yesBalance),
    quorumPercent: Number(proposal.dao.quorumPercent),
    totalShares: Number(proposal.dao.totalShares),
  });

  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay="Ready for Execution"
      main={
        <>
          <VotingBar proposal={proposal} />
          <Verdict
            passed={!failedQuroum}
            appendText={
              !failedQuroum ? ` - ${percentYes}% Yes` : ' - Quorum not met'
            }
          />
        </>
      }
      helperDisplay={
        <ProcessBox>
          {Number(proposal.actionGasEstimate) > 0 && (
            <GasDisplay gasAmt={proposal.actionGasEstimate} />
          )}
          <GatedButton
            size="sm"
            onClick={processProposal}
            className="execute"
            rules={[isConnectedToDao, isNotLoading, canProcess]}
            fullWidth={isMobile}
          >
            Execute
          </GatedButton>
        </ProcessBox>
      }
    />
  );
};
