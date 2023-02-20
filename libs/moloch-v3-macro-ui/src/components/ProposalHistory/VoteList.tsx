import {
  formatShortDateTimeFromSeconds,
  formatValueTo,
  fromWei,
} from '@daohaus/utils';
import { DataMd, ParMd } from '@daohaus/ui';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { Keychain } from '@daohaus/keychain-utils';

import { MemberDisplay } from '../MemberDisplay';
import {
  VotesContainer,
  VotesListContainer,
  VoteContainer,
} from './ProposalHistory.styles';

type VoteListProps = {
  proposal: MolochV3Proposal;
  votes: MolochV3Proposal['votes'];
  daoChain: string;
  daoId: string;
  includeLinks?: boolean;
};

export const VoteList = ({
  votes,
  proposal,
  daoChain,
  daoId,
  includeLinks = false,
}: VoteListProps) => {
  return (
    <VotesListContainer>
      <VotesContainer>
        {votes?.map((vote) => (
          <div key={vote.id}>
            <ParMd>{formatShortDateTimeFromSeconds(vote.createdAt)}</ParMd>
            <VoteContainer>
              <MemberDisplay
                daoId={daoId}
                daoChain={daoChain as keyof Keychain}
                memberAddress={vote.member.memberAddress}
                includeLinks={includeLinks}
              />

              <DataMd>
                {vote.approved ? 'Yes' : 'No'} -{' '}
                {formatValueTo({
                  value: fromWei(vote.balance),
                  decimals: 2,
                  format: 'numberShort',
                })}
              </DataMd>
            </VoteContainer>
          </div>
        ))}
      </VotesContainer>

      <VoteContainer>
        <ParMd>Total</ParMd>
        <DataMd>
          {formatValueTo({
            value: fromWei(proposal.yesBalance),
            decimals: 2,
            format: 'numberShort',
          })}{' '}
          Yes /{' '}
          {formatValueTo({
            value: fromWei(proposal.noBalance),
            decimals: 2,
            format: 'numberShort',
          })}
          No
        </DataMd>
      </VoteContainer>
    </VotesListContainer>
  );
};
