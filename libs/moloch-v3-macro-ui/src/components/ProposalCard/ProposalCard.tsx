import { useState } from 'react';
import styled from 'styled-components';
import { Card, widthQuery } from '@daohaus/ui';

// import { ProposalCardOverview } from '../ProposalCardOverview';
// import { ProposalActions } from './ProposalActions';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
// import { ActionLifeCycleFns } from '../../utils/general';

const ProposalCardContainer = styled(Card)`
  display: flex;
  gap: 3rem;
  width: 100%;

  margin-bottom: 3rem;
  padding: 2.3rem 2.5rem;
  border: none;
  min-height: 23.8rem;
  @media ${widthQuery.sm} {
    gap: 2rem;
    flex-direction: column;
    height: auto;
    margin-bottom: 2rem;
  }
`;

const LeftCard = styled.div`
  width: 100%;
  @media ${widthQuery.sm} {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }
`;

const RightCard = styled.div`
  width: 32rem;
  min-width: 32rem;

  @media ${widthQuery.sm} {
    max-width: 100%;
    min-width: 0;
  }
`;

type BaseProposalCardProps = {
  proposal: MolochV3Proposal;
};

export const ProposalCard = ({ proposal }: BaseProposalCardProps) => {
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // const lifeCycleFnsOverride: ActionLifeCycleFns = {
  //   onActionTriggered: () => setActionLoading(true),
  //   onPollError: () => setActionLoading(false),
  //   onPollSuccess: () => setActionLoading(false),
  //   onTxError: () => setActionLoading(false),
  // };

  return (
    <ProposalCardContainer>
      <LeftCard>
        {/* <ProposalCardOverview loading={actionLoading} proposal={proposal} /> */}
      </LeftCard>
      <RightCard>
        {/* <ProposalActions
          lifeCycleFnsOverride={lifeCycleFnsOverride}
          proposal={proposal}
        /> */}
      </RightCard>
    </ProposalCardContainer>
  );
};
