import { useCurrentDao, useDaoProposals } from '@daohaus/moloch-v3-hooks';
import { Button, Select, SingleColumnLayout } from '@daohaus/ui';
import { JSONDisplay } from '../components/JSONDisplay';

export const Proposals = () => {
  // const [pageSize, setPageSize] = React.useState(5);
  const { daoId, daoChain } = useCurrentDao();
  // const [filter, setFilter] = React.useState<Proposal_Filter>();
  const { proposals, fetchNextPage, filterProposals, filter, hasNextPage } =
    useDaoProposals();

  const handleChange = (e: any) => {
    if (e.target.value === 'all') {
      filterProposals({
        dao: daoId,
      });
    }
    if (e.target.value === 'passed') {
      filterProposals({
        ...filter,
        passed: true,
      });
    }
  };

  return (
    <SingleColumnLayout>
      <Select
        onChange={handleChange}
        id="test"
        options={[
          { name: 'All', value: 'all' },
          { name: 'Has Passed', value: 'passed' },
        ]}
      />
      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        More
      </Button>
      <JSONDisplay data={proposals} />
    </SingleColumnLayout>
  );
};
