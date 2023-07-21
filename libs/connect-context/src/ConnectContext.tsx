import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useWeb3Modal } from '@web3modal/react';
import {
  useAccount,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
  usePublicClient,
  PublicClient,
} from 'wagmi';

import {
  getNetworkById,
  HAUS_NETWORK_DATA,
  isValidNetwork,
  NetworkConfigs,
  ValidNetwork,
  VIEM_CHAINS,
} from '@daohaus/keychain-utils';

import { defaultConnectValues } from './utils/defaults';
import { ConnectLifecycleFns, UserProfile } from './utils/types';
import { loadProfile } from './utils';

export type UserConnectType = {
  networks: NetworkConfigs;
  daoId?: string;
  daoChainId?: string;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  address?: string;
  chainId?: ValidNetwork;
  validNetwork: boolean;
  isConnecting: boolean;
  isConnected: boolean;
  switchNetwork: (chainId: string) => void;
  profile: UserProfile;
  isProfileLoading: boolean;
  publicClient?: PublicClient;
};

export const ConnectContext =
  createContext<UserConnectType>(defaultConnectValues);

export type ConnectProviderProps = {
  networks?: NetworkConfigs;
  children: ReactNode;
  lifeCycleFns?: ConnectLifecycleFns;
  daoId?: string;
  daoChainId?: string;
};

export const ConnectProvider = ({
  children,
  networks = HAUS_NETWORK_DATA,
  lifeCycleFns,
  daoChainId,
  daoId,
}: ConnectProviderProps) => {
  const { open, setDefaultChain } = useWeb3Modal();
  const { address, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const publicClient = usePublicClient();

  const [profile, setProfile] = useState<UserProfile>({
    address: address || '',
    ens: undefined,
  });
  const [isProfileLoading, setProfileLoading] = useState(false);

  const isConnected = useMemo(() => !!address && !!chain, [address, chain]);

  const chainId = useMemo(() => {
    if (chain) {
      const networkData = getNetworkById(chain.id);
      return networkData?.chainId as ValidNetwork;
    }
    return undefined;
  }, [chain]);

  const validNetwork = useMemo(
    () => !!chainId && isValidNetwork(chainId, networks),
    [chainId, networks]
  );

  const connectWallet = useCallback(async () => {
    if (daoChainId && VIEM_CHAINS[daoChainId as ValidNetwork]) {
      setDefaultChain(VIEM_CHAINS[daoChainId as ValidNetwork]);
    }
    open();
  }, [open, setDefaultChain, daoChainId]);

  const handleSwitchNetwork = async (_chainId: string | number) => {
    switchNetwork?.(Number(_chainId));
  };

  const loadAccountProfile = useCallback(
    (
      address: string | null | undefined,
      chainId: ValidNetwork | null | undefined,
      shouldUpdate: boolean
    ) => {
      if (
        address &&
        chainId &&
        isConnected &&
        !isProfileLoading &&
        address !== profile?.address
      ) {
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
    },
    [isConnected, isProfileLoading, networks, lifeCycleFns, profile]
  );

  useEffect(() => {
    let shouldUpdate = true;
    loadAccountProfile(address, chainId, shouldUpdate);
    return () => {
      shouldUpdate = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chainId]);

  return (
    <ConnectContext.Provider
      value={{
        networks,
        daoChainId,
        daoId,
        address,
        connectWallet,
        disconnect,
        switchNetwork: handleSwitchNetwork,
        isConnected,
        isConnecting,
        chainId,
        validNetwork,
        profile,
        isProfileLoading,
        publicClient,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export const useConnect = () => useContext(ConnectContext);
