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
import { useAccount, useDisconnect } from 'wagmi';

import {
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

  provider?: ProviderType;
  chainId?: ValidNetwork;
  profile: UserProfile;
  isConnecting: boolean;
  isConnected: boolean;
  isMetamask: boolean;
  switchNetwork: (chainId: string) => void;
  isProfileLoading: boolean;
  validNetwork: boolean;
  isAppNetwork: (chainId: string) => boolean;
  appNetworks: string[];
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
  const { address, isConnecting, status } = useAccount({
    onDisconnect() {
      console.log('Disconnected');
    },
  });
  const { disconnect } = useDisconnect();

  console.log('status', status);

  // todo: also provider and connected chainid?
  const isConnected = useMemo(() => !!address, [address]);

  const connectWallet = useCallback(async () => {
    // handleConnectWallet({
    //   setConnecting,
    //   lifeCycleFns,
    //   disconnect,
    //   setWalletState,
    //   web3modalOptions,
    // });
    console.log('opening daochain', daoChainId);

    if (daoChainId && wgmiChains[daoChainId as ValidNetwork]) {
      // this autochanges to the daochain - do we want that? seems nice - deal with on autoconnect on revist
      // handle if there is a target chain in the context as well - ie summoner
      // handle if unsupported chain?
      setDefaultChain(wgmiChains[daoChainId as ValidNetwork]);
    }

    // could change which view we show if connected?

    open();
  }, [open, setDefaultChain, daoChainId]);

  const provider = undefined;
  const chainId = undefined;
  const isMetamask = false;
  const switchNetwork = (chainId: string) => undefined;
  const profile = { address: address || '', ens: undefined };
  const isProfileLoading = false;
  const validNetwork = true;
  const isAppNetwork = (chainId: string) => true;
  const appNetworks = ['1'];

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
        //
        provider,
        chainId,
        isMetamask,
        switchNetwork,
        profile,
        isProfileLoading,
        validNetwork,
        isAppNetwork,
        appNetworks,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export const useConnect = () => useContext(ConnectContext);
