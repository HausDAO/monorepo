import { ProposalList } from '@daohaus/moloch-v3-macro-ui';
import { Button } from '@daohaus/ui';

export const Proposals = () => {
  return (
    <ProposalList
      header="Proposals"
      rightActionEl={<Button>New Proposal</Button>}
    />
  );
};
