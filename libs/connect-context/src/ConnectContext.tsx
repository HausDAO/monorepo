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
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';

import {
  getNetworkById,
  HAUS_NETWORK_DATA,
  isValidNetwork,
  NetworkConfigs,
  ValidNetwork,
} from '@daohaus/keychain-utils';

import { defaultConnectValues, wgmiChains } from './utils/defaults';

import { ConnectLifecycleFns, ProviderType, UserProfile } from './utils/types';
import { UseMutateFunction } from 'react-query';

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

  provider?: ProviderType;
  profile: UserProfile;
  isMetamask: boolean;
  isProfileLoading: boolean;
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
}: //

ConnectProviderProps) => {
  const { open, setDefaultChain } = useWeb3Modal();
  const { address, isConnecting } = useAccount({
    onDisconnect() {
      // we might clear some state here
      console.log('Disconnected');
    },
  });
  const { disconnect } = useDisconnect();
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  console.log('chain, chains ', chain, chains);

  // todo: add provider?
  // check this on bad chain - might switch to chainId? but validNetwork might handle that ok
  const isConnected = useMemo(() => !!address && !!chain, [address, chain]);

  // todo: this return undefined is an unsupported network - might need to track that elsewhere
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
    if (daoChainId && wgmiChains[daoChainId as ValidNetwork]) {
      // this autochanges to the daochain - do we want that? seems nice - deal with on autoconnect on revist
      // handle if there is a target chain in the context as well - ie summoner
      // handle if unsupported chain?
      setDefaultChain(wgmiChains[daoChainId as ValidNetwork]);
    }
    open();
  }, [open, setDefaultChain, daoChainId]);

  const handleSwitchNetwork = async (_chainId: string | number) => {
    switchNetwork?.(Number(_chainId));
  };

  // figure this out
  // https://wagmi.sh/react/ethers-adapters
  const provider = undefined;

  // what is this for?
  // see loadWallet in old context - lots to handle safe app connection
  // might need to deploy then test as safe app last
  const isMetamask = false;

  const profile = { address: address || '', ens: undefined };
  const isProfileLoading = false;

  return (
    <ConnectContext.Provider
      value={{
        networks,
        daoChainId,
        daoId,
        address,
        connectWallet,
        disconnect,
        isConnected,
        isConnecting,
        chainId,
        validNetwork,
        //
        provider,
        isMetamask,
        switchNetwork: handleSwitchNetwork,
        profile,
        isProfileLoading,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export const useConnect = () => useContext(ConnectContext);
