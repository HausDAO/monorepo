import { useContext } from 'react';

import {
  ConnectContext,
  ConnectProvider,
  ConnectProviderProps,
  UserConnectType,
} from '@daohaus/connect-context';
import { useToast } from '@daohaus/ui';

export const DHConnectProvider = (props: ConnectProviderProps) => {
  const { defaultToast } = useToast();

  return (
    <ConnectProvider
      {...props}
      lifeCycleFns={{
        onConnect: () => {
          defaultToast({ title: 'Connected' });
        },
        onDisconnect: () => {
          defaultToast({ title: 'Disconnected' });
        },
        onChainChanged: () => {
          defaultToast({ title: 'Chain Changed' });
        },
      }}
    />
  );
};
export const useHausConnect = (): UserConnectType => useContext(ConnectContext);

export default DHConnectProvider;
