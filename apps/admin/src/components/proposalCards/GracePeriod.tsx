import { baalTimeToNow, formatShares } from '@daohaus/common-utilities';
import { ITransformedProposal } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { ParMd, TintSecondary } from '@daohaus/ui';
import { useMemo } from 'react';
import { VotingBar } from '../VotingBar';
import { ActionTemplate, VotingResults } from './ActionPrimitives';

export const GracePeriod = ({
  proposal,
}: {
  proposal: ITransformedProposal;
}) => {
  const { address } = useHausConnect();

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
