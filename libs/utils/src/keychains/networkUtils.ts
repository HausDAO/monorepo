import { Keychain, NetworkType, ValidNetwork } from './types';
import { isString } from '../utils';
import { HAUS_NETWORK_DATA } from './networkData';
import { VALID_NETWORKS } from './validNetworks';

export const isValidNetwork = (
  str: unknown,
  networks?: Keychain<unknown>
): str is ValidNetwork =>
  isString(str) && networks
    ? networks[str as ValidNetwork] !== undefined
    : VALID_NETWORKS[str as ValidNetwork] !== undefined;

export const getNetwork = (chainId: string | undefined) => {
  if (!isValidNetwork(chainId)) {
    return null;
  }
  return HAUS_NETWORK_DATA[chainId];
};

export const getNetworkName = (chainId: string | undefined) => {
  return getNetwork(chainId)?.name || null;
};

export const addKeychain = (
  keychain: Keychain<unknown>,
  property: string,
  networkList: Keychain<NetworkType> = HAUS_NETWORK_DATA
) => {
  return Object.values(networkList).reduce((acc, networkObj) => {
    const { chainId } = networkObj;
    if (!isValidNetwork(chainId)) {
      console.warn(`Invalid network: ${chainId}`);
      return acc;
    }
    return {
      ...acc,
      [chainId]: {
        ...networkObj,
        [property]: keychain[chainId],
      },
    };
  }, {});
};
