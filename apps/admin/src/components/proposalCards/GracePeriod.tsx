import { baalTimeToNow, formatShares } from '@daohaus/utils';
import { ITransformedProposal } from '@daohaus/moloch-v3-data';
import { useDHConnect } from '@daohaus/connect';
import { ParMd, TintSecondary } from '@daohaus/ui';
import { useMemo } from 'react';
import { VotingBar } from '../VotingBar';
import { ActionTemplate, VotingResults } from './ActionPrimitives';

export const GracePeriod = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
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

  const readableTime = useMemo(() => {
    return baalTimeToNow(proposal.graceEnds);
  }, [proposal]);

  const userVoteDisplay =
    userVoteData &&
    `You voted ${userVoteData.approved ? 'Yes' : 'No'} (${formatShares(
      userVoteData.balance
    )})`;

  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay={
        <ParMd>
          Grace ends in <TintSecondary>{readableTime}</TintSecondary>
        </ParMd>
      }
      main={
        <>
          <VotingBar proposal={proposal} />
          <VotingResults proposal={proposal} isVoting={false} />
        </>
      }
      helperDisplay={userVoteDisplay}
    />
  );
};
