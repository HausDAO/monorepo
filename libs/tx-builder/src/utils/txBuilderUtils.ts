import { PublicClient } from 'wagmi';
import { getAccount } from '@wagmi/core';
import { Hash } from 'viem';

import { ABI, ArbitraryState, ReactSetter, TXLego } from '@daohaus/utils';
import {
  Keychain,
  PinataApiKeys,
  VIEM_CHAINS,
  ValidNetwork,
} from '@daohaus/keychain-utils';

import { pollLastTX, standardGraphPoll, testLastTX } from './polling';
import { processArgs } from './args';
import { processContractLego } from './contractHelpers';
import { ArgCallback, TXLifeCycleFns } from '../TXBuilder';
import { processOverrides } from './overrides';

export type TxRecord = Record<string, TXLego>;
export type MassState = {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
  daoid?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
};

// The console logs below are to help devs monitor and debug their txs.

export const executeTx = async (args: {
  tx: TXLego;
  txHash: Hash;
  publicClient: PublicClient;
  setTransactions: ReactSetter<TxRecord>;
  chainId: ValidNetwork;
  lifeCycleFns?: TXLifeCycleFns;
  graphApiKeys: Keychain;
  appState: ArbitraryState;
}) => {
  const {
    tx,
    txHash,
    publicClient,
    setTransactions,
    chainId,
    lifeCycleFns,
    graphApiKeys,
    appState,
  } = args;
  console.log('**Transaction Initatiated**');
  console.log('txHash', txHash);
  try {
    lifeCycleFns?.onTxHash?.(txHash);
    setTransactions((prevState) => ({
      ...prevState,
      [txHash]: { ...tx, status: 'idle' },
    }));
    console.log('**Transaction Pending**');

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });
    console.log('**Transaction Mined**');
    console.log('**Transaction Receipt**', receipt);

    if (receipt.status === 'reverted') {
      throw new Error('CALL_EXCEPTION: txReceipt status 0');
    }

    setTransactions((prevState) => ({
      ...prevState,
      [txHash]: { ...tx, status: 'polling' },
    }));
    console.log('**Transaction Successful**');
    lifeCycleFns?.onTxSuccess?.(receipt, txHash, appState);

    if (!tx.disablePoll) {
      standardGraphPoll({
        poll: tx?.customPoll?.fetch || pollLastTX,
        test: tx?.customPoll?.test || testLastTX,
        variables: {
          chainId,
          txHash,
          graphApiKeys,
        },
        onPollStart() {
          lifeCycleFns?.onPollStart?.();
          console.log('**Polling**');
        },
        onPollSuccess(result) {
          lifeCycleFns?.onPollSuccess?.(result, receipt, appState);
          console.log('**Poll Successful**');
          setTransactions((prevState) => ({
            ...prevState,
            [txHash]: { ...tx, status: 'success' },
          }));
        },
        onPollError(error) {
          lifeCycleFns?.onPollError?.(error);
          console.log('**Poll Error**');
          setTransactions((prevState) => ({
            ...prevState,
            [txHash]: { ...tx, status: 'pollFailed' },
          }));
        },
      });
    }
    return {
      receipt,
      txHash,
    };
  } catch (error) {
    console.log('**TX Error**');
    console.error(error);
    lifeCycleFns?.onTxError?.(error);
    setTransactions((prevState) => ({
      ...prevState,
      [txHash]: { ...tx, status: 'failed' },
    }));
    return;
  }
};

export async function prepareTX(args: {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
  setTransactions: ReactSetter<TxRecord>;
  appState: ArbitraryState;
  lifeCycleFns: TXLifeCycleFns;
  localABIs: Record<string, ABI>;
  argCallbackRecord: Record<string, ArgCallback>;
  rpcs: Keychain;
  graphApiKeys: Keychain;
  pinataApiKeys: PinataApiKeys;
  explorerKeys: Keychain;
  publicClient?: PublicClient;
}) {
  const {
    argCallbackRecord,
    tx,
    chainId,
    safeId,
    localABIs,
    lifeCycleFns,
    appState,
    rpcs,
    explorerKeys,
    pinataApiKeys,
    graphApiKeys,
    publicClient,
  } = args;
  console.log('**APPLICATION STATE**', appState);
  try {
    const processedContract = await processContractLego({
      localABIs,
      contract: tx.contract,
      chainId,
      appState,
      rpcs,
      explorerKeys,
    });
    console.log('**PROCESSED CONTRACT**', processedContract);

    const { abi, address } = processedContract;
    const { method } = tx;

    const processedArgs = await processArgs({
      tx: { ...tx, contract: processedContract },
      localABIs,
      chainId,
      safeId,
      appState,
      argCallbackRecord,
      rpcs,
      pinataApiKeys,
      explorerKeys,
    });

    console.log('**PROCESSED ARGS**', processedArgs);

    const overrides = await processOverrides({
      tx,
      localABIs,
      chainId,
      safeId,
      appState,
      rpcs,
      pinataApiKeys,
      explorerKeys,
    });

    console.log('**PROCESSED overrides**', overrides);

    if (!publicClient) {
      return;
    }

    const { address: account, connector } = getAccount();

    const walletClient = await connector?.getWalletClient({
      chainId: VIEM_CHAINS[chainId]?.id,
    });
    if (!walletClient) {
      throw new Error('Wallet Client not found!');
    }

    const { request } = await publicClient.simulateContract({
      account,
      address: address as `0x${string}`,
      abi,
      args: processedArgs,
      functionName: method,
      value: overrides.value,
      gas: overrides.gasLimit,
      maxFeePerGas: overrides.gasPrice,
      blockTag: overrides.blockTag,
    });

    lifeCycleFns?.onRequestSign?.();

    const txHash = await walletClient.writeContract(request);

    console.log('txHash', txHash);

    executeTx({ ...args, publicClient, txHash, graphApiKeys });
  } catch (error) {
    console.log('**TX Error**');
    console.error(error);
    lifeCycleFns?.onTxError?.(error);
  }
}
