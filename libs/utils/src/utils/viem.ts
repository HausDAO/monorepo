import {
  HAUS_RPC,
  ValidNetwork,
  Keychain,
  VIEM_CHAINS,
} from '@daohaus/keychain-utils';
import { HttpTransport, http, PublicClient, createPublicClient } from 'viem';

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
