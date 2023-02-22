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
import { handleErrorMessage } from '@daohaus/utils';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useCurrentDao } from '../contexts';
import { checkContextDefault, DaoQueryKeys, daoScopedQueryId } from '../utils';

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

  try {
    const res = await listProposals({
      filter,
      networkId: daoChain,
      ordering,
      paging: pageParam || paging,
      graphApiKeys,
    });
    return res;
  } catch (error) {
    throw new Error(
      handleErrorMessage({
        error,
        fallback: 'Error fetching proposals',
      })
    );
  }
};

type DaoProposalsProps = {
  daoId: string;
  daoChain: ValidNetwork;
  graphApiKeys?: Keychain;
  filter?: Proposal_Filter;
  ordering?: Ordering<Proposal_OrderBy>;
  paging?: Paging;
};

export const useDaoProposals = (props?: DaoProposalsProps) => {
  const {
    daoId: daoIdOverride,
    daoChain: daoChainOverride,
    graphApiKeys = GRAPH_API_KEYS,
    filter: filterFromProps,
    ordering: orderFromProps = {
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
    getOrder,
    updateOrder,
  } = useCurrentDao?.() || {};

  const daoId = daoIdOverride || idFromRouter;
  const daoChain = daoChainOverride || networkFromRouter;
  const queryId = daoScopedQueryId({
    daoChain,
    daoId,
    domain: DaoQueryKeys.Proposals,
  });

  const [filter, setFilter] = useState<Proposal_Filter>(
    checkContextDefault<Proposal_Filter>(
      queryId,
      filterFromProps || { dao: daoId },
      getFilter
    )
  );
  const [ordering, setOrdering] = useState<Ordering<Proposal_OrderBy>>(
    checkContextDefault(queryId, orderFromProps, getOrder)
  );

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
      enabled: !!daoId && !!daoChain && !!paging && !!ordering,
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

  const orderProposals = (ordering: Ordering<Proposal_OrderBy>) => {
    if (typeof updateOrder === 'function') {
      updateOrder(queryId, ordering);
      setOrdering(ordering);
    } else {
      setOrdering(ordering);
    }
  };

  return {
    proposals: allProposals,
    error,
    filter,
    filterProposals,
    data,
    ordering,
    orderProposals,
    ...rest,
  };
};
