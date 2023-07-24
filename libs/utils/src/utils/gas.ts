import { ValidNetwork } from '@daohaus/keychain-utils';
import { weiUnits, formatUnits, parseGwei } from 'viem';
import { createViemClient } from './viem';

// Adding to the gas limit to account for cost of processProposal
export const PROCESS_PROPOSAL_GAS_LIMIT_ADDITION = 150000;
export const L2_ADDITIONAL_GAS = 5000000;

// OPTIMISM challenge - how to display this estimated gas fee like we do on other networks.
// ethers.js getFeeData returns maxFeePerGas as undefined,  might need to use gasPrice some how, then fetch the L1 amount
// https://community.optimism.io/docs/developers/build/transaction-fees/#displaying-fees-to-users

export const getGasCostEstimate = async (
  gasLimit: number | string,
  chainId: string
): Promise<number | undefined> => {
  const feeDataNew = await fetchFeeData({ chainId: chainId as ValidNetwork });

  console.log('feeDataNew', feeDataNew);
  return (
    Number(getProcessingGasLimit(gasLimit, chainId)) *
    Number(feeDataNew.maxFeePerGas || 0)
  );
};

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
  // Chain id to use for Public Client.
  chainId: ValidNetwork;
  // Units for formatting output
  formatUnits?: Unit;
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
}: FetchFeeDataArgs): Promise<FetchFeeDataResult> {
  const client = createViemClient({ chainId });

  const block = await client.getBlock();
  let gasPrice: bigint | null = null;
  try {
    gasPrice = await client.getGasPrice();
  } catch (e) {
    console.error(`Failed to get gas price: ${e}`);
  }

  let lastBaseFeePerGas: bigint | null = null;
  let maxFeePerGas = null;
  let maxPriorityFeePerGas = null;

  if (block?.baseFeePerGas) {
    lastBaseFeePerGas = block.baseFeePerGas;
    maxPriorityFeePerGas = parseGwei('1');
    maxFeePerGas = block.baseFeePerGas * BigInt(2) + maxPriorityFeePerGas;
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
