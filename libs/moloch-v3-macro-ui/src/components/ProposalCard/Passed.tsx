import React, { useMemo } from 'react';

import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { ActionTemplate, Verdict } from './ActionPrimitives';
import { formatShares, roundedPercentage } from '@daohaus/utils';
import { useDHConnect } from '@daohaus/connect';
import { VotingBar } from './VotingBar';

export const Passed = ({ proposal }: { proposal: MolochV3Proposal }) => {
  const { address } = useDHConnect();

  const userVoteData = useMemo(() => {
    if (address && proposal) {
      return proposal?.votes?.find(
        (voteData) =>
          voteData?.member?.memberAddress?.toLowerCase?.() ===
          address?.toLowerCase?.()
      );
    }
  }, [address, proposal]);

  const percentYes = roundedPercentage(
    Number(proposal.yesBalance),
    Number(proposal.dao.totalShares)
  );

  const userVoteDisplay =
    userVoteData &&
    `You voted ${userVoteData.approved ? 'Yes' : 'No'} (${formatShares(
      userVoteData.balance
    )})`;

  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay="Proposal Passed"
      main={
        <>
          <VotingBar proposal={proposal} />
          <Verdict passed={true} appendText={` - ${percentYes}% Yes`} />
        </>
      }
      helperDisplay={userVoteDisplay}
    />
  );
};
