import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  HAUS_NETWORK_DATA,
  isValidNetwork,
  NetworkConfigs,
  ValidNetwork,
} from '@daohaus/keychain-utils';

import {
  getModal,
  handleConnectWallet,
  handleSwitchNetwork,
  isMetamaskProvider,
  loadProfile,
  loadWallet,
} from './utils/contextHelpers';

import { defaultConnectValues, web3modalDefaults } from './utils/defaults';

import {
  ConnectLifecycleFns,
  ModalOptions,
  ProviderType,
  UserProfile,
  WalletStateType,
} from './utils/types';

export type UserConnectType = {
  provider: ProviderType | null | undefined;
  chainId: ValidNetwork | null | undefined;
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
  daoId?: string;
  daoChain?: string;
};

export const ConnectContext =
  createContext<UserConnectType>(defaultConnectValues);

export type ConnectProviderProps = {
  web3modalOptions?: ModalOptions;
  networks?: NetworkConfigs;
  children: ReactNode;
  daoChainId?: string;
  lifeCycleFns?: ConnectLifecycleFns;
  daoId?: string;
  daoChain?: string;
};

export const ConnectProvider = ({
  web3modalOptions = web3modalDefaults,
  children,
  networks = HAUS_NETWORK_DATA,
  lifeCycleFns,
  daoChainId,
  daoId,
  daoChain,
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
    if (address && chainId && isConnected && address !== profile?.address) {
      loadProfile({
        address,
        chainId,
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
  }, [address, chainId, isConnected, networks, lifeCycleFns, profile]);

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
    <ConnectContext.Provider
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
        daoId,
        daoChain,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export const useConnect = () => useContext(ConnectContext);
