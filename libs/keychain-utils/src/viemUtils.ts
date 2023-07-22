import {
  arbitrum,
  mainnet,
  polygon,
  gnosis,
  goerli,
  optimism,
  Chain,
} from 'wagmi/chains';
import { Keychain, ValidNetwork } from './types';
import { HAUS_RPC } from './endpoints';
import { HttpTransport, http, PublicClient, createPublicClient } from 'viem';

export const VIEM_CHAINS: Keychain<Chain> = {
  '0x1': mainnet,
  '0x5': goerli,
  '0x64': gnosis,
  '0x89': polygon,
  '0xa': optimism,
  '0xa4b1': arbitrum,
};

export const createTransport = ({
  chainId,
  rpcs = HAUS_RPC,
}: {
  chainId: ValidNetwork;
  rpcs: Keychain;
}): HttpTransport => {
  const rpc = rpcs[chainId];
  if (!rpc) return http();
  return http(rpc);
};

export const createViemClient = ({
  chainId,
  rpcs = HAUS_RPC,
}: {
  chainId: ValidNetwork;
  rpcs?: Keychain;
}): PublicClient => {
  const transport = createTransport({ chainId, rpcs });
  return createPublicClient({
    chain: VIEM_CHAINS[chainId],
    transport,
  });
};
