import {
  useCurrentDao,
  useDaoData,
  useDaoProposals,
} from '@daohaus/moloch-v3-hooks';
import { Button, SingleColumnLayout, widthQuery } from '@daohaus/ui';
import { useState, MouseEvent } from 'react';
import styled from 'styled-components';
import { ProposalCard } from '../ProposalCard';
import FilterDropdown from './FilterDropdown';
import { SearchInput } from './SearchInput';

type ProposalListProps = {
  daoId: string;
  daoChain: string;
};

export const ProposalList = () => {
  const {
    proposals,
    isLoading: isLoadingProposals,
    fetchNextPage,
    hasNextPage,
    orderProposals,
    refetch,
  } = useDaoProposals();
  const { daoId, daoChain } = useCurrentDao();
  const { dao, isLoading: isLoadingDao } = useDaoData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    setFilter((prevState) =>
      e.currentTarget.value === prevState ? '' : e.currentTarget.value
    );
    // if (e.target.value === 'all') {
    //   filterProposals({
    //     dao: daoId,
    //   });
    // }
    // if (e.target.value === 'passed') {
    //   filterProposals({
    //     dao: daoId,
    //     passed: true,
    //   });
    // }
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
    <SingleColumnLayout>
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
          <FilterDropdown filter={filter} toggleFilter={handleFilter} />
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
    </SingleColumnLayout>
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
