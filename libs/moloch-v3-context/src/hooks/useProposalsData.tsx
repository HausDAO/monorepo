import { useContext } from 'react';
import { MolochV3DaoDataContext } from '../MolochV3DaoDataContext';
import {
  MolochV3Proposal,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/moloch-v3-data';
import { fetchProposalsList } from '../utils';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { Ordering, Paging } from '@daohaus/data-fetch-utils';

type MolochV3DaoDataContextProposalsType = {
  proposals: MolochV3Proposal[] | undefined;
  filter: Proposal_Filter | undefined;
  filterProposals: (filter: Proposal_Filter) => Promise<void>;
  sort: Ordering<Proposal_OrderBy> | undefined;
  sortProposals: (ordering: Ordering<Proposal_OrderBy>) => Promise<void>;
  paging: { current: Paging | undefined; next: Paging | undefined };
  loadNextPage: () => Promise<void>;
  refreshProposals: () => Promise<void>;
};

export const useProposalsData = (): MolochV3DaoDataContextProposalsType => {
  const { daoData, daoid, daochain, graphApiKeys, setDaoData } = useContext(
    MolochV3DaoDataContext
  );
  // todo: these will also need to handle member vote fetch if a user is connected

  const filterProposals = async (filter: Proposal_Filter) => {
    if (daoid && daochain) {
      const res = await fetchProposalsList({
        filter: { dao: daoid, ...filter },
        ordering: daoData?.proposals?.ordering,
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      setDaoData((prevState) => {
        return { ...prevState, proposals: res };
      });
    }
  };

  const sortProposals = async (ordering: Ordering<Proposal_OrderBy>) => {
    if (daoid && daochain) {
      const res = await fetchProposalsList({
        filter: daoData?.proposals?.filter || { dao: daoid },
        ordering: ordering,
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      setDaoData((prevState) => {
        return { ...prevState, proposals: res };
      });
    }
  };

  const loadNextPage = async () => {
    if (daoid && daochain) {
      const res = await fetchProposalsList({
        filter: daoData?.proposals?.filter || { dao: daoid },
        ordering: daoData?.proposals?.ordering,
        paging: daoData?.proposals?.nextPaging,
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      setDaoData((prevState) => {
        const prevItems = prevState.proposals
          ? [...prevState.proposals.items]
          : [];

        return {
          ...prevState,
          proposals: {
            ...res,
            items: res ? [...prevItems, ...res.items] : [],
          },
        };
      });
    }
  };

  const refreshProposals = async () => {
    if (daoid && daochain) {
      const res = await fetchProposalsList({
        filter: { dao: daoid },
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      setDaoData((prevState) => {
        return { ...prevState, proposals: res };
      });
    }
  };

  return {
    proposals: daoData?.proposals?.items,
    filter: daoData?.proposals?.filter,
    filterProposals,
    sort: daoData?.proposals?.ordering,
    sortProposals,
    paging: {
      current: daoData?.proposals?.previousPaging,
      next: daoData?.proposals?.nextPaging,
    },
    loadNextPage,
    refreshProposals,
  };
};
