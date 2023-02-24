import {
  MolochV3Dao,
  Proposal_Filter,
  statusFilter,
} from '@daohaus/moloch-v3-data';
import {
  useCurrentDao,
  useDaoData,
  useDaoProposals,
} from '@daohaus/moloch-v3-hooks';
import { Button, SingleColumnLayout, Spinner, widthQuery } from '@daohaus/ui';
import { PROPOSAL_STATUS } from '@daohaus/utils';
import { useState, MouseEvent, ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ProposalCard } from '../ProposalCard';
import {
  PROPOSAL_TYPE_LABELS,
  SENSITIVE_PROPOSAL_TYPES,
} from '../ProposalUtils';
import FilterDropdown from './FilterDropdown';
import { ListAlert } from './ListAlert';
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
  sensitiveProposalTypes = SENSITIVE_PROPOSAL_TYPES,
  proposalTypes = PROPOSAL_TYPE_LABELS,
  header,
}: {
  header?: string;
  rightActionEl?: ReactNode;
  sensitiveProposalTypes?: Record<string, boolean>;
  proposalTypes?: Record<string, string>;
}) => {
  const {
    proposals,
    isLoading: isLoadingProposals,
    fetchNextPage,
    hasNextPage,
    filterProposals,
    refetch,
  } = useDaoProposals();
  const { dao, isLoading: isLoadingDao } = useDaoData();
  const { daoId, daoChain } = useCurrentDao();

  if (!daoId || !daoChain) {
    return <ProposalControls>Current DAO not found</ProposalControls>;
  }

  if (isLoadingProposals || isLoadingDao)
    return (
      <ProposalControls header={header} rightActionEl={rightActionEl}>
        <Spinner size="12rem" />
      </ProposalControls>
    );

  // if (dao?.proposalCount === '0') {
  //   return (
  //     <ProposalControls header={header} rightActionEl={rightActionEl}>
  //       <ListAlert>There are currently no Proposals for this DAO.</ListAlert>
  //     </ProposalControls>
  //   );
  // }

  if (!proposals || proposals.length === 0) {
    return (
      <ProposalControls
        header={header}
        rightActionEl={rightActionEl}
        dao={dao}
        filterProposals={filterProposals}
      >
        <ListAlert>No Proposals Found</ListAlert>
      </ProposalControls>
    );
  }

  return (
    <ProposalControls
      filterProposals={filterProposals}
      rightActionEl={rightActionEl}
      header={header}
      dao={dao}
    >
      {proposals?.map((proposal) => (
        <ProposalCard
          key={proposal.proposalId}
          proposal={proposal}
          refetchProposals={refetch}
          daoChain={daoChain}
          daoId={daoId}
          sensitiveProposalTypes={sensitiveProposalTypes}
          proposalTypes={proposalTypes}
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
    </ProposalControls>
  );
};

const ProposalControls = ({
  filterProposals,
  rightActionEl,
  header,
  children,
  dao,
}: {
  dao?: MolochV3Dao;
  header?: string;
  children: ReactNode;
  rightActionEl?: ReactNode;
  filterProposals?: (filter: Proposal_Filter) => void;
}) => {
  const { daoId } = useCurrentDao();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilter] = useState('');

  const lastFilter = useRef({
    searchTerm,
    filterTag,
  });

  useEffect(() => {
    if (!dao || !daoId || !filterProposals) return;
    if (
      lastFilter.current.searchTerm === searchTerm &&
      lastFilter.current.filterTag === filterTag
    )
      return;
    const statusFilter = handleNewFilter({ filterTag, dao });
    const searchFilter = handleSearchFilter({ term: searchTerm });
    filterProposals({ dao: daoId, ...statusFilter, ...searchFilter });
    lastFilter.current = { searchTerm, filterTag };
  }, [searchTerm, filterTag, dao, daoId, filterProposals]);

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    setFilter((prevState) =>
      e.currentTarget.value === prevState ? '' : e.currentTarget.value
    );
  };

  return (
    <SingleColumnLayout title={header}>
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
      {children}
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
