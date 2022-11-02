import { Proposal_Filter } from '@daohaus/dao-data';
import { useContext } from 'react';
import { DaoContext, defaultDaoData } from '../DaoContext';
import { DaoConnectProposalsType } from '../utils/types';

type ProposalsHookTypes = {
  loadMoreProposals: () => Promise<void>;
  filterProposals: (filterQuery?: Proposal_Filter) => Promise<void>;
};

export const useProposals = (): DaoConnectProposalsType &
  ProposalsHookTypes => {
  const {
    proposals,
    setProposals,
    isProposalsLoading,
    refreshProposals,
    proposalsFilter,
    setProposalsFilter,
    proposalsSort,
    setProposalsSort,
    proposalsPaging,
    setProposalsPaging,
    proposalsNextPaging,
    getNextPage,
  } = useContext(DaoContext);

  const loadMoreProposals = async () => {
    setProposalsPaging(proposalsNextPaging);
  };

  const filterProposals = async (filterQuery?: Proposal_Filter) => {
    setProposals(undefined);
    setProposalsFilter(filterQuery);
    setProposalsPaging(defaultDaoData.proposalsPaging);
    if (proposalsFilter === filterQuery) refreshProposals();
  };

  return {
    proposals,
    setProposals,
    isProposalsLoading,
    refreshProposals,
    proposalsFilter,
    setProposalsFilter,
    proposalsSort,
    setProposalsSort,
    proposalsPaging,
    setProposalsPaging,
    proposalsNextPaging,
    getNextPage,
    loadMoreProposals,
    filterProposals,
  };
};
