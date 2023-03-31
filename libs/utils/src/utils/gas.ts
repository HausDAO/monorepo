import { ethers } from 'ethers';

// Adding to the gas limit to account for cost of processProposal
export const PROCESS_PROPOSAL_GAS_LIMIT_ADDITION = 150000;
export const ARBITRUM_ADDITIONAL_GAS = 5000000;

export const getProcessingGasLimit = (
  actionGasEstimate: string | number,
  chainId: string
): string => {
  if (chainId === '0xa4b1') {
    return (
      Number(actionGasEstimate) > 0
        ? Number(actionGasEstimate) +
          PROCESS_PROPOSAL_GAS_LIMIT_ADDITION +
          ARBITRUM_ADDITIONAL_GAS
        : PROCESS_PROPOSAL_GAS_LIMIT_ADDITION * 3.6 + ARBITRUM_ADDITIONAL_GAS
    ).toFixed();
  }
  return (
    Number(actionGasEstimate) > 0
      ? Number(actionGasEstimate) + PROCESS_PROPOSAL_GAS_LIMIT_ADDITION
      : PROCESS_PROPOSAL_GAS_LIMIT_ADDITION * 3.6
  ).toFixed();
};

export const getGasCostEstimate = async (
  gasLimit: number | string,
  rpcUrl: string,
  chainId: string
): Promise<number> => {
  const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const feeData = await ethersProvider.getFeeData();
  return (
    Number(getProcessingGasLimit(gasLimit, chainId)) *
    Number(feeData.maxFeePerGas?.toNumber())
  );
};
