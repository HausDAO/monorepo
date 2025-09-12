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
import InternalConnectModal from './components/InternalConnectModal';

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

// Always use internal connect modal (Web3Modal removed)
const useInternal = true;

export const ConnectProvider = ({
  children,
  networks = HAUS_NETWORK_DATA,
  lifeCycleFns,
  daoChainId,
  daoId,
}: ConnectProviderProps) => {
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

  const [internalOpen, setInternalOpen] = useState(false);

  const connectWallet = useCallback(async () => {
    setInternalOpen(true);
  }, []);

  const handleSwitchNetwork = async (_chainId: string | number) => {
    switchNetwork?.(Number(_chainId));
  };

  const loadAccountProfile = useCallback(
    (
      address: string | null | undefined,
      chainId: ValidNetwork | null | undefined,
      shouldUpdate: boolean
    ) => {
      if (address && chainId && isConnected && !isProfileLoading) {
        loadProfile({
          address,
          setProfile,
          setProfileLoading,
          shouldUpdate,
          networks,
          lifeCycleFns,
        });
      }
    },
    [isConnected, isProfileLoading, networks, lifeCycleFns]
  );

  useEffect(() => {
    let shouldUpdate = true;

    loadAccountProfile(address, chainId, shouldUpdate);
    return () => {
      shouldUpdate = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chainId]);

  // Auto switch to daoChainId if provided and connected and mismatch
  useEffect(() => {
    if (
      daoChainId &&
      isConnected &&
      chain &&
      Number(daoChainId) !== chain.id &&
      switchNetwork
    ) {
      switchNetwork(Number(daoChainId));
    }
  }, [daoChainId, isConnected, chain, switchNetwork]);

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
      {useInternal && (
        <InternalConnectModal
          open={internalOpen}
          onClose={() => setInternalOpen(false)}
          defaultChainId={daoChainId ? Number(daoChainId) : undefined}
        />
      )}
    </ConnectContext.Provider>
  );
};

export const useConnect = () => useContext(ConnectContext);
