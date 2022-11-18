import { utils } from 'ethers';

import {
  isValidNetwork,
  NetworkConfig,
  NetworkConfigs,
} from '@daohaus/keychain-utils';

type SwitchError = Error & { code: number };
const isSwitchError = (err: unknown): err is SwitchError =>
  (err as SwitchError).code !== undefined;

export const switchChainOnMetaMask = async (
  networks: NetworkConfigs,
  chainId: string
): Promise<boolean> => {
  if (!isValidNetwork(chainId, networks)) return false;
  const currentNetwork = networks[chainId] as NetworkConfig;
  const { name, symbol, rpc, explorer } = currentNetwork;
  const networkName = name;
  const rpcUrl = rpc;
  const explorerUrl = explorer;

  if (
    !(name && symbol && networkName && rpcUrl && explorerUrl && window.ethereum)
  ) {
    console.error('Invalid network configuration');
    console.log({
      chainId,
      currentNetwork,
      name,
      symbol,
      rpc,
      explorer,
      networkName,
      rpcUrl,
      explorerUrl,
    });
    return false;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: utils.hexValue(chainId),
        },
      ],
    });
    return true;
  } catch (error) {
    if (isSwitchError(error)) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: utils.hexValue(chainId),
                chainName: networkName,
                nativeCurrency: {
                  name,
                  symbol,
                  decimals: 18,
                },
                rpcUrls: [rpcUrl],
                blockExplorerUrls: [explorerUrl],
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error('Unable to add chain to metamask', addError);
        }
      }
    } else {
      console.error('Unable to switch to chain on metamask', error);
    }
  }
  return false;
};
