// import { IProviderOptions } from 'web3modal';
import WalletConnectProvider from '@walletconnect/ethereum-provider';

import { HAUS_RPC } from '@daohaus/keychain-utils';

// remove

// const providerOptions: IProviderOptions = {
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: HAUS_RPC['0x1'],
        5: HAUS_RPC['0x5'],
        100: HAUS_RPC['0x64'],
        10: HAUS_RPC['0xa'],
        137: HAUS_RPC['0x89'],
        42161: HAUS_RPC['0xa4b1'],
      },
    },
  },
};

export const web3modalDefaults = {
  cacheProvider: true,
  providerOptions,
  theme: 'dark',
};

export const defaultConnectValues = {
  provider: undefined,
  chainId: undefined,
  address: undefined,
  profile: {
    address: '',
    ens: undefined,
  },
  connectWallet: async () => undefined,
  disconnect: () => undefined,
  isConnecting: true,
  isConnected: false,
  isMetamask: false,
  networks: {},
  switchNetwork: () => undefined,
  isProfileLoading: false,
  daoChainId: undefined,
  validNetwork: false,
  isAppNetwork: () => false,
  appNetworks: [],
  daoId: undefined,
  daoChain: undefined,
  publicClient: undefined,
};
