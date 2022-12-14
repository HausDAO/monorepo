import { IProviderOptions } from 'web3modal';
import WalletConnectProvider from '@walletconnect/ethereum-provider';

import { HAUS_RPC } from '@daohaus/keychain-utils';

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: HAUS_RPC['0x1'],
        5: HAUS_RPC['0x5'],
        100: HAUS_RPC['0x64'],
      },
    },
  },
};

export const web3modalDefaults = {
  cacheProvider: true,
  providerOptions,
  theme: 'dark',
};

export const defaultWalletValues = {
  provider: null,
  chainId: null,
  address: null,
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
};
