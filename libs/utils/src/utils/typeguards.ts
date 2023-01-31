import { ethers } from 'ethers';
import { ArgType, EthAddress } from '../types';

// TS user-defined typeguards
export const isArray = (item: unknown): item is unknown[] =>
  Array.isArray(item);
export const isNumber = (item: unknown): item is number =>
  typeof item === 'number';
export const isString = (item: unknown): item is string =>
  typeof item === 'string';
export const isBoolean = (item: unknown): item is boolean =>
  typeof item === 'boolean';
export const isNumberish = (item: unknown): item is string | number =>
  isNumber(item) || isNumberString(item);
export const isEthAddress = (item: unknown): item is EthAddress =>
  isString(item) && ethers.utils.isAddress(item);
// general 'is' guards that help us verify shapes of data

export const isObject = (item: unknown) => {
  if (item instanceof Object) return true;
  try {
    if (isString(item)) {
      JSON.parse(item as string);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const isArgType = (item: unknown): item is ArgType => {
  if (isArray(item)) {
    return item.every(isArgType);
  }
  return isString(item) || isNumber(item) || isBoolean(item) || isObject(item);
};

export const isNumberString = (item: unknown) =>
  isString(item) && !isNaN(parseFloat(item)) && isFinite(Number(item));
export const isLengthOf = (item: unknown, length: number) =>
  isArray(item) && item.length === length;
