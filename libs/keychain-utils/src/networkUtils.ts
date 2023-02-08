import { Keychain, NetworkConfigs, ValidNetwork } from './types';
import { HAUS_NETWORK_DATA } from './networkData';
import { VALID_NETWORKS } from './validNetworks';

export const isValidNetwork = (
  str: unknown,
  networks?: Keychain<unknown>
): str is ValidNetwork =>
  networks
    ? networks[str as ValidNetwork] !== undefined
    : VALID_NETWORKS[str as ValidNetwork] !== undefined;

export const getNetwork = (
  chainId: string | undefined,
  networks = HAUS_NETWORK_DATA
) => {
  if (!isValidNetwork(chainId)) {
    return null;
  }
  return networks[chainId];
};

export const getNetworkName = (
  chainId: string | undefined,
  networks?: NetworkConfigs
) => {
  return getNetwork(chainId, networks)?.name || null;
};
