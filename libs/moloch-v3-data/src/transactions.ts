import {
  formatFetchError,
  graphFetch,
  graphFetchList,
  IFindQueryResult,
  IListQueryArguments,
} from '@daohaus/data-fetch-utils';
import { getGraphUrl, Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { createPaging, DEFAULT_RECORDS_PER_PAGE } from './utils';
import {
  EventTransaction_Filter,
  EventTransaction_OrderBy,
  FindTxDocument,
  FindTxQuery,
  FindTxQueryVariables,
  IListQueryResults,
  ListTxsDocument,
  ListTxsQuery,
  ListTxsQueryVariables,
} from './types';

export const findTransaction = async ({
  networkId,
  txHash,
  graphApiKeys,
}: {
  networkId: ValidNetwork;
  txHash: string;
  graphApiKeys?: Keychain;
}): Promise<IFindQueryResult<FindTxQuery>> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    return {
      error: formatFetchError({ type: 'INVALID_NETWORK_ERROR' }),
    };
  }

  try {
    return await graphFetch<FindTxQuery, FindTxQueryVariables>(
      FindTxDocument,
      url,
      networkId,
      {
        id: txHash,
      }
    );
  } catch (err) {
    return {
      error: formatFetchError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
    };
  }
};

export const listTransactions = async ({
  networkId,
  filter,
  ordering = {
    orderBy: 'createdAt',
    orderDirection: 'desc',
  },
  paging = {
    pageSize: DEFAULT_RECORDS_PER_PAGE,
    offset: 0,
  },
  graphApiKeys,
}: IListQueryArguments<
  EventTransaction_OrderBy,
  EventTransaction_Filter
>): Promise<
  IListQueryResults<
    EventTransaction_OrderBy,
    EventTransaction_Filter,
    ListTxsQuery['transactions']
  >
> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    throw formatFetchError({ type: 'INVALID_NETWORK_ERROR' });
  }

  const res = await graphFetchList<ListTxsQuery, ListTxsQueryVariables>(
    ListTxsDocument,
    url,
    {
      where: { ...filter, id_gt: paging.lastId || '' },
      orderBy: paging.lastId ? 'id' : ordering.orderBy,
      orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
      first: paging.pageSize + 1,
      skip: paging.offset,
    }
  );

  const pagingUpdates = createPaging(res['transactions'], paging);

  return {
    networkId,
    filter,
    ordering,
    nextPaging: pagingUpdates.nextPaging,
    previousPaging: pagingUpdates.previousPaging,
    items: pagingUpdates.pageItems,
  };
};
