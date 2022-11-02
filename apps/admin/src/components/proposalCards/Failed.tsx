import {
  checkHasQuorum,
  formatShares,
  roundedPercentage,
} from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useMemo } from 'react';
import { VotingBar } from '../VotingBar';
import { ActionTemplate, Verdict } from './ActionPrimitives';

const getFailReason = ({
  proposal,
  userApproved,
  userVotePower,
}: {
  proposal: ITransformedProposal;
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

export const Failed = ({ proposal }: { proposal: ITransformedProposal }) => {
  const { address } = useHausConnect();
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
