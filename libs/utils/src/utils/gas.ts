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

// moved getGasCostEstimate function to utils/ethersFallback.ts
