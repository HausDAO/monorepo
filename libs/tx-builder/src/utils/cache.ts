import localforage from 'localforage';
import {
  ABI,
  ArbitraryState,
  CACHE_CONFIG,
  CacheStoreName,
  getlocalForage,
} from '@daohaus/utils';
import { ValidNetwork } from '@daohaus/keychain-utils';

const defaultABIStore = {
  '0x1': {},
  '0x4': {},
  '0x5': {},
  '0x2a': {},
  '0xa': {},
  '0x64': {},
  '0x89': {},
  '0xa4b1': {},
  '0xa4ec': {},
};

export const getABIstore = async () =>
  (await getlocalForage(CacheStoreName.ABI)) as ArbitraryState;

export const getCachedABI = async ({
  address,
  chainId,
}: {
  address: string;
  chainId: ValidNetwork;
}) => {
  const abiStore = await getABIstore();
  const abi = abiStore?.[chainId]?.[address] as ABI | undefined;
  return abi;
};

const addABI = ({
  abiStore,
  chainId,
  address,
  abi,
}: {
  abiStore: ArbitraryState;
  chainId: ValidNetwork;
  address: string;
  abi: ABI;
}) => {
  console.log('address', address);
  console.log('abi', abi);
  console.log('chainId', chainId);
  console.log('abiStore', abiStore);
  return {
    ...abiStore,
    [chainId]: {
      ...abiStore[chainId],
      [address]: abi,
    },
  };
};

export const cacheABI = async ({
  address,
  chainId,
  abi,
}: {
  address: string;
  chainId: ValidNetwork;
  abi: ABI;
}) => {
  const abiStore = await getABIstore();
  console.log('abiStore', abiStore);
  const newStore = addABI({
    abiStore,
    chainId,
    address,
    abi,
  });
  try {
    await localforage.setItem(CacheStoreName.ABI, newStore);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const initABIs = async () => {
  localforage.config(CACHE_CONFIG);
  const store = await getABIstore();
  if (!store) {
    localforage.setItem(CacheStoreName.ABI, defaultABIStore);
  }
};

initABIs();
