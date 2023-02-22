import { useCurrentDao, useDaoProposals } from '@daohaus/moloch-v3-hooks';
import { Button } from '@daohaus/ui';
import React from 'react';
import { ProposalCard } from '../ProposalCard';

type ProposalListProps = {
  daoId: string;
  daoChain: string;
};

export const ProposalList = () => {
  const {
    proposals,
    isLoading,
    fetchNextPage,
    filterProposals,
    hasNextPage,
    orderProposals,
    refetch,
  } = useDaoProposals();
  const { daoId, daoChain } = useCurrentDao();

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

  if (!daoChain || !daoId) {
    return <>Current DAO not found</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!proposals) {
    return <>No proposals found</>;
  }

  return (
    <>
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal.proposalId}
          proposal={proposal}
          refetchProposals={refetch}
          daoChain={daoChain}
          daoId={daoId}
        />
      ))}
      <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        More
      </Button>
      <Button onClick={() => refetch()}>Refetch</Button>
    </>
  );
};
