import React, { MouseEvent } from 'react';
import { useParams } from 'react-router-dom';

import { formatShares, handleErrorMessage, TXLego } from '@daohaus/utils';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { useDHConnect } from '@daohaus/connect';
import { useTxBuilder } from '@daohaus/tx-builder';
import { ParMd, TintSecondary, useToast } from '@daohaus/ui';

import { useConnectedMember, useDao } from '@daohaus/moloch-v3-context';
import { ACTION_TX } from '../../legos/tx';
import {
  ActionTemplate,
  VoteBox,
  VoteDownButton,
  VoteUpButton,
} from './ActionPrimitives';
import { VotingBar } from '../VotingBar';
import { ActionLifeCycleFns } from '../../utils/general';

enum Vote {
  Yes = 'yes',
  No = 'no',
}

export const HasNotVoted = ({
  lifeCycleFnsOverride,
  proposal,
  readableTime,
}: {
  lifeCycleFnsOverride?: ActionLifeCycleFns;
  proposal: MolochV3Proposal;
  readableTime?: string;
}) => {
  const { daochain } = useParams();
  const { chainId } = useDHConnect();
  const { connectedMember } = useConnectedMember();
  const { fireTransaction } = useTxBuilder();
  const { errorToast, defaultToast, successToast } = useToast();
  const { refreshAll } = useDao();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleVote = async (e: MouseEvent<HTMLButtonElement>) => {
    const { proposalId } = proposal;

    const vote = e.currentTarget.value as Vote;
    if (!proposalId || !vote) return;
    const voteValue = vote === Vote.Yes ? true : false;

    setIsLoading(true);
    lifeCycleFnsOverride?.onActionTriggered?.();
    await fireTransaction({
      tx: { ...ACTION_TX.VOTE, staticArgs: [proposalId, voteValue] } as TXLego,
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Vote Failed', description: errMsg });
          lifeCycleFnsOverride?.onTxError?.(error);
          setIsLoading(false);
        },
        onTxSuccess: (txHash: string) => {
          defaultToast({
            title: 'Vote Success',
            description: 'Please wait for subgraph to sync',
          });
          lifeCycleFnsOverride?.onTxSuccess?.(txHash);
        },
        onPollError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Poll Error', description: errMsg });
          lifeCycleFnsOverride?.onPollError?.(error);
          setIsLoading(false);
        },
        onPollSuccess: () => {
          successToast({
            title: 'Vote Success',
            description: 'Proposal sponsored',
          });
          refreshAll();
          lifeCycleFnsOverride?.onPollSuccess?.(undefined);
          setIsLoading(false);
        },
      },
    });
  };

  const readableVotePower =
    connectedMember && Number(connectedMember?.delegateShares)
      ? `Cast Your Vote (${formatShares(connectedMember.delegateShares)})`
      : undefined;

  const hasShares = Number(connectedMember?.delegateShares)
    ? true
    : 'You must have voting tokens to vote';

  const isConnectedToDao =
    chainId === daochain
      ? true
      : 'You are not connected to the same network as the DAO';
  const isNotLoading = !isLoading
    ? true
    : 'Please wait for transaction to complete';
  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay={
        <ParMd>
          Voting ends in <TintSecondary>{readableTime}</TintSecondary>
        </ParMd>
      }
      main={
        <div>
          <VotingBar proposal={proposal} />
          <VoteBox>
            <VoteDownButton
              size="sm"
              rules={[hasShares, isConnectedToDao, isNotLoading]}
              value={Vote.No}
              onClick={handleVote}
            >
              No ({formatShares(proposal.noBalance)})
            </VoteDownButton>
            <VoteUpButton
              size="sm"
              rules={[hasShares, isConnectedToDao, isNotLoading]}
              value={Vote.Yes}
              onClick={handleVote}
            >
              Yes ({formatShares(proposal.yesBalance)})
            </VoteUpButton>
          </VoteBox>
        </div>
      }
      helperDisplay={readableVotePower}
    />
  );
};
