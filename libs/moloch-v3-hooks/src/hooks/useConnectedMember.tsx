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

const findUserMember = async ({
  daoChain,
  daoId,
  memberAddress,
  graphApiKeys,
}: {
  daoChain: ValidNetwork;
  daoId: string;
  memberAddress: string;
  graphApiKeys: Keychain;
}): Promise<MolochV3Member> => {
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

export const useConnectedMember = ({
  daoChain,
  daoId,
  memberAddress,
  graphApiKeys = GRAPH_API_KEYS,
}: {
  daoChain: string;
  daoId: string;
  memberAddress: string | null;
  graphApiKeys?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    [
      `connectedMember/${daoChain}/${daoId}/${memberAddress}`,
      { daoChain, daoId, memberAddress },
    ],
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
