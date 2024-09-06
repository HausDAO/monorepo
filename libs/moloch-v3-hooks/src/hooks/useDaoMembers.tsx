import { useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import {
  ValidNetwork,
  Keychain,
  GRAPH_API_KEYS,
} from '@daohaus/keychain-utils';
import {
  listMembers,
  Member_OrderBy,
  Member_Filter,
  MolochV3Member,
} from '@daohaus/moloch-v3-data';
import { handleErrorMessage } from '@daohaus/utils';
import { Paging, Ordering } from '@daohaus/data-fetch-utils';
import { useCurrentDao } from '../contexts';
import { checkContextDefault, DaoQueryKeys, daoScopedQueryId } from '../utils';

const fetchMembers = async ({
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
  filter: Member_Filter;
  ordering?: Ordering<Member_OrderBy>;
  paging: Paging;
  pageParam?: Paging;
}) => {
  if (!daoChain || !daoId) return;
  try {
    const res = await listMembers({
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

type DaoMembersProps = {
  daoId: string;
  daoChain: ValidNetwork;
  graphApiKeys?: Keychain;
  filter?: Member_Filter;
  ordering?: Ordering<Member_OrderBy>;
  paging?: Paging;
};

export const useDaoMembers = (props?: DaoMembersProps) => {
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
      pageSize: 20,
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
    domain: DaoQueryKeys.Members,
  });

  const [filter, setFilter] = useState<Member_Filter>(
    checkContextDefault<Member_Filter>(
      queryId,
      filterFromProps || { dao: daoId },
      getFilter
    )
  );
  const [ordering, setOrdering] = useState<Ordering<Member_OrderBy>>(
    checkContextDefault(queryId, orderFromProps, getOrder)
  );

  const { data, error, ...rest } = useInfiniteQuery(
    [queryId, { daoId, daoChain, filter, ordering, paging }],
    ({ pageParam }) =>
      fetchMembers({
        daoId: daoId?.toLowerCase(),
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

  const allMembers = useMemo(() => {
    return (
      data?.pages?.reduce((acc, page) => {
        if (page?.items) {
          const truthyItems = page.items.filter((item) => !!item);
          return [...acc, ...truthyItems];
        }
        return acc;
      }, [] as NonNullable<MolochV3Member>[]) || []
    );
  }, [data]);

  const filterMembers = (filter: Member_Filter) => {
    if (typeof updateFilter === 'function') {
      updateFilter(queryId, filter);
      setFilter(filter);
    } else {
      setFilter(filter);
    }
  };

  const orderMembers = (ordering: Ordering<Member_OrderBy>) => {
    if (typeof updateOrder === 'function') {
      updateOrder(queryId, ordering);
      setOrdering(ordering);
    } else {
      setOrdering(ordering);
    }
  };

  return {
    members: allMembers,
    error,
    filter,
    filterMembers,
    data,
    ordering,
    orderMembers,
    ...rest,
  };
};
