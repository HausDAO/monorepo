import { useQuery } from 'react-query';

import {
  ValidNetwork,
  Keychain,
  GRAPH_API_KEYS,
} from '@daohaus/keychain-utils';
import {
  listMembers,
  Member_OrderBy,
  Member_Filter,
} from '@daohaus/moloch-v3-data';
import { Paging, Ordering } from '@daohaus/data-fetch-utils';
import { handleErrorMessage } from '@daohaus/utils';

const fetchMembers = async ({
  chainId,
  filter,
  paging,
  ordering,
  graphApiKeys,
}: {
  chainId: ValidNetwork;
  ordering?: Ordering<Member_OrderBy>;
  filter: Member_Filter;
  paging: Paging;
  graphApiKeys: Keychain;
}) => {
  try {
    const data = await listMembers({
      networkId: chainId,
      graphApiKeys,
      filter,
      paging,
      ordering,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: 'Error fetching members' })
    );
  }
};

export const useMembers = ({
  daoId,
  chainId,
  filter,
  paging = { pageSize: 500, offset: 0 },
  ordering = { orderDirection: 'desc', orderBy: 'shares' },
  graphApiKeys = GRAPH_API_KEYS,
}: {
  daoId: string;
  chainId: ValidNetwork;
  ordering?: Ordering<Member_OrderBy>;
  filter?: Member_Filter;
  paging?: Paging;
  graphApiKeys?: Keychain;
}) => {
  const defaultFilter = filter || { dao: daoId };

  const { data, error, ...rest } = useQuery(
    ['molochV3Members', { daoId, chainId }],
    () =>
      fetchMembers({
        chainId,
        filter: defaultFilter,
        paging,
        ordering,
        graphApiKeys,
      }),
    { enabled: !!daoId && !!chainId && !!defaultFilter && !!ordering }
  );

  return {
    members: data?.items,
    error: error as Error,
    ...rest,
  };
};
