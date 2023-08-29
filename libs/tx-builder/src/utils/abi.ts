import { createPublicClient, trim, Address } from 'viem';
import {
  ABI,
  EthAddress,
  isJSON,
  createViemClient,
  createTransport,
} from '@daohaus/utils';
import {
  Keychain,
  HAUS_RPC,
  ValidNetwork,
  ABI_EXPLORER_KEYS,
  VIEM_CHAINS,
} from '@daohaus/keychain-utils';

import { cacheABI, getCachedABI } from './cache';
import { LOCAL_ABI } from '@daohaus/abis';

const isGnosisProxy = (abi: ABI) => {
  return (
    abi.length === 2 &&
    abi.every((fn) => ['constructor', 'fallback'].includes(fn?.type as string))
  );
};

const isSuperfluidProxy = (abi: ABI) => {
  return abi.length === 3 && abi.some((fn) => fn.name === 'initializeProxy');
};

export const isProxyABI = (abi: ABI) => {
  if (abi?.length) {
    return abi.some((fn) => fn.name === 'implementation');
  }
  return false;
};

const getABIUrl = ({
  chainId,
  contractAddress,
  explorerKeys = ABI_EXPLORER_KEYS,
}: {
  chainId: ValidNetwork;
  contractAddress: string;
  explorerKeys: Keychain;
}) => {
  const ABI_ADDRESS = '<<address>>';
  const TEMPORARY_ABI_EXPLORER: Keychain = {
    '0x1': `https://api.etherscan.io/api?module=contract&action=getabi&address=${ABI_ADDRESS}&apikey=${explorerKeys[chainId]}`,
    '0x5': `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${ABI_ADDRESS}&apikey=${explorerKeys[chainId]}`,
    '0x64': `https://api.gnosisscan.io/api?module=contract&action=getabi&address=${ABI_ADDRESS}&apikey=${explorerKeys[chainId]}`,
    '0x89': `https://api.polygonscan.com/api?module=contract&action=getabi&address=${ABI_ADDRESS}&apikey=${explorerKeys[chainId]}`,
    '0xa': `https://api-optimistic.etherscan.io/api?module=contract&action=getabi&address=${ABI_ADDRESS}&apikey=${explorerKeys[chainId]}`,
    '0xa4b1': `https://api.arbiscan.io/api?module=contract&action=getabi&address=${ABI_ADDRESS}&apiKey=${explorerKeys[chainId]}`,
  };

  return TEMPORARY_ABI_EXPLORER[chainId]?.replace(ABI_ADDRESS, contractAddress);
};

const getGnosisMasterCopy = async (
  address: EthAddress,
  chainId: ValidNetwork,
  rpcs: Keychain
) => {
  const client = createViemClient({
    chainId,
    rpcs,
  });

  return await client.readContract({
    abi: LOCAL_ABI.ERC20,
    address,
    functionName: 'masterCopy',
  });
};

// reads the logic contract proxy storage slot directly via to EIP-1967
// https://eips.ethereum.org/EIPS/eip-1967#specification
const getProxyStorageSlot = async ({
  address,
  client,
  // slot: bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)
  slot = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc' as Address,
}: {
  address: Address;
  client: ReturnType<typeof createViemClient>;
  slot?: Address;
}): Promise<string | false> => {
  try {
    const proxyAddr = await client.getStorageAt({
      address: address,
      slot,
    });

    return trim(proxyAddr as Address);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getImplementation = async ({
  address,
  chainId,
  abi,
  rpcs = HAUS_RPC,
}: {
  address: string;
  chainId: ValidNetwork;
  abi: ABI;
  rpcs?: Keychain;
}): Promise<string | false> => {
  const client = createViemClient({ chainId, rpcs });

  try {
    const proxyAddr = await client.readContract({
      address: address as EthAddress,
      abi,
      functionName: 'implementation',
    });

    return proxyAddr as string;
  } catch {
    return await getProxyStorageSlot({
      address: address as Address,
      client,
    });
  }
};

export const processABI = async ({
  abi,
  fetchABI,
  contractAddress,
  chainId,
  rpcs = HAUS_RPC,
  explorerKeys = ABI_EXPLORER_KEYS,
}: {
  abi: ABI;
  fetchABI: ({
    chainId,
    contractAddress,
    rpcs,
    explorerKeys,
  }: {
    chainId: ValidNetwork;
    contractAddress: string;
    rpcs: Keychain;
    explorerKeys: Keychain;
  }) => Promise<ABI | undefined>;
  contractAddress: string;
  chainId: ValidNetwork;
  rpcs: Keychain;
  explorerKeys: Keychain;
}) => {
  if (isProxyABI(abi)) {
    const proxyAddress = await getImplementation({
      address: contractAddress,
      chainId,
      abi,
    });

    if (proxyAddress) {
      const newData = await fetchABI({
        contractAddress: proxyAddress,
        chainId,
        rpcs,
        explorerKeys,
      });
      if (newData) {
        return newData;
      } else {
        throw new Error('Could not fetch ABI from proxy');
      }
    }
  } else if (isSuperfluidProxy(abi)) {
    const client = createViemClient({ chainId, rpcs });

    const sfProxyAddr = await client.readContract({
      address: contractAddress as EthAddress,
      abi: LOCAL_ABI.SUPERFLUID_PROXY,
      functionName: 'getCodeAddress',
    });

    const newData = await fetchABI({
      contractAddress: sfProxyAddr as EthAddress,
      chainId,
      rpcs,
      explorerKeys,
    });
    if (newData) {
      return newData;
    } else {
      throw new Error('Could not fetch ABI from proxy');
    }
  } else if (isGnosisProxy(abi)) {
    const gnosisProxyAddress = await getGnosisMasterCopy(
      contractAddress as EthAddress,
      chainId,
      rpcs
    );
    const newData = await fetchABI({
      contractAddress: gnosisProxyAddress as EthAddress,
      chainId,
      rpcs,
      explorerKeys,
    });
    return newData;
  }
  return abi;
};

export const fetchABI = async ({
  contractAddress,
  chainId,
  rpcs = HAUS_RPC,
  explorerKeys = ABI_EXPLORER_KEYS,
}: {
  contractAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  explorerKeys?: Keychain;
}): Promise<ABI | undefined> => {
  const cachedABI = await getCachedABI({ address: contractAddress, chainId });

  if (cachedABI) {
    const processedABI = await processABI({
      abi: cachedABI,
      fetchABI,
      contractAddress,
      chainId,
      rpcs,
      explorerKeys,
    });

    return processedABI;
  }

  const url = getABIUrl({ contractAddress, chainId, explorerKeys });

  try {
    if (!url) {
      console.log('contractAddress', contractAddress);
      console.log('chainId', chainId);
      console.log('url', url);
      throw new Error('Could generate explorer url with the given arguments');
    }
    const scanResponse = await fetch(url);
    console.log('scanResponse', scanResponse);
    const data = await scanResponse.json();
    console.log('data', data);
    if (data.message === 'OK' && isJSON(data.result)) {
      const abi = JSON.parse(data.result);
      cacheABI({ address: contractAddress, chainId, abi });
      const processedABI = await processABI({
        abi,
        fetchABI,
        contractAddress,
        chainId,
        rpcs,
        explorerKeys,
      });

      return processedABI;
    }
    throw new Error('Could not fetch or parse ABI');
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getCode = async ({
  contractAddress,
  chainId,
  rpcs = HAUS_RPC,
}: {
  contractAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const transport = createTransport({ chainId, rpcs });
  const client = createPublicClient({
    chain: VIEM_CHAINS[chainId],
    transport,
  });
  return await client.getBytecode({
    address: contractAddress as EthAddress,
  });
};
