import {
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';

import { findMember } from '@daohaus/moloch-v3-data';
import { useQuery } from 'react-query';
import { useCurrentDao } from '../contexts';
import { DaoQueryKeys, daoScopedQueryId } from '../utils';

const fetchMember = async ({
  daoId,
  daoChain,
  memberAddress,
  graphApiKeys,
}: {
  daoId?: string;
  daoChain?: ValidNetwork;
  memberAddress?: string;
  graphApiKeys?: Keychain;
}) => {
  if (!daoChain || !daoId || !memberAddress) return;

  try {
    const res = await findMember({
      dao: daoId,
      memberAddress,
      networkId: daoChain,
      graphApiKeys,
    });
    console.log(res);
    return res?.data?.member;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching proposal');
  }
};

export const useDaoMember = (props?: {
  daoChain: ValidNetwork;
  daoId: string;
  memberAddress: string;
  graphApiKeys?: Keychain;
}) => {
  const {
    daoChain: daoChainOverride,
    daoId: daoIdOverride,
    memberAddress: memberAddressOverride,
    graphApiKeys = GRAPH_API_KEYS,
  } = props || {};

  const {
    memberAddress: memberAddressFromRouter,
    daoChain: networkFromRouter,
    daoId: daoIdFromRouter,
  } = useCurrentDao();

  const daoId = daoIdOverride || daoIdFromRouter;
  const daoChain = daoChainOverride || networkFromRouter;
  const memberAddress = memberAddressOverride || memberAddressFromRouter;

  const { data, error, ...rest } = useQuery(
    [
      daoScopedQueryId({
        daoId,
        daoChain,
        domain: DaoQueryKeys.SingleMember,
      }),
      {
        daoChain,
        daoId,
        memberAddress,
      },
    ],
    () =>
      fetchMember({
        daoId,
        daoChain,
        memberAddress,
        graphApiKeys,
      }),
    {
      enabled: !!daoId && !!daoChain && !!memberAddress,
    }
  );

  return { member: data, error, ...rest };
};
