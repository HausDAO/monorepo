import {
  ABI,
  ArbitraryState,
  ArgEncode,
  ArgType,
  EncodeCallArg,
  encodeFunction,
  encodeValues,
  EstmimateGas,
  EthAddress,
  EncodeMulticall,
  JSONDetailsSearch,
  MulticallAction,
  MulticallArg,
  StringSearch,
  TXLego,
} from '@daohaus/utils';
import {
  CONTRACT_KEYCHAINS,
  ENDPOINTS,
  Keychain,
  PinataApiKeys,
  ValidNetwork,
} from '@daohaus/keychain-utils';

import { LOCAL_ABI } from '@daohaus/abis';
import { encodeMultiSend, MetaTransaction } from '@gnosis.pm/safe-contracts';
import { getAddress } from 'ethers/lib/utils';
import { processArg } from './args';
import {
  BaalContractBase,
  basicDetails,
  CURRENT_DAO,
  EXPIRY,
  FORM,
} from './constants';
import { processContractLego } from './contractHelpers';

export const estimateGas = async ({
  chainId,
  safeId,
  data,
}: {
  chainId: ValidNetwork;
  safeId: string;
  data: string;
}) => {
  const rawUri = ENDPOINTS['GAS_ESTIMATE'][chainId];
  if (!rawUri)
    throw new Error(
      `Gnosis Gas Estimation API not found for chainID: ${chainId}`
    );

  const gnosisMultisendAddress =
    CONTRACT_KEYCHAINS['GNOSIS_MULTISEND'][chainId];

  if (!gnosisMultisendAddress)
    throw new Error(
      `Gnosis Multisend Contract not found for chainID: ${chainId}`
    );
  const gasEstimateUri = rawUri.replace('<<safeId>>', getAddress(safeId));
  try {
    const response = await fetch(gasEstimateUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: getAddress(gnosisMultisendAddress),
        value: 0,
        data,
        operation: 1,
      }),
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    throw new Error(`Failed to estimate gas: ${error}`);
  }
};

export const txActionToMetaTx = ({
  abi,
  method,
  address,
  args,
  value = 0,
  operation = 0,
}: {
  abi: ABI;
  address: string;
  method: string;
  args: ReadonlyArray<ArgType>;
  value?: number;
  operation?: number;
}): MetaTransaction => {
  const encodedData = encodeFunction(abi, method, args);

  if (typeof encodedData !== 'string') {
    throw new Error(encodedData.message);
  }
  console.log('operation', operation);
  return {
    to: address,
    data: encodedData,
    value: value.toString(),
    operation,
  };
};

export const handleEncodeCallArg = async ({
  arg,
  chainId,
  localABIs,
  appState,
  rpcs,
  pinataApiKeys,
  explorerKeys,
}: {
  arg: EncodeCallArg;
  chainId: ValidNetwork;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
  rpcs: Keychain;
  pinataApiKeys: PinataApiKeys;
  explorerKeys: Keychain;
}) => {
  const { contract, method, args } = arg.action;
  const processedContract = await processContractLego({
    contract,
    chainId,
    localABIs,
    appState,
    rpcs,
    explorerKeys,
  });

  const processedArgs = await Promise.all(
    args.map(
      async (arg) =>
        await processArg({
          arg,
          chainId,
          localABIs,
          appState,
          rpcs,
          pinataApiKeys,
          explorerKeys,
        })
    )
  );

  const encodedData = encodeFunction(
    processedContract.abi,
    method,
    processedArgs
  );

  if (typeof encodedData !== 'string') {
    throw new Error(encodedData.message);
  }

  return encodedData;
};

const handleMulticallFormActions = ({
  appState,
}: {
  appState: ArbitraryState;
}): MetaTransaction[] => {
  const validTxs = appState.formValues.tx
    ? Object.keys(appState.formValues.tx).filter((actionId: string) => {
        const action = appState.formValues.tx[actionId];
        return !action.deleted;
      })
    : [];
  if (!validTxs.length) {
    throw new Error('No actions found');
  }
  // TODO: sort by tx.actionId.index
  return validTxs.map((actionId: string) => {
    const action = appState.formValues.tx[actionId];
    const { to, data, value, operation } = action;
    return {
      to,
      data,
      value,
      operation,
    };
  });
};

export const handleMulticallArg = async ({
  arg,
  chainId,
  localABIs,
  appState,
  rpcs,
  pinataApiKeys,
  explorerKeys,
}: {
  arg: MulticallArg | EncodeMulticall;
  chainId: ValidNetwork;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
  rpcs: Keychain;
  pinataApiKeys: PinataApiKeys;
  explorerKeys: Keychain;
}) => {
  const encodedActions = await Promise.all(
    arg.actions.map(async (action) => {
      const { contract, method, args, value, operations, data } = action;
      const processedContract = await processContractLego({
        contract,
        chainId,
        localABIs,
        appState,
        rpcs,
        explorerKeys,
      });

      const processValue = value
        ? await processArg({
            arg: value,
            chainId,
            localABIs,
            appState,
            rpcs,
            pinataApiKeys,
            explorerKeys,
          })
        : 0;

      const processedOperations = operations
        ? await processArg({
            arg: operations,
            chainId,
            localABIs,
            appState,
            rpcs,
            pinataApiKeys,
            explorerKeys,
          })
        : 0;
      console.log('processedOperations', processedOperations);
      // Early return if encoded data is passed and args do not need processing
      if (data) {
        return {
          to: processedContract.address,
          data: (await processArg({
            arg: data,
            chainId,
            localABIs,
            appState,
            rpcs,
            pinataApiKeys,
            explorerKeys,
          })) as string,
          value: processValue.toString(),
          operation: Number(processedOperations),
        };
      }

      const processedArgs = await Promise.all(
        args.map(
          async (arg) =>
            await processArg({
              arg,
              chainId,
              localABIs,
              appState,
              rpcs,
              pinataApiKeys,
              explorerKeys,
            })
        )
      );

      return txActionToMetaTx({
        abi: processedContract.abi,
        method,
        address: processedContract.address,
        args: processedArgs,
        value: Number(processValue),
        operation: Number(processedOperations),
      });
    })
  );
  const encodedFormActions = arg.formActions
    ? handleMulticallFormActions({ appState })
    : [];

  if (arg.type === 'encodeMulticall') {
    const result = encodeMultiSend([...encodedActions, ...encodedFormActions]);

    if (typeof result !== 'string') {
      throw new Error('Could not encode generic multicall');
    }
    return result;
  }

  const result = encodeMultiAction([...encodedActions, ...encodedFormActions]);

  if (typeof result !== 'string') {
    throw new Error(result.message);
  }
  return result;
};

export const handleGasEstimate = async ({
  safeId,
  chainId,
  localABIs = {},
  appState,
  arg,
  rpcs,
  pinataApiKeys,
  explorerKeys,
}: {
  safeId?: string;
  chainId: ValidNetwork;
  arg: EstmimateGas;
  appState: ArbitraryState;
  localABIs?: Record<string, ABI>;
  rpcs: Keychain;
  pinataApiKeys: PinataApiKeys;
  explorerKeys: Keychain;
}) => {
  if (!safeId) throw new Error('Safe ID is required to estimate gas');

  const proposalData = await handleMulticallArg({
    localABIs,
    chainId,
    appState,
    arg: {
      type: 'multicall',
      actions: arg.actions,
      formActions: arg.formActions,
    },
    rpcs,
    pinataApiKeys,
    explorerKeys,
  });

  const estimate = await estimateGas({
    chainId,
    safeId,
    data: proposalData,
  });

  console.log('estimate', estimate);
  if (estimate?.safeTxGas) {
    const buffer = arg.bufferPercentage ? `1.${arg.bufferPercentage}` : 1.6;
    return Math.round(Number(estimate.safeTxGas) * Number(buffer));
  } else {
    // This happens when the safe vault takes longer to be indexed by the Gnosis API
    // and it returns a 404 HTTP error
    console.error(`Failed to estimate gas`);
    return 0;
  }
};
export const encodeMultiAction = (rawMulti: MetaTransaction[]) => {
  return encodeFunction(LOCAL_ABI.GNOSIS_MULTISEND, 'multiSend', [
    encodeMultiSend(rawMulti),
  ]);
};

export const buildMultiCallTX = ({
  id,
  baalAddress = CURRENT_DAO,
  actions,
  JSONDetails = basicDetails,
  formActions = false,
}: {
  id: string;
  baalAddress?: StringSearch | Keychain | EthAddress;
  JSONDetails?: JSONDetailsSearch;
  actions: MulticallAction[];
  formActions?: boolean;
}): TXLego => {
  return {
    id,
    method: 'submitProposal',
    contract: {
      ...BaalContractBase,
      type: 'static',
      targetAddress: baalAddress,
    },
    args: [
      {
        type: 'multicall',
        actions,
        formActions,
      },
      {
        type: 'proposalExpiry',
        search: `${FORM}${EXPIRY}`,
        fallback: 0,
      },
      {
        type: 'estimateGas',
        actions,
        formActions,
      },
      JSONDetails,
    ],
  };
};

export const handleArgEncode = async ({
  arg,
  chainId,
  safeId,
  localABIs,
  appState,
  rpcs,
  pinataApiKeys,
  explorerKeys,
}: {
  arg: ArgEncode;
  chainId: ValidNetwork;
  safeId?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
  rpcs: Keychain;
  pinataApiKeys: PinataApiKeys;
  explorerKeys: Keychain;
}) => {
  const { args, solidityTypes } = arg;
  if (args.length !== solidityTypes.length) {
    throw new Error(`Arguments and types must be the same length`);
  }

  const processedArgs = await Promise.all(
    args.map(
      async (arg) =>
        await processArg({
          arg,
          chainId,
          localABIs,
          appState,
          rpcs,
          pinataApiKeys,
          explorerKeys,
        })
    )
  );
  console.log('processedArgs', processedArgs);

  return encodeValues(solidityTypes, processedArgs);
};
