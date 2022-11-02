import { ITransformedProposal } from '@daohaus/moloch-v3-data';
import { VotingBar } from '../VotingBar';
import { ActionTemplate, Verdict } from './ActionPrimitives';

export const Expired = ({ proposal }: { proposal: ITransformedProposal }) => {
  return (
    <ActionTemplate
      proposal={proposal}
      statusDisplay="Proposal Expired"
      main={
        <>
          <VotingBar proposal={proposal} />
          <Verdict passed={false} />{' '}
        </>
      }
    />
  );
};
