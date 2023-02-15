import { useMemo } from 'react';

import { baalTimeToNow } from '@daohaus/utils';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { useDHConnect } from '@daohaus/connect';

import { HasVoted } from './HasVoted';
import { HasNotVoted } from './HasNotVoted';
import { ActionLifeCycleFns } from '../ProposalUtils/types';

export const VotingPeriod = ({
  lifeCycleFnsOverride,
  proposal,
}: {
  lifeCycleFnsOverride?: ActionLifeCycleFns;
  proposal: MolochV3Proposal;
}) => {
  const { address } = useDHConnect();
  const readableTime = useMemo(() => {
    return baalTimeToNow(proposal.votingEnds);
  }, [proposal]);

  const userVoteData = useMemo(() => {
    if (address && proposal) {
      return proposal?.votes?.find(
        (voteData) =>
          voteData?.member?.memberAddress?.toLowerCase?.() ===
          address?.toLowerCase?.()
      );
    }
  }, [address, proposal]);

  return userVoteData ? (
    <HasVoted
      proposal={proposal}
      approved={userVoteData?.approved}
      readableTime={readableTime}
      userVoteBalance={userVoteData?.balance}
    />
  ) : (
    <HasNotVoted
      lifeCycleFnsOverride={lifeCycleFnsOverride}
      proposal={proposal}
      readableTime={readableTime}
    />
  );
};
