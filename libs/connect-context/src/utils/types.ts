import { providers } from 'ethers';
// import { ICoreOptions } from 'web3modal';

import { AccountProfile } from '@daohaus/utils';
import { ValidNetwork } from '@daohaus/keychain-utils';

export type ConnectLifecycleFns = {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onChainChanged?: (chainId: string) => void;
  onAccountsChanged?: () => void;
  onConnectError?: (error: Error) => void;
  onProfileError?: (error: Error) => void;
};

export type ProviderType = providers.Web3Provider;

export type UserProfile = AccountProfile & { displayName?: string };

// remove

export type WalletStateType = {
  provider?: providers.Web3Provider;
  chainId?: ValidNetwork;
  address?: string;
};
// export type ModalOptions = Partial<ICoreOptions>;

export type ModalOptions = {
  cacheProvider: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  providerOptions: any;
  theme: string;
};
