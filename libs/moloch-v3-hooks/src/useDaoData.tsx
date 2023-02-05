import { MolochV3Dao, findDao } from '@daohaus/moloch-v3-data';
import {
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';
import { useQuery } from 'react-query';
import { EthAddress, handleErrorMessage } from '@daohaus/utils';

export const fetchDao = async ({
  daoId,
  daoChain,
  graphApiKeys,
}: {
  daoId?: EthAddress;
  daoChain?: ValidNetwork;
  graphApiKeys: Keychain;
}) => {
  if (!daoId || !daoChain) return;
  try {
    const daoRes = await findDao({
      networkId: daoChain,
      dao: daoId,
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
  daoId,
  daoChain,
  graphApiKeys = GRAPH_API_KEYS,
}: {
  daoId?: EthAddress;
  daoChain?: ValidNetwork;
  graphApiKeys?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    ['MolochV3DAO', { daoId, daoChain }],
    () => fetchDao({ daoId, daoChain, graphApiKeys }),
    { enabled: !!daoId && !!daoChain }
  );

  return { dao: data, error: error as Error, ...rest };
};
