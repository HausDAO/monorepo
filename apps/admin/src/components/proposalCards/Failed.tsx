import {
  checkHasQuorum,
  formatShares,
  roundedPercentage,
} from '@daohaus/utils';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { useDHConnect } from '@daohaus/connect';
import { useMemo } from 'react';
import { VotingBar } from '../VotingBar';
import { ActionTemplate, Verdict } from './ActionPrimitives';

const getFailReason = ({
  proposal,
  userApproved,
  userVotePower,
}: {
  proposal: MolochV3Proposal;
  userApproved?: boolean;
  userVotePower?: number | string;
}) => {
  if (
    !checkHasQuorum({
      yesVotes: Number(proposal.yesBalance),
      quorumPercent: Number(proposal.dao.quorumPercent),
      totalShares: Number(proposal.dao.totalShares),
    })
  ) {
    return 'Quorum not met';
  }
  if (userApproved && userVotePower) {
    return `You voted ${userApproved ? 'Yes' : 'No'} (${formatShares(
      userVotePower
    )})`;
  }
  return undefined;
};

export const Failed = ({ proposal }: { proposal: MolochV3Proposal }) => {
  const { address } = useDHConnect();
  const percentNo = roundedPercentage(
    Number(proposal.noBalance),
    Number(proposal.dao.totalShares)
  );

  const userVoteData = useMemo(() => {
    if (address && proposal) {
      return proposal?.votes?.find(
        (voteData) =>
          voteData?.member?.memberAddress?.toLowerCase?.() ===
          address?.toLowerCase?.()
      );
    }
  }, [address, proposal]);

  const failDisplay = useMemo(() => {
    return getFailReason({
      proposal,
      userApproved: userVoteData?.approved,
      userVotePower: userVoteData?.balance,
    });
  }, [proposal, userVoteData]);

  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay="Proposal Failed"
      main={
        <>
          <VotingBar proposal={proposal} />
          <Verdict passed={false} appendText={` - ${percentNo}% No`} />
        </>
      }
      helperDisplay={failDisplay}
    />
  );
};
