import { useDHConnect } from '@daohaus/connect';
import {
  useCurrentDao,
  useDaoProposals,
  useProfile,
} from '@daohaus/moloch-v3-hooks';
import { ProposalCard } from '@daohaus/moloch-v3-macro-ui';
import { Button, Link, Select, SingleColumnLayout } from '@daohaus/ui';
import { JSONDisplay } from '../components/JSONDisplay';

export const Proposals = () => {
  const { address } = useDHConnect();
  const { profile } = useProfile({
    address: address as string,
  });

  const { daoId, daoChain } = useCurrentDao();
  const {
    proposals,
    fetchNextPage,
    filterProposals,
    hasNextPage,
    orderProposals,
  } = useDaoProposals();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilter = (e: any) => {
    if (e.target.value === 'all') {
      filterProposals({
        dao: daoId,
      });
    }
    if (e.target.value === 'passed') {
      filterProposals({
        dao: daoId,
        passed: true,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOrder = (e: any) => {
    if (e.target.value === 'desc') {
      orderProposals({
        orderBy: 'createdAt',
        orderDirection: 'desc',
      });
    }
    if (e.target.value === 'asc') {
      orderProposals({
        orderBy: 'createdAt',
        orderDirection: 'asc',
      });
    }
  };

  return (
    <SingleColumnLayout>
      {proposals[0] && <ProposalCard proposal={proposals[0]} />}

      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        More
      </Button>
      <JSONDisplay data={proposals} />
    </SingleColumnLayout>
  );
};
