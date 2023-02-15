import { MolochV3Proposal } from '@daohaus/moloch-v3-data';

import { VotingBar } from './VotingBar';
import { ActionTemplate } from './ActionPrimitives';

export const Cancelled = ({ proposal }: { proposal: MolochV3Proposal }) => {
  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay="Proposal Cancelled"
      main={<VotingBar proposal={proposal} />}
    />
  );
};
