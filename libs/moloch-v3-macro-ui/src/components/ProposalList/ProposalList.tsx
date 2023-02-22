import { MolochV3Dao, statusFilter } from '@daohaus/moloch-v3-data';
import {
  useCurrentDao,
  useDaoData,
  useDaoProposals,
} from '@daohaus/moloch-v3-hooks';
import { Button, SingleColumnLayout, widthQuery } from '@daohaus/ui';
import { PROPOSAL_STATUS } from '@daohaus/utils';
import { useState, MouseEvent, ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { ProposalCard } from '../ProposalCard';
import FilterDropdown from './FilterDropdown';
import { SearchInput } from './SearchInput';

const handleNewFilter = ({
  filterTag,
  dao,
}: {
  filterTag: string;
  dao: MolochV3Dao;
}) => {
  if (!filterTag) return;
  const votingPlusGraceDuration =
    Number(dao?.votingPeriod) + Number(dao?.gracePeriod);
  return statusFilter(PROPOSAL_STATUS[filterTag], votingPlusGraceDuration);
};

const handleSearchFilter = ({ term }: { term: string }) => {
  return {
    title_contains_nocase: term,
  };
};

export const ProposalList = ({
  rightActionEl,
}: {
  rightActionEl?: ReactNode;
}) => {
  const {
    proposals,
    isFetchedAfterMount,
    isLoading: isLoadingProposals,
    fetchNextPage,
    hasNextPage,
    filterProposals,
    refetch,
  } = useDaoProposals();
  const { daoId, daoChain } = useCurrentDao();
  const { dao, isLoading: isLoadingDao } = useDaoData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilter] = useState('');

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    setFilter((prevState) =>
      e.currentTarget.value === prevState ? '' : e.currentTarget.value
    );
  };

  useEffect(() => {
    if (!dao || !daoId) return;
    const statusFilter = handleNewFilter({ filterTag, dao });
    const searchFilter = handleSearchFilter({ term: searchTerm });

    filterProposals({ dao: daoId, ...statusFilter, ...searchFilter });
  }, [searchTerm, filterTag, dao, daoId]);

  if (!daoChain || !daoId) {
    return <>Current DAO not found</>;
  }

  if (!proposals) {
    return <>No proposals found</>;
  }
  console.log('proposals', proposals);
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
          <FilterDropdown filter={filterTag} toggleFilter={handleFilter} />
        </SearchFilterContainer>
        {rightActionEl}
      </ActionsContainer>
      {proposals?.map((proposal) => (
        <ProposalCard
          key={proposal.proposalId}
          proposal={proposal}
          refetchProposals={refetch}
          daoChain={daoChain}
          daoId={daoId}
        />
      ))}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
          variant="outline"
          size="sm"
        >
          Show More Proposals
        </Button>
      )}
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
