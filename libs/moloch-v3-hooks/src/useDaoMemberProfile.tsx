import { findMember } from '@daohaus/moloch-v3-data';
import {
  ValidNetwork,
  Keychain,
  GRAPH_API_KEYS,
} from '@daohaus/keychain-utils';
import { useQuery } from 'react-query';
import { MolochV3Member } from '@daohaus/moloch-v3-data';
import { AccountProfile, handleErrorMessage } from '@daohaus/utils';

const fetchMember = async ({
  chainId,
  daoId,
  memberAddress,
  graphApiKeys,
}: {
  chainId: ValidNetwork;
  daoId: string;
  graphApiKeys: Keychain;
  memberAddress: string;
}) => {
  try {
    const data = await findMember({
      networkId: chainId,
      graphApiKeys,
      dao: daoId,
      memberAddress: memberAddress.toLowerCase(),
    });

    if (!data?.data?.member) throw new Error('No member or profile found');

    return { ...(data.data.member as MolochV3Member) };
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: 'Error fetching member' })
    );
  }
};

export const useMember = ({
  chainId,
  daoId,
  memberAddress,
  graphApiKeys = GRAPH_API_KEYS,
}: {
  chainId: ValidNetwork;
  daoId: string;
  graphApiKeys?: Keychain;
  memberAddress: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`MolochV3Member/${memberAddress}`, { chainId, daoId, memberAddress }],
    () => fetchMember({ chainId, daoId, memberAddress, graphApiKeys }),
    { enabled: !!chainId && !!daoId && !!memberAddress }
  );
  return { member: data, error: error as Error, ...rest };
};
