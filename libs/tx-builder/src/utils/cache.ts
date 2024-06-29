import {
  ABI,
  ArbitraryState,
  CACHE_CONFIG,
  CacheStoreName,
} from '@daohaus/utils';
import { ValidNetwork } from '@daohaus/keychain-utils';

const localforage = import('localforage').then(async (localforage) => {
  // workaround for https://github.com/localForage/localForage/issues/1038
  if (typeof window === 'object') await localforage.default.ready();
  return localforage.default;
});

const defaultABIStore = {
  '0x1': {},
  '0x4': {},
  '0x2a': {},
  '0xa': {},
  '0x64': {},
  '0x89': {},
  '0xa4b1': {},
  '0xa4ec': {},
};

export const getABIstore = async () => {
  const local = await localforage;
  return (await local.getItem(CacheStoreName.ABI)) as ArbitraryState;
};

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
  const newStore = addABI({
    abiStore,
    chainId,
    address: address.toLowerCase(),
    abi,
  });

  const local = await localforage;

  try {
    await local.setItem(CacheStoreName.ABI, newStore);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const initABIs = async () => {
  const local = await localforage;
  local.config(CACHE_CONFIG);
  const store = await getABIstore();
  if (!store) {
    local.setItem(CacheStoreName.ABI, defaultABIStore);
  }
};

initABIs();
