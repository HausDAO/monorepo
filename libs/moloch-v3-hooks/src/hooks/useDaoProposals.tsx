import { Ordering, Paging } from '@daohaus/data-fetch-utils';
import {
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';
import {
  listProposals,
  MolochV3Proposal,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/moloch-v3-data';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { DaoQueryKeys, daoScopedQueryId, useCurrentDao } from '../rage';

const handleDefaultFilter = <T,>(
  key: string,
  defaultFilter: T,
  getFilter?: (key: string) => T
) => {
  if (!getFilter) return defaultFilter;
  const filter = getFilter(key) as T | undefined;

  return filter || defaultFilter;
};

const fetchProposals = async ({
  daoId,
  daoChain,
  graphApiKeys,
  filter,
  ordering,
  paging,
  pageParam,
}: {
  daoId?: string;
  daoChain?: ValidNetwork;
  graphApiKeys: Keychain;
  filter: Proposal_Filter;
  ordering: Ordering<Proposal_OrderBy>;
  paging: Paging;
  pageParam?: Paging;
}) => {
  if (!daoChain || !daoId) return;

  const res = await listProposals({
    filter,
    networkId: daoChain,
    ordering,
    paging: pageParam || paging,
    graphApiKeys,
  });

  return res;
};

type DaoProposalsProps =
  | {
      daoId?: string;
      daoChain?: ValidNetwork;
      graphApiKeys?: Keychain;
      filter?: Proposal_Filter;
      ordering?: Ordering<Proposal_OrderBy>;
      paging?: Paging;
    }
  | undefined;

export const useDaoProposals = (props?: DaoProposalsProps) => {
  const {
    daoId: daoIdOverride,
    daoChain: daoChainOverride,
    graphApiKeys = GRAPH_API_KEYS,
    filter: filterFromProps,
    ordering = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    },
    paging = {
      pageSize: 5,
      offset: 0,
    },
  } = props || {};
  const {
    daoId: idFromRouter,
    daoChain: networkFromRouter,
    getFilter,
    updateFilter,
  } = useCurrentDao?.() || {};
  const daoId = daoIdOverride || idFromRouter;
  const daoChain = daoChainOverride || networkFromRouter;
  const queryId = daoScopedQueryId({
    daoChain,
    daoId,
    domain: DaoQueryKeys.Proposals,
  });
  const [filter, setFilter] = useState<Proposal_Filter>(
    handleDefaultFilter<Proposal_Filter>(
      queryId,
      filterFromProps || { dao: daoId },
      getFilter
    )
  );
  console.log('filter', filter);

  const { data, error, ...rest } = useInfiniteQuery(
    [{ daoId, daoChain, filter, ordering, paging }],
    ({ pageParam }) =>
      fetchProposals({
        daoId,
        daoChain,
        graphApiKeys,
        filter,
        ordering,
        paging,
        pageParam,
      }),
    {
      enabled: !!daoId && !!daoChain && !!paging,
      getNextPageParam: (lastPage) => lastPage?.nextPaging,
    }
  );
  const allProposals =
    data?.pages?.reduce((acc, page) => {
      if (page?.items) {
        return [...acc, ...page.items];
      }
      return [];
    }, [] as MolochV3Proposal[]) || [];

  const filterProposals = (filter: Proposal_Filter) => {
    if (typeof updateFilter === 'function') {
      updateFilter(queryId, filter);
      setFilter(filter);
    } else {
      setFilter(filter);
    }
  };
  console.log('data', data);
  return {
    proposals: allProposals,
    error,
    filter: data?.pageParams,
    ...rest,
    filterProposals,
  };
};
