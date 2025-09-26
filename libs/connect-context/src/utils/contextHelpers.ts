import { Dispatch, SetStateAction } from 'react';
import { NetworkConfigs } from '@daohaus/keychain-utils';
import { getProfileForAddress } from '@daohaus/profile-data';

import { UserProfile, ConnectLifecycleFns } from './types';

export const numberToHex = (number: number) => {
  return `0x${number.toString(16)}`;
};

export const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const loadProfile = async ({
  address,
  setProfile,
  setProfileLoading,
  shouldUpdate,
  lifeCycleFns,
  networks,
}: {
  address: string;
  setProfile: Dispatch<SetStateAction<UserProfile>>;
  setProfileLoading: Dispatch<SetStateAction<boolean>>;
  shouldUpdate: boolean;
  lifeCycleFns?: ConnectLifecycleFns;
  networks: NetworkConfigs;
}) => {
  try {
    setProfileLoading(true);
    const profile = await getProfileForAddress({
      address,
      rpcUri: networks['0x1']?.rpc,
    });
    if (profile && shouldUpdate) {
      const displayName = profile.ens || truncateAddress(address);
      setProfile({ ...profile, displayName });
    } else if (shouldUpdate) {
      setProfile({
        address,
        ens: '',
        displayName: truncateAddress(address),
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (web3Error: any) {
    const errMsg =
      typeof web3Error === 'string'
        ? web3Error
        : web3Error?.message || 'Unknown Error';
    lifeCycleFns?.onConnectError?.({
      name: 'Connection Error',
      message: errMsg,
    });
    // Silent profile load failure
    setProfile({
      displayName: truncateAddress(address),
      address,
      ens: '',
    });
    lifeCycleFns?.onProfileError?.(web3Error);
  } finally {
    if (shouldUpdate) {
      setProfileLoading(false);
    }
  }
};
