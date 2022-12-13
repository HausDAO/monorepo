import {
  formatFetchError,
  graphFetch,
  graphFetchList,
  IFindQueryResult,
  IListQueryArguments,
  IListQueryResults,
} from '@daohaus/data-fetch-utils';
import { getGraphUrl, Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import {
  addParsedContent,
  createPaging,
  DEFAULT_RECORDS_PER_PAGE,
} from './utils';
import {
  FindRecordQueryRes,
  ListRecordQueryRes,
  Record_Filter,
  Record_OrderBy,
} from './types';
import {
  FindRecordDocument,
  FindRecordQuery,
  FindRecordQueryVariables,
  ListRecordsDocument,
  ListRecordsQuery,
  ListRecordsQueryVariables,
} from './subgraph/queries/records.generated';

export const findRecord = async ({
  networkId,
  recordId,
  graphApiKeys,
}: {
  networkId: ValidNetwork;
  recordId: string;
  graphApiKeys?: Keychain;
}): Promise<IFindQueryResult<FindRecordQueryRes>> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    return {
      error: formatFetchError({ type: 'INVALID_NETWORK_ERROR' }),
    };
  }

  try {
    const res = await graphFetch<FindRecordQuery, FindRecordQueryVariables>(
      FindRecordDocument,
      url,
      networkId,
      {
        id: recordId,
      }
    );

    return { ...res, data: { record: addParsedContent(res?.data?.record) } };
  } catch (err) {
    return {
      error: formatFetchError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
    };
  }
};

export const listRecords = async ({
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
}: IListQueryArguments<Record_OrderBy, Record_Filter>): Promise<
  IListQueryResults<
    Record_OrderBy,
    Record_Filter,
    ListRecordQueryRes['records']
  >
> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    throw formatFetchError({ type: 'INVALID_NETWORK_ERROR' });
  }

  const res = await graphFetchList<ListRecordsQuery, ListRecordsQueryVariables>(
    ListRecordsDocument,
    url,
    {
      where: { ...filter, id_gt: paging.lastId || '' },
      orderBy: paging.lastId ? 'id' : ordering.orderBy,
      orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
      first: paging.pageSize + 1,
      skip: paging.offset,
    }
  );

  const pagingUpdates = createPaging(res['records'], paging);

  return {
    networkId,
    filter,
    ordering,
    nextPaging: pagingUpdates.nextPaging,
    previousPaging: pagingUpdates.previousPaging,
    items: pagingUpdates.pageItems.map((item) => {
      return { ...item, ...addParsedContent(item) };
    }),
  };
};
