import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  formatShortDateTimeFromSeconds,
  formatValueTo,
  fromWei,
  Keychain,
} from '@daohaus/common-utilities';
import { TProposals } from '@daohaus/dao-context';
import { DataMd, ParMd, widthQuery } from '@daohaus/ui';

import { MemberProfileAvatar } from './MemberProfileAvatar';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const VotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 3rem;
  min-width: 50rem;
  max-height: 50rem;
  @media ${widthQuery.sm} {
    min-width: 100%;
  };
  overflow: scroll;
  padding-right: 1rem;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 3rem 0;
  @media ${widthQuery.sm} {
    margin: 1.2rem 0;
  }
`;

type VoteListProps = {
  proposal: TProposals[number];
  votes: TProposals[number]['votes'];
};

export const VoteList = ({ votes, proposal }: VoteListProps) => {
  const { daochain } = useParams();
  return (
    <MainContainer>
      <VotesContainer>
        {votes?.map((vote) => (
          <div key={vote.id}>
            <ParMd>{formatShortDateTimeFromSeconds(vote.createdAt)}</ParMd>
            <VoteContainer>
              <MemberProfileAvatar
                daochain={daochain as keyof Keychain}
                memberAddress={vote.member.memberAddress}
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
    </MainContainer>
  );
};
