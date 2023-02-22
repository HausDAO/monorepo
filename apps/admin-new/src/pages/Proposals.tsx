import { useDHConnect } from '@daohaus/connect';
import {
  useCurrentDao,
  useDaoProposals,
  useProfile,
} from '@daohaus/moloch-v3-hooks';
import { ProposalCard, ProposalList } from '@daohaus/moloch-v3-macro-ui';
import { Button, SingleColumnLayout } from '@daohaus/ui';
import { JSONDisplay } from '../components/JSONDisplay';

export const Proposals = () => {
  const { address } = useDHConnect();
  const { profile } = useProfile({
    address: address as string,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <SingleColumnLayout>
      <ProposalList />
    </SingleColumnLayout>
  );
};
