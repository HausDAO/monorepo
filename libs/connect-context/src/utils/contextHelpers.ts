import React, { Dispatch, SetStateAction } from 'react';
// import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';
import { providers } from 'ethers';
import {
  isValidNetwork,
  NetworkConfigs,
  ValidNetwork,
} from '@daohaus/keychain-utils';
import { getProfileForAddress } from '@daohaus/profile-data';

import { switchChainOnMetaMask } from './metamask';
import {
  ModalOptions,
  WalletStateType,
  UserProfile,
  ConnectLifecycleFns,
} from './types';

import { type PublicClient, usePublicClient } from 'wagmi';
import { type HttpTransport } from 'viem';

export const numberToHex = (number: number) => {
  return `0x${number.toString(16)}`;
};

//remove
export const getModal = (options: ModalOptions) => {
  // const modal = new SafeAppWeb3Modal(options);
  // return modal;
};
//remove
export const isMetamaskProvider = (
  provider: providers.Web3Provider | undefined | null
) => provider?.connection?.url === 'metamask';
export const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;

// new - playing with converting the provider
export const handleSetProvider = async ({
  // provider,
  setWalletState,
  publicClient,
}: {
  // eslint-disable-next-line
  // provider: any;
  publicClient: PublicClient;
  setWalletState: Dispatch<SetStateAction<WalletStateType>>;
}) => {
  // const ethersProvider = new providers.Web3Provider(provider);
  const ethersProvider = publicClientToProvider(publicClient);

  console.log('ethersProvider', ethersProvider);
  console.log('publicClient', publicClient);

  // const signerAddress = await ethersProvider.getSigner().getAddress();
  // setWalletState({
  //   provider: ethersProvider,
  //   chainId: (typeof provider.chainId === 'number'
  //     ? `0x${Number(provider.chainId).toString(16)}`
  //     : provider.chainId) as ValidNetwork,
  //   address: signerAddress,
  // });
};

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback')
    return new providers.FallbackProvider(
      (transport['transports'] as ReturnType<HttpTransport>[]).map(
        ({ value }) => new providers.JsonRpcProvider(value?.url, network)
      )
    );
  return new providers.JsonRpcProvider(transport['url'], network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return React.useMemo(
    () => publicClientToProvider(publicClient),
    [publicClient]
  );
}

// remove old if we don't need the extra ismetamask handling
export const handleConnectWallet = async ({
  setConnecting,
  lifeCycleFns,
  disconnect,
  setWalletState,
  web3modalOptions,
}: {
  setConnecting: Dispatch<SetStateAction<boolean>>;
  lifeCycleFns?: ConnectLifecycleFns;
  disconnect: () => Promise<void>;
  setWalletState: Dispatch<SetStateAction<WalletStateType>>;
  web3modalOptions: ModalOptions;
}) => {
  try {
    setConnecting(true);

    // const modal = getModal(web3modalOptions);
    // const modalProvider = await modal.requestProvider();
    // const _isGnosisSafe = await modal.isSafeApp();

    const modalProvider = false;
    const _isGnosisSafe = false;

    if (!_isGnosisSafe) {
      // modalProvider.on('accountsChanged', () => {
      //   handleSetProvider({ provider: modalProvider, setWalletState });
      //   lifeCycleFns?.onAccountsChanged?.();
      // });
      // modalProvider.on('chainChanged', (chainId: string) => {
      //   console.log(chainId);
      //   handleSetProvider({ provider: modalProvider, setWalletState });
      //   lifeCycleFns?.onChainChanged?.(chainId);
      //   if (!isValidNetwork(chainId)) {
      //     lifeCycleFns?.onConnectError?.({
      //       name: 'UNSUPPORTED_NETWORK',
      //       message: `You have switched to an unsupported chain, Disconnecting from Metamask...`,
      //     });
      //   }
      // });
    }

    // handleSetProvider({ provider: modalProvider, setWalletState });
    lifeCycleFns?.onConnect?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (web3Error: any) {
    const errMsg =
      typeof web3Error === 'string'
        ? web3Error
        : web3Error?.message || 'Unknown Error';
    lifeCycleFns?.onConnectError?.({
      name: 'Connection Error',
      message: errMsg,
    });
    disconnect();
  } finally {
    setConnecting(false);
  }
};

// remove old if we don't need the extra ismetamask handling
export const loadWallet = async ({
  setConnecting,
  web3modalOptions,
  setWalletState,
  lifeCycleFns,
  disconnect,
}: {
  setConnecting: Dispatch<SetStateAction<boolean>>;
  web3modalOptions: ModalOptions;
  setWalletState: Dispatch<SetStateAction<WalletStateType>>;
  lifeCycleFns?: ConnectLifecycleFns;
  disconnect: () => Promise<void>;
}) => {
  // const isMetamaskUnlocked =
  //   (await window.ethereum?._metamask?.isUnlocked?.()) ?? false;
  // const modal = getModal(web3modalOptions);
  // const _isGnosisSafe = await modal.isSafeApp();

  const isMetamaskUnlocked = false;
  const _isGnosisSafe = false;

  // if (isMetamaskUnlocked && (_isGnosisSafe || web3modalOptions.cacheProvider)) {
  if (isMetamaskUnlocked && _isGnosisSafe) {
    await handleConnectWallet({
      setConnecting,
      setWalletState,
      lifeCycleFns,
      disconnect,
      web3modalOptions,
    });
  } else {
    setConnecting(false);
  }
};

export const loadProfile = async ({
  address,
  chainId,
  setProfile,
  setProfileLoading,
  shouldUpdate,
  lifeCycleFns,
  networks,
}: {
  address: string;
  chainId: ValidNetwork;
  setProfile: Dispatch<SetStateAction<UserProfile>>;
  setProfileLoading: Dispatch<SetStateAction<boolean>>;
  shouldUpdate: boolean;
  lifeCycleFns?: ConnectLifecycleFns;
  networks: NetworkConfigs;
}) => {
  try {
    setProfileLoading(true);
    // Workaround when poiting to a network where ENS is not deployed
    const daochain = !['0x1', '0x5'].includes(chainId) ? '0x1' : chainId;
    const profile = await getProfileForAddress(
      address,
      networks[daochain]?.rpc
    );

    if (profile && shouldUpdate) {
      const displayName =
        profile.name || profile.ens || truncateAddress(address);
      setProfile({ ...profile, displayName });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (web3Error: any) {
    const errMsg =
      typeof web3Error === 'string'
        ? web3Error
        : web3Error?.message || 'Unknown Error';
    lifeCycleFns?.onConnectError?.({
      name: 'Connection Error',
      message: errMsg,
    });
    console.error(web3Error);
    setProfile({ displayName: '', address: '', ens: '' });
    lifeCycleFns?.onProfileError?.(web3Error);
  } finally {
    if (shouldUpdate) {
      setProfileLoading(false);
    }
  }
};

// remove old
export const handleSwitchNetwork = async (
  _chainId: string | number,
  networks: NetworkConfigs
) => {
  const chainId =
    typeof _chainId === 'number' ? numberToHex(_chainId) : _chainId;

  if (!isValidNetwork(chainId)) {
    console.error(`No network configuration for chainId: ${chainId}`);
    // handle on error
    return;
  }
  // if (!window.ethereum?.isMetaMask) {
  //   console.error('Switching chain is only supported in Metamask');
  //   // handle on error
  //   return;
  // }
  await switchChainOnMetaMask(networks, chainId);
};
