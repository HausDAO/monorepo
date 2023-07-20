import { AccountProfile } from '@daohaus/utils';

export type ConnectLifecycleFns = {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onChainChanged?: (chainId: string) => void;
  onAccountsChanged?: () => void;
  onConnectError?: (error: Error) => void;
  onProfileError?: (error: Error) => void;
};

export type UserProfile = AccountProfile & { displayName?: string };
