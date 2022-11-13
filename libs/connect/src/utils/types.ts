import { providers } from 'ethers';
import { ICoreOptions } from 'web3modal';

import { AccountProfile } from '@daohaus/utils';

export type ModalEvents = (
  eventName: 'error' | 'accountsChanged' | 'chainChanged',
  error?: { code: string; message: string }
) => void;
export type ProviderType = providers.Web3Provider;

export type WalletStateType = {
  provider?: providers.Web3Provider | null | undefined;
  chainId?: string | null | undefined;
  address?: string | null | undefined;
};
export type UserProfile = AccountProfile & { displayName?: string };
export type ModalOptions = Partial<ICoreOptions>;
