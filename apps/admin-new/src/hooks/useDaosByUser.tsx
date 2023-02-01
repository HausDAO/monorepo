import { Ordering } from '@daohaus/data-fetch-utils';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import {
  Dao_Filter,
  Dao_OrderBy,
  listDaosByMember,
  Member_Filter,
} from '@daohaus/moloch-v3-data';
import { MolochV3Membership } from '@daohaus/utils';
import { useQuery } from 'react-query';

export const HAUS_GRAPH_KEYS = {
  '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'],
};

export const useDaosByUser = ({
  userAddress,
  networkIds,
  daoFilter,
  memberFilter,
  graphApiKeys = HAUS_GRAPH_KEYS,
  ordering = {
    orderBy: 'createdAt',
    orderDirection: 'desc',
  },
}: {
  userAddress: string;
  networkIds: ValidNetwork[];
  daoFilter?: Dao_Filter;
  memberFilter?: Member_Filter;
  graphApiKeys?: Keychain<string>;
  ordering?: Ordering<Dao_OrderBy>;
}) => {
  const { data, error, ...rest } = useQuery(
    [
      `daosByUser-${userAddress}`,
      { networkIds, daoFilter, memberFilter, ordering },
    ],
    () =>
      listDaosByMember({
        memberAddress: userAddress,
        networkIds,
        daoFilter,
        memberFilter,
        ordering,
        graphApiKeys,
      }),
    {
      enabled: !!userAddress,
      keepPreviousData: true,
    }
  );

  return {
    daos: data?.data?.daos as MolochV3Membership[] | undefined,
    error: error as Error | undefined,
    ...rest,
  };
};
