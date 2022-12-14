import { ENDPOINTS, HAUS_RPC } from './endpoints';
import { Keychain, NetworkConfig } from './types';

export const HAUS_NETWORK_DATA: Keychain<NetworkConfig> = {
  '0x1': {
    chainId: '0x1',
    networkId: 1,
    name: 'Mainnet',
    symbol: 'ETH',
    tokenDecimals: 18,
    explorer: ENDPOINTS.EXPLORER['0x1'] as string,
    rpc: HAUS_RPC['0x1'] as string,
  },
  '0x5': {
    chainId: '0x5',
    networkId: 5,
    name: 'Goerli',
    symbol: 'ETH',
    tokenDecimals: 18,
    explorer: ENDPOINTS.EXPLORER['0x5'] as string,
    rpc: HAUS_RPC['0x5'] as string,
  },
  '0x64': {
    chainId: '0x64',
    networkId: 100,
    name: 'Gnosis Chain',
    symbol: 'XDAI',
    tokenDecimals: 18,
    explorer: ENDPOINTS.EXPLORER['0x64'] as string,
    rpc: HAUS_RPC['0x1'] as string,
  },
};
