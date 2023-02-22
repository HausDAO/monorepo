import { ProposalList } from '@daohaus/moloch-v3-macro-ui';
import { Button } from '@daohaus/ui';

export const Proposals = () => {
  return <ProposalList rightActionEl={<Button>New Proposal</Button>} />;
};
