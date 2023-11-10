import {
  decodeAbiParameters,
  decodeFunctionData,
  fromHex,
  getAbiItem,
} from 'viem';
import { ENCODED_0X0_DATA } from '@daohaus/utils';
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
import { ActionError, DeepDecodedAction, DeepDecodedMultiTX } from './decoding';
const { MultiABILoader, SourcifyABILoader } = loaders;

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const createActionError = (data: string, message: string): ActionError => ({
  error: true,
  message,
  data,
});

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

type DecodedMethod = {
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

const decodeMethod = (options: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any[];
  data: `0x${string}`;
}): DecodedMethod => {
  const result = decodeFunctionData(options);

  const functionDetails = getAbiItem({
    abi: options.abi,
    name: result.functionName,
  });

  const inputs = functionDetails['inputs'] || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputsWithValues = (inputs as any[]).map((input, index) => ({
    name: input.name,
    type: input.type,
    value: Array.isArray(result.args?.[index])
      ? (result.args?.[index] as Array<any>).length
        ? (result.args?.[index] as Array<any>).toString()
        : '[]'
      : result.args?.[index]?.toString() || '0x',
  }));

  return {
    functionName: result.functionName,
    inputs: inputsWithValues,
  };
};

const actionDecoders: Record<
  string,
  (
    options: Options,
    action: MetaTransaction,
    decodedMethod: DecodedMethod
  ) => Promise<DeepDecodedAction | ActionError>
> = {
  // multiSend(bytes)
  '0x8d80ff0a': async (options, action, decodedMethod) => {
    if (
      decodedMethod.functionName !== 'multiSend' ||
      decodedMethod.inputs.length !== 1
    ) {
      return createActionError(
        action.data,
        'Could not decode action: multiSend'
      );
    }
    const input = decodedMethod.inputs[0];
    if (input.type !== 'bytes') {
      return createActionError(
        action.data,
        'Could not decode action: multiSend'
      );
    }

    const decodedActions = await decodeMultiCall(
      options,
      action.data as `0x${string}`
    );

    return {
      to: action.to,
      operation: action.operation || OperationType.DelegateCall,
      name: decodedMethod.functionName,
      value: decodeValue(action.value),
      params: decodedMethod.inputs,
      decodedActions,
    };
  },

  // execTransactionFromModule(address,uint256,bytes,uint8)
  '0x468721a7': async (options, action, decodedMethod) => {
    if (
      decodedMethod.functionName !== 'execTransactionFromModule' ||
      decodedMethod.inputs.length !== 4
    ) {
      return createActionError(
        action.data,
        'Could not decode action: execTransactionFromModule'
      );
    }
    const inputTo = decodedMethod.inputs[0];
    const inputValue = decodedMethod.inputs[1];
    const inputData = decodedMethod.inputs[2];
    const inputOperation = decodedMethod.inputs[3];

    if (
      inputTo.type !== 'address' ||
      inputValue.type !== 'uint256' ||
      inputData.type !== 'bytes' ||
      inputOperation.type !== 'uint8'
    ) {
      return createActionError(
        action.data,
        'Could not decode action: execTransactionFromModule'
      );
    }

    const decodedAction = await decodeAction(options, {
      to: inputTo.value as `0x${string}`,
      data: inputData.value as `0x${string}`,
      value: decodeValue(inputValue?.value),
      operation:
        decodeValue(inputOperation?.value) === '1'
          ? OperationType.DelegateCall
          : OperationType.Call,
    });

    return {
      to: action.to,
      operation: action.operation || OperationType.Call,
      name: decodedMethod.functionName,
      value: decodeValue(action.value),
      params: decodedMethod.inputs,
      decodedActions: [decodedAction],
    };
  },
  // executeAsBaal(address,uint256,bytes)
  '0xb3c98bbb': async (options, action, decodedMethod) => {
    if (
      decodedMethod.functionName !== 'executeAsBaal' ||
      decodedMethod.inputs.length !== 3
    ) {
      return createActionError(
        action.data,
        'Could not decode action: executeAsBaal'
      );
    }
    const inputTo = decodedMethod.inputs[0];
    const inputValue = decodedMethod.inputs[1];
    const inputData = decodedMethod.inputs[2];

    if (
      inputTo.type !== 'address' ||
      inputValue.type !== 'uint256' ||
      inputData.type !== 'bytes'
    ) {
      return createActionError(
        action.data,
        'Could not decode action: executeAsBaal'
      );
    }

    const decodedAction = await decodeAction(options, {
      to: inputTo.value as `0x${string}`,
      data: inputData.value as `0x${string}`,
      value: decodeValue(inputValue?.value),
      operation: OperationType.Call,
    });

    return {
      to: action.to,
      operation: action.operation || OperationType.Call,
      name: decodedMethod.functionName,
      value: decodeValue(action.value),
      params: decodedMethod.inputs,
      decodedActions: [decodedAction],
    };
  },
  // setGovernanceConfig(uint256,bytes)
  '0xee4d88ed': async (options, action, decodedMethod) => {
    const govTypes = [
      { name: 'voting', type: 'uint32' },
      { name: 'grace', type: 'uint32' },
      { name: 'newOffering', type: 'uint256' },
      { name: 'quorum', type: 'uint256' },
      { name: 'sponsor', type: 'uint256' },
      { name: 'minRetention', type: 'uint256' },
    ];

    const govValues = decodeAbiParameters(
      govTypes,
      decodedMethod.inputs[0].value as `0x${string}`
    );

    const govParams = govTypes.map((govType, i) => {
      return {
        ...govType,
        value: govValues[i] as string,
      };
    });

    return {
      to: action.to,
      operation: action.operation || OperationType.Call,
      name: decodedMethod.functionName,
      value: decodeValue(action.value),
      params: govParams,
      decodedActions: [],
    };
  },
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
    return createActionError(data, 'Could not decode action: abi not found');
  }

  const decodedMethod = decodeMethod({
    abi,
    data: data as `0x${string}`,
  });

  if (!decodedMethod) {
    return createActionError(data, 'Could not decode action: method not found');
  }

  const methodSignature = data.slice(0, 10);

  const actionDecoder = actionDecoders[methodSignature];
  if (actionDecoder) {
    return await actionDecoder(options, action, decodedMethod);
  }

  return {
    to: to,
    operation: operation || OperationType.Call,
    name: decodedMethod.functionName,
    value: decodeValue(value),
    params: decodedMethod.inputs,
    decodedActions: [],
  };
};
