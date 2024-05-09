import {
  formatFetchError,
  graphFetch,
  graphFetchList,
  IFindQueryResult,
  IListQueryArguments,
  IListQueryResults,
} from '@daohaus/data-fetch-utils';
import {
  ENDPOINTS,
  getGraphUrl,
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';
import { DaoTokenBalances, nowInSeconds } from '@daohaus/utils';
import {
  Dao_Filter,
  Dao_OrderBy,
  FindDaoDocument,
  FindDaoQuery,
  FindDaoQueryRes,
  FindDaoQueryVariables,
  ListDaosDocument,
  ListDaosQuery,
  ListDaosQueryResDaos,
  ListDaosQueryVariables,
} from './types';
import {
  addDaoProfileFields,
  createPaging,
  DEFAULT_RECORDS_PER_PAGE,
} from './utils';
import { listTokenBalances } from './vaults';

export const findDao = async ({
  networkId,
  dao,
  graphApiKeys = GRAPH_API_KEYS,
  includeTokens = false,
}: {
  networkId: ValidNetwork;
  dao: string;
  graphApiKeys?: Keychain;
  includeTokens?: boolean;
}): Promise<IFindQueryResult<FindDaoQueryRes>> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    return {
      error: formatFetchError({ type: 'INVALID_NETWORK_ERROR' }),
    };
  }

  try {
    const daoRes = await graphFetch<FindDaoQuery, FindDaoQueryVariables>(
      FindDaoDocument,
      url,
      networkId,
      {
        id: dao.toLowerCase(),
        now: nowInSeconds().toFixed(),
      }
    );

    const gnosisUrl = ENDPOINTS['GNOSIS_API'][networkId];

    if (includeTokens && daoRes?.data?.dao && gnosisUrl) {
      try {
        const tokenPromises: Promise<IFindQueryResult<DaoTokenBalances>>[] = [];

        daoRes.data.dao.vaults.forEach((vault) => {
          tokenPromises.push(
            listTokenBalances({
              networkId,
              safeAddress: vault.safeAddress,
            })
          );
        });

        const tokenData = await Promise.all(tokenPromises);

        const hydratedVaults = daoRes.data.dao.vaults.map((vault) => {
          const vaultResMatch = tokenData.find(
            (tokenRes) =>
              tokenRes.data?.safeAddress.toLowerCase() ===
              vault.safeAddress.toLowerCase()
          );

          return {
            ...vault,
            fiatTotal: vaultResMatch?.data?.fiatTotal,
            tokenBalances: vaultResMatch?.data?.tokenBalances,
          };
        });

        return {
          data: {
            dao: {
              ...daoRes.data.dao,
              ...addDaoProfileFields(daoRes.data.dao),
              vaults: hydratedVaults,
              fiatTotal: tokenData.reduce((sum, vault) => {
                sum += Number(vault.data?.fiatTotal);
                return sum;
              }, 0),
            },
          },
        };
      } catch (err) {
        console.error('gnosis api fetch error', err);
      }
    }
    if (daoRes.data?.dao) {
      return {
        data: {
          dao: {
            ...daoRes.data.dao,
            ...addDaoProfileFields(daoRes.data.dao),
          },
        },
      };
    } else {
      return daoRes;
    }
  } catch (err) {
    return {
      error: formatFetchError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
    };
  }
};

export const listDaos = async ({
  networkId,
  filter,
  ordering = {
    orderBy: 'id',
    orderDirection: 'desc',
  },
  paging = {
    pageSize: DEFAULT_RECORDS_PER_PAGE,
    offset: 0,
  },
  graphApiKeys = GRAPH_API_KEYS,
}: IListQueryArguments<Dao_OrderBy, Dao_Filter>): Promise<
  IListQueryResults<Dao_OrderBy, Dao_Filter, ListDaosQueryResDaos>
> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    throw formatFetchError({ type: 'INVALID_NETWORK_ERROR' });
  }

  const res = await graphFetchList<ListDaosQuery, ListDaosQueryVariables>(
    ListDaosDocument,
    url,
    {
      where: { ...filter, id_gt: paging.lastId || '' },
      now: nowInSeconds().toFixed(),
      orderBy: paging.lastId ? 'id' : ordering.orderBy,
      orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
      first: paging.pageSize + 1,
      skip: paging.offset,
    }
  );

  const pagingUpdates = createPaging(res['daos'], paging);

  return {
    networkId,
    filter,
    ordering,
    nextPaging: pagingUpdates.nextPaging,
    previousPaging: pagingUpdates.previousPaging,
    items: pagingUpdates.pageItems.map((item) => {
      return { ...item, ...addDaoProfileFields(item) };
    }),
  };
};
