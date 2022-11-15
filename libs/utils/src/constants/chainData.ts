import { Keychain, NetworkType, ValidNetwork } from '../types';
import { isString } from '../utils';

export const VALID_NETWORKS = {
  '0x1': true,
  '0x5': true,
  '0x64': true,
  '0xa': true,
  '0x89': true,
  '0xa4b1': true,
  '0xa4ec': true,
};

export const isValidNetwork = (
  str: unknown,
  networks?: Keychain<unknown>
): str is ValidNetwork =>
  isString(str) && networks
    ? networks[str as ValidNetwork] !== undefined
    : VALID_NETWORKS[str as ValidNetwork] !== undefined;

export const NETWORK_DATA: Keychain<NetworkType> = {
  // '0x1': {
  //   chainId: '0x1',
  //   networkId: 1,
  //   name: 'Mainnet',
  //   symbol: 'ETH',
  //   tokenDecimals: 18,
  // },
  '0x5': {
    chainId: '0x5',
    networkId: 5,
    name: 'Goerli',
    symbol: 'ETH',
    tokenDecimals: 18,
  },
  '0x64': {
    chainId: '0x64',
    networkId: 100,
    name: 'Gnosis Chain',
    symbol: 'XDAI',
    tokenDecimals: 18,
  },
};

export const getNetwork = (chainId: string | undefined) => {
  if (!isValidNetwork(chainId)) {
    return null;
  }
  return NETWORK_DATA[chainId];
};

export const getNetworkName = (chainId: string | undefined) => {
  return getNetwork(chainId)?.name || null;
};

export const addKeychain = (
  keychain: Keychain<unknown>,
  property: string,
  networkList: Keychain<NetworkType> = NETWORK_DATA
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
