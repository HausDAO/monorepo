import { useCurrentDao, useDaoMembers } from '@daohaus/moloch-v3-hooks';
import { Button, Link, Select, SingleColumnLayout } from '@daohaus/ui';
import React from 'react';
import { JSONDisplay } from '../components/JSONDisplay';

export const Members = () => {
  const { daoId, daoChain } = useCurrentDao();

  const { members, fetchNextPage, filterMembers, hasNextPage, orderMembers } =
    useDaoMembers();
  console.log('members', members);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilter = (e: any) => {
    if (e.target.value === 'all') {
      filterMembers({
        dao: daoId,
      });
    }
    if (e.target.value === 'shares') {
      filterMembers({
        dao: daoId,
        shares_gt: '0',
      });
    }
    if (e.target.value === 'loot') {
      filterMembers({
        dao: daoId,
        loot_gt: '0',
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOrder = (e: any) => {
    if (e.target.value === 'desc') {
      orderMembers({
        orderBy: 'createdAt',
        orderDirection: 'desc',
      });
    }
    if (e.target.value === 'asc') {
      orderMembers({
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
          { name: 'Has Shares', value: 'shares' },
          { name: 'Has Loot', value: 'loot' },
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
      {members?.map((member) => {
        return (
          <Link
            key={member?.id}
            href={`/molochV3/${daoChain}/${daoId}/member/${member?.memberAddress}`}
          >
            {member?.memberAddress}
          </Link>
        );
      })}

      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        More
      </Button>
      <JSONDisplay data={members} />
    </SingleColumnLayout>
  );
};
