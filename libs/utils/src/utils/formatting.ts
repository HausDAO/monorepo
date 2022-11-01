import { ethers } from 'ethers';
import { Noun } from '../types';

export const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;
export const charLimit = (str: string | undefined, limit: number) =>
  str && str.length > limit ? `${str.slice(0, limit)}...` : str;
export const handlePluralNoun = (noun: Noun, count: number) =>
  count === 1 ? noun.singular : noun.plural;
export const fromWei = (amt: string): string => {
  return ethers.utils.formatEther(amt).toString();
};
export const isJSON = (obj: unknown) => {
  try {
    JSON.parse(obj as string);
    return true;
  } catch (e) {
    return false;
  }
};
