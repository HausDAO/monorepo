import { weiUnits, formatUnits, parseGwei } from 'viem';
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
export type Unit = 'ether' | 'gwei' | 'wei' | number;

export type FetchFeeDataArgs = {
  /** Units for formatting output */
  formatUnits?: Unit;
  /** Chain id to use for Public Client. */
  chainId?: number;
};

export function getUnit(unit: Unit) {
  if (typeof unit === 'number') return unit;
  if (unit === 'wei') return 0;
  return Math.abs(weiUnits[unit]);
}

export type FetchFeeDataResult = {
  lastBaseFeePerGas: bigint | null;
  gasPrice: bigint | null;
  maxFeePerGas: bigint | null;
  maxPriorityFeePerGas: bigint | null;
  formatted: {
    gasPrice: string | null;
    maxFeePerGas: string | null;
    maxPriorityFeePerGas: string | null;
  };
};

export async function fetchFeeData({
  chainId,
  formatUnits: units = 'gwei',
}: FetchFeeDataArgs = {}): Promise<FetchFeeDataResult> {
  const publicClient = getPublicClient({ chainId });

  const block = await publicClient.getBlock();
  let gasPrice: bigint | null = null;
  try {
    gasPrice = await publicClient.getGasPrice();
  } catch {
    //
  }

  let lastBaseFeePerGas: bigint | null = null;
  let maxFeePerGas = null;
  let maxPriorityFeePerGas = null;

  if (block?.baseFeePerGas) {
    lastBaseFeePerGas = block.baseFeePerGas;
    maxPriorityFeePerGas = parseGwei('1');
    maxFeePerGas = block.baseFeePerGas * 2n + maxPriorityFeePerGas;
  }

  const unit = getUnit(units);
  const formatted = {
    gasPrice: gasPrice ? formatUnits(gasPrice, unit) : null,
    maxFeePerGas: maxFeePerGas ? formatUnits(maxFeePerGas, unit) : null,
    maxPriorityFeePerGas: maxPriorityFeePerGas
      ? formatUnits(maxPriorityFeePerGas, unit)
      : null,
  };
  return {
    lastBaseFeePerGas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    formatted,
  };
}
