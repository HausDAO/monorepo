import { decodeFunctionData, fromHex, getAbiItem } from 'viem';
import { ArgType, ENCODED_0X0_DATA } from '@daohaus/utils';
import {
  ABI_EXPLORER_KEYS,
  HAUS_NETWORK_DATA,
  HAUS_RPC,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';

import { MetaTransaction, OperationType, decodeMulti } from 'ethers-multisend';
import { whatsabi, loaders } from '@shazow/whatsabi';
import { providers } from 'ethers';

import { fetchABI, getCode } from './abi';
import { ActionError } from './decoding';
const { MultiABILoader, SourcifyABILoader } = loaders;

export type DeepDecodedAction = {
  to: string;
  operation: OperationType;
  name: string;
  value: string;
  params: {
    name: string;
    type: string;
    value: ArgType;
  }[];
  decodedActions?: DeepDecodedMultiTX;
};

export type DeepDecodedMultiTX = (DeepDecodedAction | ActionError)[];

class EtherscanABILoader implements loaders.ABILoader {
  chainId: ValidNetwork;
  rpcs: Keychain;
  explorerKeys: Keychain;

  constructor(options: {
    chainId: ValidNetwork;
    rpcs: Keychain;
    explorerKeys: Keychain;
  }) {
    this.chainId = options.chainId;
    this.rpcs = options.rpcs;
    this.explorerKeys = options.explorerKeys;
  }

  async loadABI(address: string): Promise<any[]> {
    const abi = await fetchABI({
      chainId: this.chainId,
      contractAddress: address,
      rpcs: this.rpcs,
      explorerKeys: this.explorerKeys,
    });
    if (!abi || !abi?.length) {
      throw new Error('No ABI found for this contract');
    }
    return abi;
  }
}

type Options = {
  chainId: ValidNetwork;
  rpcs: Keychain;
  explorerKeys: Keychain;
  loader: loaders.ABILoader;
};

export const deepDecodeProposalActions = async ({
  chainId,
  actionData,
  rpcs = HAUS_RPC,
  explorerKeys = ABI_EXPLORER_KEYS,
}: {
  chainId: ValidNetwork;
  actionData: string;
  rpcs?: Keychain;
  explorerKeys?: Keychain;
}): Promise<(DeepDecodedAction | ActionError)[]> => {
  const abiLoader = new MultiABILoader([
    new EtherscanABILoader({
      chainId,
      rpcs,
      explorerKeys,
    }),
    new SourcifyABILoader(),
  ]);

  const options = {
    chainId,
    rpcs,
    explorerKeys,
    loader: abiLoader,
  };

  return decodeMultiCall(options, actionData as `0x${string}`);
};

const decodeMultiCall = async (
  options: Options,
  data: `0x${string}`
): Promise<DeepDecodedMultiTX> => {
  const proposalActions: MetaTransaction[] = decodeMulti(data);

  const decodedProposalActions = await Promise.all(
    proposalActions.map(async (action) => {
      try {
        return await decodeAction(options, action);
      } catch (e) {
        return {
          error: true,
          message: (e as Error).message,
          data,
        };
      }
    })
  );

  return decodedProposalActions;
};

type FunctionDataWithInputsReturnType = {
  functionName: string;
  inputs: {
    name: string;
    type: string;
    value: string;
  }[];
};

const decodeValue = (value: unknown): string => {
  if (typeof value === 'string') {
    if (value.startsWith('0x')) {
      return fromHex(value as `0x${string}`, 'bigint').toString();
    }
    return value;
  }
  if (typeof value === 'number' || typeof value === 'bigint') {
    return BigInt(value).toString();
  }
  return '0';
};

const decodeFunctionDataWithInputs = (options: {
  abi: any[];
  data: `0x${string}`;
}): FunctionDataWithInputsReturnType => {
  const result = decodeFunctionData(options);

  const functionDetails = getAbiItem({
    abi: options.abi,
    name: result.functionName,
  });

  const inputs = functionDetails['inputs'] || [];

  const inputsWithValues = (inputs as any[]).map((input, index) => ({
    name: input.name,
    type: input.type,
    value: result.args?.[index]?.toString() || '0x',
  }));

  return {
    functionName: result.functionName,
    inputs: inputsWithValues,
  };
};

const decodeAction = async (
  options: Options,
  action: MetaTransaction
): Promise<DeepDecodedAction | ActionError> => {
  const { data, to, value, operation } = action;
  const { chainId, rpcs, loader } = options;
  if (
    !data ||
    data === '0x' ||
    !data.startsWith('0x') ||
    data === ENCODED_0X0_DATA ||
    (await getCode({ chainId, contractAddress: action.to, rpcs })) === '0x'
  ) {
    return {
      to: to,
      operation: operation || OperationType.Call,
      name: `${HAUS_NETWORK_DATA[chainId]?.symbol} Transfer`,
      value: decodeValue(value),
      params: [],
      decodedActions: [],
    };
  }

  const { abi } = await whatsabi.autoload(to, {
    provider: new providers.JsonRpcProvider(rpcs[chainId]),
    followProxies: true,
    abiLoader: loader,
  });

  if (!abi || !abi?.length) {
    throw new Error('No ABI found for this contract');
  }

  const result = decodeFunctionDataWithInputs({
    abi,
    data: data as `0x${string}`,
  });

  if (!result) {
    throw new Error('Could not decode action');
  }

  if (result.functionName === 'multiSend' && result.inputs.length === 1) {
    const decodedActions = await decodeMultiCall(
      options,
      data as `0x${string}`
    );

    return {
      to: to,
      operation: OperationType.DelegateCall,
      name: result.functionName,
      value: decodeValue(value),
      params: result.inputs,
      decodedActions,
    };
  }

  if (result.functionName.toLowerCase().includes('exec')) {
    const inputTo = result.inputs.find((input) => input.type === 'address');
    const inputData = result.inputs.find((input) => input.type === 'bytes');
    const inputValue = result.inputs.find((input) => input.type === 'uint256');
    const inputOperation = result.inputs.find(
      (input) => input.type === 'uint8'
    );

    if (!inputTo || !inputData) {
      return {
        to: to,
        operation: operation || OperationType.Call,
        name: result.functionName,
        value: decodeValue(value),
        params: result.inputs,
        decodedActions: [],
      };
    }

    const decodedData = await decodeAction(options, {
      to: inputTo.value as `0x${string}`,
      data: inputData.value as `0x${string}`,
      value: decodeValue(inputValue?.value),
      operation:
        decodeValue(inputOperation?.value) === '1'
          ? OperationType.DelegateCall
          : OperationType.Call,
    });

    return {
      to: to,
      operation: operation || OperationType.Call,
      name: result.functionName,
      value: decodeValue(value),
      params: result.inputs,
      decodedActions: [decodedData],
    };
  }

  return {
    to: to,
    operation: operation || OperationType.Call,
    name: result.functionName,
    value: decodeValue(value),
    params: result.inputs,
    decodedActions: [],
  };
};
