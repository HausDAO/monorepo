import { VALID_NETWORKS } from '../constants';

export type ValidNetwork = keyof typeof VALID_NETWORKS;
export type Keychain<T = string> = { [key in ValidNetwork]?: T };
export type KeychainList = Record<string, Keychain>;

export type ValidKey = string | number | symbol;

export type NetworkType = {
  chainId: string;
  networkId: number;
  name: string;
  symbol: string;
  tokenDecimals: number;
};
