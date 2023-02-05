import { MolochV3Dao, findDao } from '@daohaus/moloch-v3-data';
import { GRAPH_API_KEYS, Keychain } from '@daohaus/keychain-utils';
import { useQuery } from 'react-query';
import { handleErrorMessage } from '@daohaus/utils';

export const fetchDao = async ({
  daoid,
  daochain,
  graphApiKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  graphApiKeys: Keychain;
}) => {
  try {
    const daoRes = await findDao({
      networkId: daochain,
      dao: daoid,
      includeTokens: true,
      graphApiKeys,
    });
    return daoRes?.data?.dao as MolochV3Dao;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: 'Error fetching DAO' })
    );
  }
};

export const useDaoData = ({
  daoid,
  daochain,
  graphApiKeys = GRAPH_API_KEYS,
}: {
  daoid: string;
  daochain: keyof Keychain;
  graphApiKeys?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    ['MolochV3DAO', { daoid, daochain }],
    () => fetchDao({ daoid, daochain, graphApiKeys }),
    { enabled: !!daoid && !!daochain }
  );

  return { dao: data, error: error as Error | undefined, ...rest };
};
