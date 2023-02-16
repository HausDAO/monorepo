import { Link } from 'react-router-dom';
import { useCurrentDao, useDaoProposals } from '@daohaus/moloch-v3-hooks';
import { Button, ParSm, Select, SingleColumnLayout } from '@daohaus/ui';
import { JSONDisplay } from '../components/JSONDisplay';

export const Proposals = () => {
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
      <Select
        onChange={handleFilter}
        id="testFilter"
        options={[
          { name: 'All', value: 'all' },
          { name: 'Has Passed', value: 'passed' },
        ]}
      />
      <Select
        onChange={handleOrder}
        id="testOrder"
        options={[
          { name: 'Newest', value: 'desc' },
          { name: 'Oldest', value: 'asc' },
        ]}
      />
      {proposals?.map((proposal) => {
        return (
          <Link
            key={proposal.proposalId}
            to={`/molochV3/${daoChain}/${daoId}/proposal/${proposal.proposalId}`}
          >
            <ParSm>{proposal?.title}</ParSm>
          </Link>
        );
      })}

      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        More
      </Button>
      <JSONDisplay data={proposals} />
    </SingleColumnLayout>
  );
};
