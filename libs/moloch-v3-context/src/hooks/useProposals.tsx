import { Proposal_Filter } from '@daohaus/moloch-v3-data';
import { useContext } from 'react';
import { MolochV3Context, defaultDaoData } from '../MolochV3Context';
import { MolochV3ContextProposalsType } from '../utils/types';

type ProposalsHookTypes = {
  loadMoreProposals: () => Promise<void>;
  filterProposals: (filterQuery?: Proposal_Filter) => Promise<void>;
};

export const useProposals = (): MolochV3ContextProposalsType &
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
  } = useContext(MolochV3Context);

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
