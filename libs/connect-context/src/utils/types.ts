import { providers } from 'ethers';
import { ICoreOptions } from 'web3modal';

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

export type WalletStateType = {
  provider?: providers.Web3Provider | null | undefined;
  chainId?: ValidNetwork | null | undefined;
  address?: string | null | undefined;
};
export type UserProfile = AccountProfile & { displayName?: string };
export type ModalOptions = Partial<ICoreOptions>;
