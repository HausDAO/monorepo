import { HAUS_RPC } from '@daohaus/keychain-utils';
import { getProfileForAddress } from '@daohaus/profile-data';
import { useQuery } from 'react-query';

const fetchProfile = async ({
  address,
  ensNetwork,
  rpcs,
}: {
  address: string;
  ensNetwork: string;
  rpcs: Record<string, string>;
}) => {
  const rpcUri = rpcs[ensNetwork];

  if (!rpcUri) {
    throw new Error('Invalid RPC URI');
  }

  const profile = await getProfileForAddress(address, rpcUri);

  return profile;
};

export const useProfile = ({
  address,
  ensNetwork = '0x1',
  rpcs = HAUS_RPC,
}: {
  address: string;
  ensNetwork?: string;
  rpcs?: Record<string, string>;
}) => {
  const { data, error, ...rest } = useQuery(
    [`globalProfile-${address}`],
    () => fetchProfile({ address, ensNetwork, rpcs }),
    { enabled: !!address }
  );

  return { profile: data, error, ...rest };
};
