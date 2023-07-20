// OPTIMISM challenge - how to display this estimated gas fee like we do on other networks.
// ethers.js getFeeData returns maxFeePerGas as undefined,  might need to use gasPrice some how, then fetch the L1 amount
// https://community.optimism.io/docs/developers/build/transaction-fees/#displaying-fees-to-users

import { ethers } from 'ethers';
import { getProcessingGasLimit } from './gas';

export const getGasCostEstimate = async (
  gasLimit: number | string,
  rpcUrl: string,
  chainId: string
): Promise<number | undefined> => {
  const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const feeData = await ethersProvider.getFeeData();

  return (
    Number(getProcessingGasLimit(gasLimit, chainId)) *
    Number(feeData.maxFeePerGas?.toNumber() || 0)
  );
};
