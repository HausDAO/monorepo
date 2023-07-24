import {
  encodeAbiParameters,
  parseAbiParameters,
  encodeFunctionData,
} from 'viem';
import { ABI, ArgType } from '../types';

export const encodeValues = (
  typesArray: string[],
  valueArray: ArgType[]
): string => {
  return encodeAbiParameters(
    parseAbiParameters(typesArray.join(',')),
    valueArray
  );
};

export const encodeFunction = (
  abi: ABI,
  fnName: string,
  functionArgs: ReadonlyArray<unknown>
): string | { error: true; message: string } => {
  try {
    if (!abi || !Array.isArray(functionArgs))
      throw new Error(
        'Incorrect params passed to safeEncodeHexFunction in abi.js'
      );

    return encodeFunctionData({
      abi,
      functionName: fnName,
      args: functionArgs,
    });
  } catch (error) {
    console.error('error', error);
    return {
      error: true,
      message: 'Could not encode transaction data with the values provided',
    };
  }
};

export const getNonce = (length = 24) => {
  let text = '';
  const possible = '0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
