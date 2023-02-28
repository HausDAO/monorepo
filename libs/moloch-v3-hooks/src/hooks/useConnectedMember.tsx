import {
  getGraphUrl,
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';

import { MolochV3Member } from '@daohaus/moloch-v3-data';
import { useQuery } from 'react-query';
import { handleErrorMessage } from '@daohaus/utils';
import { fetchMember } from '@daohaus/moloch-v3-context';
import { DaoQueryKeys, daoScopedQueryId } from '../utils';
import { useCurrentDao } from '../contexts';

const findUserMember = async ({
  daoChain,
  daoId,
  memberAddress,
  graphApiKeys,
}: {
  daoChain?: ValidNetwork;
  daoId?: string;
  memberAddress?: string;
  graphApiKeys: Keychain;
}): Promise<MolochV3Member> => {
  if (!daoChain || !daoId || !memberAddress)
    throw new Error(
      'useConnectedMember requires a daoChain, daoId, and memberAddress'
    );

  const url = getGraphUrl(daoChain, graphApiKeys);

  if (!url) throw new Error('No graph url found for network: ' + daoChain);

  try {
    const res = await fetchMember({
      daoid: daoId,
      daochain: daoChain,
      address: memberAddress,
      graphApiKeys,
    });
    if (!res) return;
    return res as MolochV3Member;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ fallback: 'Error fetching user member', error })
    );
  }
};

export const useConnectedMember = (props?: {
  daoChain: string;
  daoId: string;
  memberAddress: string | null;
  graphApiKeys?: Keychain;
}) => {
  const {
    daoChain: daoChainOverride,
    daoId: daoIdOverride,
    memberAddress: memberAddressOverride,
    graphApiKeys = GRAPH_API_KEYS,
  } = props || {};

  const {
    userAddress: memberAddressFromContext,
    daoChain: networkFromContext,
    daoId: daoIdFromContext,
  } = useCurrentDao?.() || {};

  const daoId = daoIdOverride || daoIdFromContext;
  const daoChain = daoChainOverride || networkFromContext;
  const memberAddress = memberAddressOverride || memberAddressFromContext;

  const queryId = daoScopedQueryId({
    daoId,
    daoChain,
    domain: DaoQueryKeys.ConnectedMember,
  });

  const { data, error, ...rest } = useQuery(
    [queryId, { daoChain, daoId, memberAddress }],
    () =>
      findUserMember({
        daoChain: daoChain as ValidNetwork,
        daoId,
        memberAddress: memberAddress as string,
        graphApiKeys,
      }),
    { enabled: !!daoChain && !!daoId && !!memberAddress }
  );

  return {
    connectedMember: data as MolochV3Member,
    error: error as Error | undefined,
    ...rest,
    isMember: !!data,
  };
};
