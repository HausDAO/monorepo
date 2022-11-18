import {
  StaticContract,
  ProcessedContract,
  LocalContract,
  ContractLego,
  ABI,
  StringSearch,
  ArbitraryState,
  isEthAddress,
  EthAddress,
  RemoteContract,
} from '@daohaus/utils';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';

import { fetchABI } from './abi';
import { isSearchArg } from './args';
import { searchArg } from './search';

const findTargetAddress = ({
  appState,
  targetAddress,
  chainId,
}: {
  appState: ArbitraryState;
  targetAddress: StringSearch | Keychain;
  chainId: ValidNetwork;
}) => {
  if (typeof targetAddress === 'string' && isSearchArg(targetAddress)) {
    return searchArg({
      searchString: targetAddress,
      appState,
      shouldThrow: true,
    });
  }
  if (typeof targetAddress === 'string' && isEthAddress(targetAddress)) {
    return targetAddress;
  }
  if (
    typeof targetAddress === 'object' &&
    typeof targetAddress[chainId] === 'string'
  ) {
    return targetAddress[chainId] as string;
  }
  throw new Error(`No address found for targetAddress: ${targetAddress}`);
};

const handleTargetAddress = (args: {
  appState: ArbitraryState;
  targetAddress: StringSearch | Keychain;
  chainId: ValidNetwork;
}): EthAddress => {
  const address = findTargetAddress(args);
  if (isEthAddress(address)) return address;
  throw new Error(`Target address: ${address} is not a valid ethereum address`);
};

const processStaticContract = ({
  localContract,
  chainId,
  appState,
}: {
  localContract: StaticContract;
  chainId: ValidNetwork;
  appState: ArbitraryState;
}): ProcessedContract => {
  const { targetAddress, abi, contractName } = localContract;
  const address = handleTargetAddress({ targetAddress, chainId, appState });
  if (!address) {
    throw new Error(
      `No address found for contract ${contractName} on ${chainId}`
    );
  }
  return {
    type: 'processed',
    abi,
    address,
    contractName,
  };
};

const processLocalContract = ({
  localContract,
  chainId,
  localABIs,
  appState,
}: {
  localContract: LocalContract;
  chainId: ValidNetwork;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
}): ProcessedContract => {
  const { targetAddress, contractName } = localContract;
  const abi = localABIs[contractName];
  const address = handleTargetAddress({ targetAddress, chainId, appState });
  if (!address) {
    throw new Error(
      `No address found for contract ${contractName} on ${chainId}`
    );
  }
  return {
    type: 'processed',
    abi,
    address,
    contractName,
  };
};

const processRemoteContract = async ({
  remoteContract,
  chainId,
  appState,
}: {
  remoteContract: RemoteContract;
  chainId: ValidNetwork;
  appState: ArbitraryState;
}): Promise<ProcessedContract> => {
  const { targetAddress, contractName } = remoteContract;
  const address = handleTargetAddress({ targetAddress, chainId, appState });

  const abi = await fetchABI({
    contractAddress: address,
    chainId,
  });

  if (abi && address) {
    return {
      type: 'processed',
      abi,
      address,
      contractName,
    };
  }
  console.log('**DEBUG**');
  console.log('remoteContract', remoteContract);
  console.log('address', address);
  console.log('abi', abi);
  throw new Error(`Could not process remote contract ${contractName}`);
};

export const processContractLego = async ({
  contract,
  chainId,
  localABIs,
  appState,
}: {
  contract: ContractLego;
  chainId: ValidNetwork;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
}) => {
  if (contract.type === 'static') {
    return processStaticContract({
      localContract: contract as StaticContract,
      chainId,
      appState,
    });
  }
  if (contract.type === 'local') {
    return processLocalContract({
      localContract: contract as LocalContract,
      chainId,
      localABIs,
      appState,
    });
  }

  if (contract.type === 'remote') {
    const processedContract = await processRemoteContract({
      remoteContract: contract as RemoteContract,
      chainId,
      appState,
    });
    return processedContract;
  }
  if (contract.type === 'processed') {
    return contract;
  }
  // This is a placeholder for when we implemnt the arbitary
  // contract call and cache utilities
  // https://github.com/HausDAO/daohaus-monorepo/issues/403
  throw new Error('ABI not found. Remote fetching not implemented');
};
