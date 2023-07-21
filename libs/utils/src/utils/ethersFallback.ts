// OPTIMISM challenge - how to display this estimated gas fee like we do on other networks.
// ethers.js getFeeData returns maxFeePerGas as undefined,  might need to use gasPrice some how, then fetch the L1 amount
// https://community.optimism.io/docs/developers/build/transaction-fees/#displaying-fees-to-users

import { ethers } from 'ethers';
import { fetchFeeData, getProcessingGasLimit } from './gas';
import { ValidNetwork } from '@daohaus/keychain-utils';

export const getGasCostEstimate = async (
  gasLimit: number | string,
  rpcUrl: string,
  chainId: string
): Promise<number | undefined> => {
  const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const feeData = await ethersProvider.getFeeData();

  const feeDataNew = await fetchFeeData({ chainId: chainId as ValidNetwork });

  const ethersFeeData =
    Number(getProcessingGasLimit(gasLimit, chainId)) *
    Number(feeData.maxFeePerGas || 0);

  const viemFeeData =
    Number(getProcessingGasLimit(gasLimit, chainId)) *
    Number(feeDataNew.maxFeePerGas || 0);

  return (
    Number(getProcessingGasLimit(gasLimit, chainId)) *
    Number(feeDataNew.maxFeePerGas || 0)
  );
};
