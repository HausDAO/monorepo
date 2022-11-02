import { isValidNetwork, ReactSetter, truncateAddress } from '@daohaus/utils';
import { Haus } from '@daohaus/moloch-v3-data';
import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';
import { providers } from 'ethers';

import { switchChainOnMetaMask } from './metamask';
import {
  ModalEvents,
  ModalOptions,
  WalletStateType,
  UserProfile,
  NetworkConfigs,
} from './types';

export const numberToHex = (number: number) => {
  return `0x${number.toString(16)}`;
};
export const getModal = (options: ModalOptions) => {
  const modal = new SafeAppWeb3Modal(options);
  return modal;
};
export const isMetamaskProvider = (
  provider: providers.Web3Provider | undefined | null
) => provider?.connection?.url === 'metamask';

export const handleSetProvider = async ({
  provider,
  setWalletState,
}: {
  // eslint-disable-next-line
  provider: any;
  setWalletState: ReactSetter<WalletStateType>;
}) => {
  const ethersProvider = new providers.Web3Provider(provider);
  const signerAddress = await ethersProvider.getSigner().getAddress();
  setWalletState({
    provider: ethersProvider,
    chainId: provider.chainId,
    address: signerAddress,
  });
};

export const handleConnectWallet = async ({
  setConnecting,
  handleModalEvents,
  disconnect,
  setWalletState,
  web3modalOptions,
}: {
  setConnecting: ReactSetter<boolean>;
  handleModalEvents?: ModalEvents;
  disconnect: () => Promise<void>;
  setWalletState: ReactSetter<WalletStateType>;
  web3modalOptions: ModalOptions;
}) => {
  try {
    setConnecting(true);

    const modal = getModal(web3modalOptions);
    const modalProvider = await modal.requestProvider();
    const _isGnosisSafe = await modal.isSafeApp();

    if (!_isGnosisSafe) {
      modalProvider.on('accountsChanged', () => {
        handleSetProvider({ provider: modalProvider, setWalletState });
        handleModalEvents && handleModalEvents('accountsChanged');
      });
      modalProvider.on('chainChanged', (chainId: string) => {
        handleSetProvider({ provider: modalProvider, setWalletState });
        handleModalEvents && handleModalEvents('chainChanged');
        if (!isValidNetwork(chainId)) {
          handleModalEvents &&
            handleModalEvents('error', {
              code: 'UNSUPPORTED_NETWORK',
              message: `You have switched to an unsupported chain, Disconnecting from Metamask...`,
            });
        }
      });
    }
    handleSetProvider({ provider: modalProvider, setWalletState });
  } catch (web3Error) {
    console.error(web3Error);
    disconnect();
  } finally {
    setConnecting(false);
  }
};

export const loadWallet = async ({
  connectWallet,
  setConnecting,
  web3modalOptions,
}: {
  connectWallet: () => Promise<void>;
  setConnecting: ReactSetter<boolean>;
  web3modalOptions: ModalOptions;
}) => {
  const isMetamaskUnlocked =
    (await window.ethereum?._metamask?.isUnlocked?.()) ?? false;
  const modal = getModal(web3modalOptions);
  const _isGnosisSafe = await modal.isSafeApp();

  if (isMetamaskUnlocked && (_isGnosisSafe || web3modalOptions.cacheProvider)) {
    await connectWallet();
  } else {
    setConnecting(false);
  }
};

export const loadProfile = async ({
  address,
  setProfile,
  setProfileLoading,
  shouldUpdate,
  networks,
}: {
  address: string;
  setProfile: ReactSetter<UserProfile>;
  setProfileLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
  networks: NetworkConfigs;
}) => {
  try {
    setProfileLoading(true);
    const haus = Haus.create();
    const profile = await haus.profile.get({ address: address });

    if (profile && shouldUpdate) {
      const displayName =
        profile.name || profile.ens || truncateAddress(address);
      setProfile({ ...profile, displayName });
    }
  } catch (error) {
    console.error(error);
    setProfile({ displayName: '', address: '', ens: '' });
  } finally {
    if (shouldUpdate) {
      setProfileLoading(false);
    }
  }
};

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
  if (!window.ethereum?.isMetaMask) {
    console.error('Switching chain is only supported in Metamask');
    // handle on error
    return;
  }
  await switchChainOnMetaMask(networks, chainId);
};
