import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { HAUS_NETWORK_DATA, isValidNetwork } from '@daohaus/utils';

import {
  getModal,
  handleConnectWallet,
  handleSwitchNetwork,
  isMetamaskProvider,
  loadProfile,
  loadWallet,
} from './utils/contextHelpers';

import { defaultWalletValues, web3modalDefaults } from './utils/defaults';

import {
  ConnectLifecycleFns,
  ModalOptions,
  ProviderType,
  UserProfile,
  WalletStateType,
} from './utils/types';
import { NetworkConfigs } from '@daohaus/utils';

export type UserConnectType = {
  provider: ProviderType | null | undefined;
  chainId: string | null | undefined;
  address: string | null | undefined;
  profile: UserProfile;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  isMetamask: boolean;
  networks: NetworkConfigs;
  switchNetwork: (chainId: string) => void;
  isProfileLoading: boolean;
  daoChainId?: string;
  validNetwork: boolean;
  isAppNetwork: (chainId: string) => boolean;
  appNetworks: string[];
};

export const HausConnectContext =
  createContext<UserConnectType>(defaultWalletValues);

type ConnectProviderProps = {
  web3modalOptions?: ModalOptions;
  networks?: NetworkConfigs;
  children: ReactNode;
  daoChainId?: string;
  lifeCycleFns?: ConnectLifecycleFns;
};

export const HausConnectProvider = ({
  web3modalOptions = web3modalDefaults,
  children,
  networks = HAUS_NETWORK_DATA,
  lifeCycleFns,
  daoChainId,
}: ConnectProviderProps) => {
  const [isConnecting, setConnecting] = useState(true);
  const [{ provider, chainId, address }, setWalletState] =
    useState<WalletStateType>({});
  const [profile, setProfile] = useState<UserProfile>({
    address: address || '',
    ens: undefined,
  });
  const [isProfileLoading, setProfileLoading] = useState(false);

  const isConnected = useMemo(
    () => !!provider && !!address && !!chainId,
    [provider, address, chainId]
  );
  const isMetamask = useMemo(() => isMetamaskProvider(provider), [provider]);
  const validNetwork = useMemo(
    () => !!chainId && isValidNetwork(chainId, networks),
    [chainId, networks]
  );
  const appNetworks = useMemo(
    () => Object.values(networks).map((network) => network.chainId),
    [networks]
  );

  useEffect(() => {
    loadWallet({
      setConnecting,
      web3modalOptions,
      disconnect,
      setWalletState,
    });
  }, [web3modalOptions, setWalletState]);

  useEffect(() => {
    let shouldUpdate = true;
    if (address && isConnected) {
      loadProfile({
        address,
        setProfile,
        setProfileLoading,
        shouldUpdate,
        networks,
        lifeCycleFns,
      });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [address, isConnected, networks, lifeCycleFns]);

  const connectWallet = useCallback(async () => {
    handleConnectWallet({
      setConnecting,
      lifeCycleFns,
      disconnect,
      setWalletState,
      web3modalOptions,
    });
  }, [setConnecting, lifeCycleFns, web3modalOptions]);

  const switchNetwork = async (_chainId: string | number) => {
    handleSwitchNetwork(_chainId, networks);
  };

  const disconnect = async () => {
    const modal = getModal(web3modalDefaults);
    modal.clearCachedProvider();
    setWalletState({});
  };

  const isAppNetwork = (chainId: string) => appNetworks.includes(chainId);
  return (
    <HausConnectContext.Provider
      value={{
        provider,
        address,
        chainId,
        connectWallet,
        isConnected,
        isConnecting,
        disconnect,
        isMetamask,
        networks,
        switchNetwork,
        profile,
        isProfileLoading,
        daoChainId,
        validNetwork,
        isAppNetwork,
        appNetworks,
      }}
    >
      {children}
    </HausConnectContext.Provider>
  );
};
export const useHausConnect = (): UserConnectType =>
  useContext(HausConnectContext);
