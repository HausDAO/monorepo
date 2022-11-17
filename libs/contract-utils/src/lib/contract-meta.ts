import { ContractABIKey, LOCAL_ABI } from '@daohaus/abis';
import { ContractKey } from '@daohaus/utils';
import { CONTRACT_KEYCHAINS, ValidNetwork } from '@daohaus/keychain-utils';

/**
 * Get addresses of contracts that have been deployed to the
 * Ethereum mainnet or a supported testnet. Throws if there are
 * no known contracts deployed on the corresponding chain.
 * @param contractKey The desired Contract
 * @param chainId The desired chainId
 */
export const getContractAddressesForChain = (
  contractKey: ContractKey,
  chainId: ValidNetwork
): string | null => {
  if (!CONTRACT_KEYCHAINS?.[contractKey]?.[chainId]) {
    return null;
  }
  return CONTRACT_KEYCHAINS[contractKey][chainId] as string;
};

/**
 * Get abi of contracts that have been added to
 * the local-abi package
 * @param abiKey The desired Contract
 */
export const getContractAbi = (abiKey: ContractABIKey) => {
  if (!LOCAL_ABI[abiKey]) {
    return null;
  }
  return LOCAL_ABI[abiKey];
};
