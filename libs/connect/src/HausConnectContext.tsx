import { useContext } from 'react';

import {
  ConnectContext,
  ConnectProvider,
  ConnectProviderProps,
  UserConnectType,
} from '@daohaus/connect-context';
import { useToast } from '@daohaus/ui';

export const DHConnectProvider = (props: ConnectProviderProps) => {
  const { defaultToast, errorToast } = useToast();

  return (
    <ConnectProvider
      {...props}
      lifeCycleFns={{
        onConnect: () => {
          defaultToast({ title: 'Connected' });
        },
        onConnectError(error) {
          errorToast({
            title: 'Error connecting',
            description: error.message,
          });
        },
        onProfileError(error) {
          errorToast({
            title: 'Error loading profile',
            description: error.message,
          });
        },
      }}
    />
  );
};
export const useDHConnect = (): UserConnectType => useContext(ConnectContext);

export default DHConnectProvider;
