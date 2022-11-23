import {
  ABI,
  ArbitraryState,
  ArgType,
  calcExpiry,
  StringSearch,
  TXLego,
  ValidArgType,
} from '@daohaus/utils';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';

import { ArgCallback } from '../TXBuilder';
import { handleIPFSPinata } from './ipfs';
import {
  handleArgEncode,
  handleEncodeCallArg,
  handleGasEstimate,
  handleMulticallArg,
} from './multicall';
import { handleDetailsJSON, searchArg } from './search';

export const isSearchArg = (arg: ValidArgType): arg is StringSearch => {
  return typeof arg === 'string' && arg[0] === '.';
};

const handleKeychainArg = ({
  chainId,
  keychain,
}: {
  chainId: ValidNetwork;
  keychain: Keychain;
}) => {
  if (!keychain[chainId]) {
    throw new Error(`Could not find keychain for chainId: ${chainId}`);
  }
  return keychain[chainId] as string;
};

const handleArgCallback = async ({
  tx,
  chainId,
  safeId,
  localABIs,
  appState,
  argCallbackRecord,
}: {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
  argCallbackRecord: Record<string, ArgCallback>;
}) => {
  const callbackKey = tx.argCallback;

  if (callbackKey && argCallbackRecord[callbackKey]) {
    const callback = argCallbackRecord[callbackKey];
    const result = await callback({ tx, chainId, safeId, localABIs, appState });
    return result;
  }
  throw new Error(`Could not find argCallback: ${callbackKey}`);
};

export const processArg = async ({
  arg,
  chainId,
  safeId,
  localABIs,
  appState,
}: {
  arg: ValidArgType;
  chainId: ValidNetwork;
  safeId?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
}): Promise<ArgType> => {
  if (isSearchArg(arg)) {
    return searchArg({ appState, searchString: arg, shouldThrow: true });
  }
  if (arg?.type === 'static') {
    return arg.value;
  }
  if (arg?.type === 'singleton') {
    return handleKeychainArg({ chainId, keychain: arg.keychain });
  }
  if (arg?.type === 'nestedArray') {
    return Promise.all(
      arg.args.map(
        async (arg) =>
          await processArg({ arg, chainId, safeId, localABIs, appState })
      )
    );
  }
  if (arg?.type === 'multicall') {
    const result = await handleMulticallArg({
      arg,
      chainId,
      localABIs,
      appState,
    });
    return result;
  }
  if (arg?.type === 'encodeCall') {
    const result = await handleEncodeCallArg({
      arg,
      chainId,
      localABIs,
      appState,
    });
    return result;
  }
  if (arg?.type === 'argEncode') {
    const result = await handleArgEncode({
      arg,
      chainId,
      safeId,
      localABIs,
      appState,
    });
    return result;
  }
  if (arg?.type === 'ipfsPinata') {
    const result = await handleIPFSPinata({
      arg,
      chainId,
      safeId,
      localABIs,
      appState,
    });
    return result;
  }
  if (arg?.type === 'estimateGas') {
    console.log('********ESTIMATE');
    const result = await handleGasEstimate({
      arg,
      chainId,
      safeId,
      localABIs,
      appState,
    });
    return result;
  }
  if (arg?.type === 'proposalExpiry') {
    if (arg.search) {
      const result = searchArg({
        appState,
        searchString: arg.search,
        shouldThrow: false,
      });

      return typeof result === 'number'
        ? calcExpiry(result)
        : calcExpiry(arg.fallback);
    }
    return calcExpiry(arg.fallback);
  }
  if (arg?.type === 'JSONDetails') {
    const result = await handleDetailsJSON({
      arg,
      chainId,
      safeId,
      localABIs,
      appState,
    });
    return result;
  }
  console.log('**DEBUG**');
  console.log('arg', arg);
  throw new Error(`ArgType not found.`);
};

export const processArgs = async ({
  tx,
  chainId,
  safeId,
  localABIs,
  appState,
  argCallbackRecord,
}: {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
  argCallbackRecord: Record<string, ArgCallback>;
}) => {
  const { argCallback, args, staticArgs } = tx;

  if (staticArgs) {
    return staticArgs;
  }
  if (argCallback) {
    return handleArgCallback({
      tx,
      chainId,
      safeId,
      localABIs,
      appState,
      argCallbackRecord,
    });
  }

  if (args) {
    return await Promise.all(
      args?.map(
        async (arg) =>
          await processArg({ arg, chainId, safeId, localABIs, appState })
      )
    );
  }
  throw new Error(
    'TX Lego must have a valid arg type, use either a string alias for an argument callback or an array of valid arguments'
  );
};
