// import { ethers } from 'ethers';
import { createPublicClient, getContract, http, HttpTransport } from 'viem';
import { ABI, EthAddress, isJSON } from '@daohaus/utils';
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
    '0x64': `https://blockscout.com/xdai/mainnet/api?module=contract&action=getabi&address=${ABI_ADDRESS}&apikey=${explorerKeys[chainId]}`,
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
  const gnosisProxyContract = createContract({
    address,
    abi: LOCAL_ABI.GNOSIS_PROXY,
    chainId,
    rpcs,
  });
  return await gnosisProxyContract?.read.masterCopy();
};

export const createTransport = ({
  chainId,
  rpcs = HAUS_RPC,
}: {
  chainId: ValidNetwork;
  rpcs: Keychain;
}): HttpTransport => {
  const rpc = rpcs[chainId];
  if (!rpc) return http();
  return http(rpc);
};

export const createViemClient = ({
  chainId,
  rpcs = HAUS_RPC,
}: {
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const transport = createTransport({ chainId, rpcs });
  return createPublicClient({
    chain: VIEM_CHAINS[chainId],
    transport,
  });
};

export const createContract = ({
  address,
  abi,
  chainId,
  rpcs = HAUS_RPC,
}: {
  address: string;
  abi: ABI;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const client = createViemClient({
    chainId,
    rpcs,
  });

  return getContract({
    address: address as EthAddress,
    abi,
    publicClient: client,
  });
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
    const newAddress = await client.readContract({
      address: address as EthAddress,
      abi,
      functionName: 'implementation',
    });

    return newAddress as string;
  } catch (error) {
    console.error(error);
    return false;
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
  // const rpcUrl = rpcs[chainId];
  // const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
  // return ethersProvider.getCode(contractAddress);

  const transport = createTransport({ chainId, rpcs });
  const client = createPublicClient({
    chain: VIEM_CHAINS[chainId],
    transport,
  });
  const bytecode = await client.getBytecode({
    address: contractAddress as EthAddress,
  });

  return bytecode;
};
