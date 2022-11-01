import { ethers } from 'ethers';
import { ABI, ArgType } from '../types';

export const encodeValues = (
  typesArray: string[],
  valueArray: ArgType[]
): string => {
  return ethers.utils.defaultAbiCoder.encode(typesArray, valueArray);
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
    const abiString = JSON.stringify(abi);
    const ethersInterface = new ethers.utils.Interface(abiString);
    return ethersInterface.encodeFunctionData(fnName, functionArgs);
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

// export const decodeAction = () => {};
