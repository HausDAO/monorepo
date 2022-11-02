import { ParMd, TintSecondary } from '@daohaus/ui';
import { formatShares } from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';

import { ActionTemplate, VotingResults } from './ActionPrimitives';
import { VotingBar } from '../VotingBar';

export const HasVoted = ({
  proposal,
  approved,
  userVoteBalance,
  readableTime,
}: {
  proposal: ITransformedProposal;
  approved?: boolean;
  userVoteBalance?: string;
  readableTime?: string;
}) => {
  const voterHelperText = `You voted ${approved ? 'Yes' : 'No'} (${formatShares(
    userVoteBalance || '0'
  )})`;

  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay={
        <ParMd>
          Voting ends in <TintSecondary>{readableTime}</TintSecondary>
        </ParMd>
      }
      main={
        <>
          <VotingBar proposal={proposal} />
          <VotingResults proposal={proposal} isVoting={true} />
        </>
      }
      helperDisplay={voterHelperText}
    />
  );
};
