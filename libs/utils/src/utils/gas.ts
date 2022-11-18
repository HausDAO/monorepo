import { ethers } from 'ethers';

// Adding to the gas limit to account for cost of processProposal
export const PROCESS_PROPOSAL_GAS_LIMIT_ADDITION = 150000;

export const getProcessingGasLimit = (
  actionGasEstimate: string | number
): string =>
  (Number(actionGasEstimate) > 0
    ? Number(actionGasEstimate) + PROCESS_PROPOSAL_GAS_LIMIT_ADDITION
    : PROCESS_PROPOSAL_GAS_LIMIT_ADDITION * 3.6
  ).toFixed();

export const getGasCostEstimate = async (
  gasLimit: number | string,
  rpcUrl: string
): Promise<number> => {
  const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const feeData = await ethersProvider.getFeeData();
  return (
    Number(getProcessingGasLimit(gasLimit)) *
    Number(feeData.maxFeePerGas?.toNumber())
  );
};
