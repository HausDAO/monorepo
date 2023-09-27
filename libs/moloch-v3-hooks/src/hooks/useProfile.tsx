import { HAUS_RPC } from '@daohaus/keychain-utils';
import { getProfileForAddress } from '@daohaus/profile-data';
import { useQuery } from 'react-query';

const fetchProfile = async ({
  address,
  mainnetRpc,
}: {
  address: string;
  mainnetRpc?: string;
}) => {
  const profile = await getProfileForAddress({
    address,
    rpcUri: mainnetRpc,
  });

  return profile;
};

export const useProfile = ({
  address,
  mainnetRpc = HAUS_RPC['0x1'],
}: {
  address: string;
  mainnetRpc?: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`globalProfile-${address}`],
    () => fetchProfile({ address, mainnetRpc }),
    { enabled: !!address }
  );

  return { profile: data, error, ...rest };
};
