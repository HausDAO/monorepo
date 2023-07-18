import { ethers, providers } from 'ethers';
import { createContext, useState, useMemo, useContext, ReactNode } from 'react';
import { PublicClient } from 'wagmi';

import { ABI, ArbitraryState, ArgType, TXLego } from '@daohaus/utils';
import {
  ABI_EXPLORER_KEYS,
  GRAPH_API_KEYS,
  HAUS_RPC,
  isValidNetwork,
  Keychain,
  PinataApiKeys,
  PINATA_API_KEYS,
} from '@daohaus/keychain-utils';

import { TxRecord, prepareTX } from './utils/txBuilderUtils';
import { bundleLifeCycleFns } from './utils/lifeCycleFns';

export type TXLifeCycleFns = {
  onRequestSign?: () => void;
  onTxHash?: (txHash: string) => void;
  onTxError?: (error: unknown) => void;
  onTxSuccess?: (
    txReceipt: ethers.providers.TransactionReceipt,
    txHash: string,
    appState: ArbitraryState
  ) => void;
  onPollStart?: () => void;
  onPollError?: (error: unknown) => void;
  onPollSuccess?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any,
    txReceipt: ethers.providers.TransactionReceipt,
    appState: ArbitraryState
  ) => void;
};

export type LifeCycleNames = keyof Required<TXLifeCycleFns>;

export type ArgCallback = (
  state: ArbitraryState
) => ArgType[] | Promise<ArgType[]>;
type FireTransaction<CallerStateModel extends ArbitraryState = ArbitraryState> =
  ({
    tx,
    callerState,
    lifeCycleFns,
    staticArgs,
  }: {
    tx: TXLego;
    callerState?: CallerStateModel;
    lifeCycleFns?: TXLifeCycleFns;
    staticArgs?: ArgType[];
  }) => Promise<boolean> | undefined;

type TxContext = {
  transactions: TxRecord;
  txAmt: number;
  fireTransaction: FireTransaction;
  appState?: ArbitraryState;
};

export const TxBuilderContext = createContext<TxContext>({
  transactions: {},
  fireTransaction: () => undefined,
  txAmt: 0,
  appState: undefined,
});

type BuilderProps<ApplicationState extends ArbitraryState = ArbitraryState> = {
  chainId: string | undefined | null;
  safeId?: string;
  daoId?: string;
  provider: providers.Web3Provider | undefined | null;
  children: ReactNode;
  appState: ApplicationState;
  txLifeCycleFns?: TXLifeCycleFns;
  localABIs?: Record<string, ABI>;
  argCallbackRecord?: Record<string, (args: ArbitraryState) => ArgType[]>;
  rpcs?: Keychain;
  graphApiKeys?: Keychain;
  pinataApiKeys?: PinataApiKeys;
  explorerKeys?: Keychain;
  publicClient?: PublicClient;
};

export const TXBuilder = ({
  chainId,
  safeId,
  daoId,
  provider,
  appState,
  children,
  localABIs = {},
  txLifeCycleFns = {},
  argCallbackRecord = {},
  rpcs = HAUS_RPC,
  graphApiKeys = GRAPH_API_KEYS,
  pinataApiKeys = PINATA_API_KEYS,
  explorerKeys = ABI_EXPLORER_KEYS,

  publicClient,
}: BuilderProps) => {
  const [transactions, setTransactions] = useState<TxRecord>({});
  const txAmt = useMemo(() => {
    return Object.values(transactions).length;
  }, [transactions]);

  const fireTransaction: FireTransaction = async ({
    tx,
    callerState,
    lifeCycleFns = {},
  }) => {
    // if (!chainId || !isValidNetwork(chainId) || !provider) {
    if (!chainId || !isValidNetwork(chainId)) {
      lifeCycleFns?.onTxError?.(
        Error('Invalid Network or no Web3 Wallet detected')
      );
      return false;
    }
    const wholeState = {
      ...appState,
      ...callerState,
      chainId,
      safeId,
      daoId,
      localABIs,
    };

    await prepareTX({
      tx,
      chainId,
      safeId,
      // provider,
      setTransactions,
      appState: wholeState,
      argCallbackRecord,
      lifeCycleFns: bundleLifeCycleFns({
        appEffects: txLifeCycleFns,
        componentEffects: lifeCycleFns,
      }),
      localABIs,
      rpcs,
      graphApiKeys,
      pinataApiKeys,
      explorerKeys,

      publicClient,
    });

    return true;
  };

  return (
    <TxBuilderContext.Provider
      value={{ transactions, fireTransaction, txAmt, appState }}
    >
      {children}
    </TxBuilderContext.Provider>
  );
};
export const useTxBuilder = () => useContext(TxBuilderContext);
