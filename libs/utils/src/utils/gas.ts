import { ethers } from 'ethers';

// Adding to the gas limit to account for cost of processProposal
export const PROCESS_PROPOSAL_GAS_LIMIT_ADDITION = 150000;
export const L2_ADDITIONAL_GAS = 5000000;

export const getProcessingGasLimit = (
  actionGasEstimate: string | number,
  chainId: string
): string => {
  if (chainId === '0xa4b1' || chainId === '0xa') {
    return (
      Number(actionGasEstimate) > 0
        ? Number(actionGasEstimate) +
          PROCESS_PROPOSAL_GAS_LIMIT_ADDITION +
          L2_ADDITIONAL_GAS
        : PROCESS_PROPOSAL_GAS_LIMIT_ADDITION * 3.6 + L2_ADDITIONAL_GAS
    ).toFixed();
  }
  return (
    Number(actionGasEstimate) > 0
      ? Number(actionGasEstimate) + PROCESS_PROPOSAL_GAS_LIMIT_ADDITION
      : PROCESS_PROPOSAL_GAS_LIMIT_ADDITION * 3.6
  ).toFixed();
};

// OPTIMISM challenge - how to display this estimated gas fee like we do on other networks.
// ethers.js getFeeData returns maxFeePerGas as undefined,  might need to use gasPrice some how, then fetch the L1 amount
// https://community.optimism.io/docs/developers/build/transaction-fees/#displaying-fees-to-users

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
