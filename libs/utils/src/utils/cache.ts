import * as localforage from 'localforage';

export const CACHE_CONFIG = {
  // driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
  name: 'DAOhaus',
  version: 3.0, // size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'Universal DH Cache', // Should be alphanumeric, with underscores.
  description:
    'Store for DH apps. Used for caching ABIs, member Profiles, and other data.',
};

export enum CacheStoreName {
  ABI = 'ABI',
  MEMBERS_PROFILE = 'MEMBERS_PROFILE',
}

export const getlocalForage = async (storeName: CacheStoreName) => {
  try {
    const store = await localforage.getItem(storeName);
    return store;
  } catch (error) {
    console.error(error);
  }
};
