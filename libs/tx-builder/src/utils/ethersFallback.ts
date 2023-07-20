import { HAUS_RPC, Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { ABI } from '@daohaus/utils';
import { ethers } from 'ethers';

export const createEthersContract = ({
  address,
  abi,
  chainId,
  rpcs = HAUS_RPC,
}: {
  address: string;
  abi: ABI;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const rpcUrl = rpcs[chainId];
  const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
  return new ethers.Contract(address, abi, ethersProvider);
};
