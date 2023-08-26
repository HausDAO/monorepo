import { BsPlusLg } from 'react-icons/bs';
import { ProposalList } from '@daohaus/moloch-v3-macro-ui';
import { Button, Dialog, DialogContent, DialogTrigger } from '@daohaus/ui';

import { NewProposalList } from '../components/NewProposalList';
import {
  ADVANCED_PROPOSAL_FORMS,
  BASIC_PROPOSAL_FORMS,
} from '@daohaus/moloch-v3-legos';
import { CustomFormLego } from '../legos/legoConfig';

const prepareProposals = (proposals: Record<string, CustomFormLego>) => {
  return Object.keys(proposals).map((key) => proposals[key]);
};

export const Proposals = () => {
  const basicProposals = prepareProposals(BASIC_PROPOSAL_FORMS);
  const advancedProposals = prepareProposals(ADVANCED_PROPOSAL_FORMS);

  return (
    <ProposalList
      header="Proposals"
      allowLinks={true}
      rightActionEl={
        <Dialog>
          <DialogTrigger asChild>
            <Button IconLeft={BsPlusLg}>New Proposal</Button>
          </DialogTrigger>
          <DialogContent title="Choose Proposal Type">
            <NewProposalList
              basicProposals={basicProposals}
              advancedProposals={advancedProposals}
            />
          </DialogContent>
        </Dialog>
      }
    />
  );
};
