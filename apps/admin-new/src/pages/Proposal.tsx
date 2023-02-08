import { useDaoProposal } from '@daohaus/moloch-v3-hooks';
import { ParLg, SingleColumnLayout } from '@daohaus/ui';

import { JSONDisplay } from '../components/JSONDisplay';

export const Proposal = () => {
  const { proposal } = useDaoProposal();

  return (
    <SingleColumnLayout>
      <ParLg>{proposal?.title}</ParLg>
      <JSONDisplay data={proposal} />
    </SingleColumnLayout>
  );
};
