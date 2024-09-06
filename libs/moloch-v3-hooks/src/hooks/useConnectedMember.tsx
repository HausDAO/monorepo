import { useQuery } from 'react-query';

import {
  getGraphUrl,
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';
import { findMember, MolochV3Member } from '@daohaus/moloch-v3-data';
import { handleErrorMessage } from '@daohaus/utils';

import { DaoQueryKeys, daoScopedQueryId } from '../utils';
import { useCurrentDao } from '../contexts';

export const fetchMember = async ({
  daoid,
  daochain,
  address,
  graphApiKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  address: string;
  graphApiKeys?: Keychain;
}) => {
  try {
    const res = await findMember({
      networkId: daochain,
      dao: daoid.toLowerCase(),
      memberAddress: address.toLowerCase(),
      graphApiKeys,
    });

    if (res?.data?.member) {
      return res.data.member;
    } else {
      console.error('no member found');
      return;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

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
