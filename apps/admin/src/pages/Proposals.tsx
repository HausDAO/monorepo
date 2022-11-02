import { MouseEvent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  SingleColumnLayout,
  Spinner,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { statusFilter } from '@daohaus/moloch-v3-data';
import { BsPlusLg } from 'react-icons/bs';

import { useDao, useProposals } from '@daohaus/moloch-v3-context';
import { NewProposalList } from '../components/NewProposalList';
import { PROPOSAL_FORMS } from '../legos/form';
import SearchInput from '../components/SearchInput';
import FilterDropdown from '../components/FilterDropdown';
import { BaseProposalCard } from '../components/proposalCards/BaseProposalCard';
import { PROPOSAL_STATUS } from '@daohaus/utils';

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

export function Proposals() {
  const isMobile = useBreakpoint(widthQuery.sm);
  const {
    isProposalsLoading,
    proposals,
    proposalsNextPaging,
    loadMoreProposals,
    filterProposals,
  } = useProposals();
  const { dao } = useDao();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    filterProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newProposals = useMemo(() => {
    return Object.keys(PROPOSAL_FORMS).map((key) => PROPOSAL_FORMS[key]);
  }, []);

  const handleSearchFilter = (term: string) => {
    setSearchTerm(term);
    const filterQuery =
      filter !== ''
        ? statusFilter(
            PROPOSAL_STATUS[filter],
            Number(dao?.votingPeriod) + Number(dao?.gracePeriod)
          )
        : undefined;

    if (term && term.length > 0) {
      filterProposals({
        ...filterQuery,
        title_contains_nocase: term,
      });
    } else {
      filterProposals(filterQuery);
    }
  };

  const toggleFilter = (event: MouseEvent<HTMLButtonElement>) => {
    const searchQuery =
      searchTerm !== '' ? { title_contains_nocase: searchTerm } : undefined;
    setFilter((prevState) => {
      if (prevState === event.currentTarget.value) {
        filterProposals(searchQuery);
        return '';
      } else {
        const votingPlusGraceDuration =
          Number(dao?.votingPeriod) + Number(dao?.gracePeriod);
        const filterQuery = statusFilter(
          PROPOSAL_STATUS[event.currentTarget.value],
          votingPlusGraceDuration
        );
        filterProposals({ ...filterQuery, ...searchQuery });
        return event.currentTarget.value;
      }
    });
  };

  return (
    <SingleColumnLayout title="Proposals">
      <ActionsContainer>
        <SearchFilterContainer>
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={handleSearchFilter}
            totalItems={Number(dao?.proposalCount) || 0}
          />

          <FilterDropdown filter={filter} toggleFilter={toggleFilter} />
        </SearchFilterContainer>
        <Dialog>
          <DialogTrigger asChild>
            <Button IconLeft={BsPlusLg}>New Proposal</Button>
          </DialogTrigger>
          <DialogContent title="Choose Proposal Type">
            <NewProposalList proposalLegos={newProposals} />
          </DialogContent>
        </Dialog>
      </ActionsContainer>
      {(!proposals || isProposalsLoading) && (
        <Spinner size={isMobile ? '8rem' : '16rem'} />
      )}
      {proposals &&
        proposals.map((proposal) => (
          <BaseProposalCard proposal={proposal} key={proposal.id} />
        ))}

      {proposals && proposalsNextPaging && (
        <Button
          color="secondary"
          variant="outline"
          size="sm"
          onClick={loadMoreProposals}
        >
          Show More Proposals
        </Button>
      )}
    </SingleColumnLayout>
  );
}

export default Proposals;
