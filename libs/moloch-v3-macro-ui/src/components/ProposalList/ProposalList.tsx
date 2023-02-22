import {
  useCurrentDao,
  useDaoData,
  useDaoProposals,
} from '@daohaus/moloch-v3-hooks';
import { Button, widthQuery } from '@daohaus/ui';
import { useState } from 'react';
import styled from 'styled-components';
import { ProposalCard } from '../ProposalCard';
import SearchInput from './SearchInput';

type ProposalListProps = {
  daoId: string;
  daoChain: string;
};

export const ProposalList = () => {
  const {
    proposals,
    isLoading: isLoadingProposals,
    fetchNextPage,
    filterProposals,
    hasNextPage,
    orderProposals,
    refetch,
  } = useDaoProposals();
  const { daoId, daoChain } = useCurrentDao();
  const { dao, isLoading: isLoadingDao } = useDaoData();
  const [searchTerm, setSearchTerm] = useState('');

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

  if (isLoadingProposals || isLoadingDao) {
    return <>Loading...</>;
  }

  if (!proposals) {
    return <>No proposals found</>;
  }

  return (
    <>
      <ActionsContainer>
        <SearchFilterContainer>
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            totalItems={Number(dao?.proposalCount) || 0}
            noun={{
              singular: 'proposal',
              plural: 'proposals',
            }}
          />
        </SearchFilterContainer>
      </ActionsContainer>
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

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  @media ${widthQuery.sm} {
    flex-direction: column;
    gap: 2rem;
  }
`;
const SearchFilterContainer = styled.div`
  display: flex;
  gap: 2rem;
  @media ${widthQuery.sm} {
    flex-direction: column;
  }
`;
