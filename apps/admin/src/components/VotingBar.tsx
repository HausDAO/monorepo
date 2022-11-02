import { percentage } from '@daohaus/utils';
import { ITransformedProposal } from '@daohaus/moloch-v3-data';
import { Progress } from '@daohaus/ui';
import { mintDark, slateDark, tomatoDark } from '@radix-ui/colors';
import { useMemo } from 'react';
import styled from 'styled-components';

const VoteBarBox = styled.div`
  width: 100%;
  margin-bottom: 1.2rem;
`;

export const VotingBar = ({ proposal }: { proposal: ITransformedProposal }) => {
  const percentages = useMemo(() => {
    return [
      {
        percentage: `${percentage(
          Number(proposal.yesBalance),
          Number(proposal.dao.totalShares)
        )}%`,
        color: mintDark.mint10,
      },
      {
        percentage: `${percentage(
          Number(proposal.noBalance),
          Number(proposal.dao.totalShares)
        )}%`,
        color: tomatoDark.tomato10,
      },
    ];
  }, [proposal]);

  return (
    <VoteBarBox>
      <Progress
        backgroundColor={slateDark.slate8}
        progressSection={percentages}
      />
    </VoteBarBox>
  );
};
