import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { isValidNetwork } from '@daohaus/utils';

import {
  getModal,
  handleConnectWallet,
  handleSwitchNetwork,
  isMetamaskProvider,
  loadProfile,
  loadWallet,
} from './utils/contextHelpers';

import {
  defaultWalletValues,
  supportedNetworks,
  web3modalDefaults,
} from './utils/defaults';

import {
  ModalEvents,
  ModalOptions,
  NetworkConfigs,
  ProviderType,
  UserProfile,
  WalletStateType,
} from './utils/types';

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
};

export const HausConnectContext =
  createContext<UserConnectType>(defaultWalletValues);

type ConnectProviderProps = {
  web3modalOptions?: ModalOptions;
  networks?: NetworkConfigs;
  children: ReactNode;
  handleModalEvents?: ModalEvents;
  daoChainId?: string;
};

export const HausConnectProvider = ({
  web3modalOptions = web3modalDefaults,
  children,
  networks = supportedNetworks,
  handleModalEvents,
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

  const connectWallet = useCallback(async () => {
    handleConnectWallet({
      setConnecting,
      handleModalEvents,
      disconnect,
      setWalletState,
      web3modalOptions,
    });
  }, [setConnecting, handleModalEvents, web3modalOptions]);

  useEffect(() => {
    loadWallet({ setConnecting, connectWallet, web3modalOptions });
  }, [web3modalOptions, connectWallet]);

  useEffect(() => {
    let shouldUpdate = true;
    if (address && isConnected) {
      loadProfile({
        address,
        setProfile,
        setProfileLoading,
        shouldUpdate,
        networks,
      });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [address, isConnected, networks]);

  const switchNetwork = async (_chainId: string | number) => {
    handleSwitchNetwork(_chainId, networks);
  };

  const disconnect = async () => {
    const modal = getModal(web3modalDefaults);
    modal.clearCachedProvider();
    setWalletState({});
  };

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
      }}
    >
      {children}
    </HausConnectContext.Provider>
  );
};
export const useHausConnect = (): UserConnectType =>
  useContext(HausConnectContext);
