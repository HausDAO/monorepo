import { MolochV3Dao, findDao } from '@daohaus/moloch-v3-data';
import {
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';
import { useQuery } from 'react-query';
import { EthAddress, handleErrorMessage } from '@daohaus/utils';
import { useCurrentDao } from '../rage/CurrentDaoContext';
import { DaoQueryKeys, daoScopedQueryId } from '../rage';

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

type DaoDataProps =
  | {
      daoId?: EthAddress;
      daoChain?: ValidNetwork;
      graphApiKeys?: Keychain;
    }
  | undefined;

export const useDaoData = (props?: DaoDataProps | undefined) => {
  const {
    daoId: daoIdOverride,
    daoChain: daoChainOverride,
    graphApiKeys = GRAPH_API_KEYS,
  } = props || {};

  const { daoId: idFromRouter, daoChain: networkFromRouter } =
    useCurrentDao?.() || {};
  const daoId = daoIdOverride || idFromRouter;
  console.log('daoId', daoId);
  const daoChain = daoChainOverride || networkFromRouter;

  const { data, error, ...rest } = useQuery(
    [
      daoScopedQueryId({
        daoChain,
        daoId,
        domain: DaoQueryKeys.Dao,
      }),
      { daoId, daoChain },
    ],
    () => fetchDao({ daoId, daoChain, graphApiKeys }),
    {
      enabled: !!daoId && !!daoChain,
    }
  );

  return { dao: data, error: error as Error, ...rest };
};
