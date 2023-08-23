import { useState, useCallback } from 'react';
import type { BigIntish, BytesLike } from '@daohaus/utils';
import {
  hashMessage,
  isHexString,
  toUtf8String,
  _TypedDataEncoder,
} from 'ethers/lib/utils';
import { LOCAL_ABI } from '@daohaus/abis';
import { encodeFunction } from '@daohaus/utils';
import { CONTRACT_KEYCHAINS, ValidNetwork } from '@daohaus/keychain-utils';

import WalletConnect from '@walletconnect/client';
import { IClientMeta } from '@walletconnect/legacy-types';

type EIP712TypedData = {
  domain: {
    name?: string;
    version?: string;
    chainId?: BigIntish;
    verifyingContract?: string;
    salt?: BytesLike;
  };
  types: {
    [key: string]: {
      name: string;
      type: string;
    }[];
  };
  message: Record<string, unknown>;
};

export enum WalletConnectVersion {
  NONE,
  V1,
  V2,
}

// WalletConnect URI follows eip-1328 standard
// see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1328.md
export const getWalletConnectVersion = (uri: string): WalletConnectVersion => {
  const encodedURI = encodeURI(uri);
  return encodedURI?.split('@')?.[1]?.[0] === '1'
    ? WalletConnectVersion.V1
    : WalletConnectVersion.V2;
};

export const isObjectEIP712TypedData = (
  obj?: unknown
): obj is EIP712TypedData => {
  return (
    typeof obj === 'object' &&
    obj != null &&
    'domain' in obj &&
    'types' in obj &&
    'message' in obj
  );
};

const getDecodedMessage = (message: string): string => {
  if (isHexString(message)) {
    // If is a hex string we try to extract a message
    try {
      return toUtf8String(message);
    } catch (e) {
      // the hex string is not UTF8 encoding so we will return the raw message.
    }
  }
  return message;
};

export const encodeSafeSignMessage = (
  chainId: ValidNetwork,
  message: string | EIP712TypedData
) => {
  const signLibAddress = CONTRACT_KEYCHAINS.GNOSIS_SIGNLIB[chainId];
  const signedTypedMessage = (message: string | EIP712TypedData): string => {
    if (isObjectEIP712TypedData(message)) {
      const typesCopy = { ...message.types };
      // Source: https://github.com/safe-global/safe-wallet-web/blob/dev/src/components/tx-flow/flows/SignMessageOnChain/ReviewSignMessageOnChain.tsx
      // We need to remove the EIP712Domain type from the types object
      // Because it's a part of the JSON-RPC payload, but for the `.hash` in ethers.js
      // The types are not allowed to be recursive, so ever type must either be used by another type, or be
      // the primary type. And there must only be one type that is not used by any other type.
      delete typesCopy.EIP712Domain;
      return _TypedDataEncoder.hash(message.domain, typesCopy, message.message);
    }
    return hashMessage(getDecodedMessage(message));
  };
  const msgHash = signedTypedMessage(message);
  const data = encodeFunction(LOCAL_ABI.GNOSIS_SIGNLIB, 'signMessage', [
    msgHash,
  ]);
  if (signLibAddress && typeof data === 'string') {
    return {
      to: signLibAddress,
      data,
      value: '0',
      operation: '1',
    };
  }
  return undefined;
};

const rejectWithMessage = (
  connector: WalletConnect,
  id: number,
  message: string
) => {
  connector.rejectRequest({ id, error: { message } });
};

export type WCParams = {
  chainId: ValidNetwork;
  safeAddress: string;
  session?: WalletConnect;
  uri: string;
};

export type Tx = {
  data: string;
  from?: string;
  gas?: string;
  to: string;
  value: string;
  operation?: string;
};

export type WCPayload = {
  id: number;
  jsonrpc: string;
  method: string;
  params: Array<Tx>;
};

export const useWalletConnect = (): {
  wcConnector?: WalletConnect;
  wcClientData?: IClientMeta;
  txPayload?: WCPayload;
  txError?: string;
  wcConnect: (params: WCParams) => Promise<void>;
  wcDisconnect: (session: WalletConnect) => Promise<void>;
} => {
  const [wcClientData, setWcClientData] = useState<IClientMeta>();
  const [txPayload, setTxPayload] = useState();
  const [wcConnector, setConnector] = useState<WalletConnect>();
  const [localStorageSessionKey, setLocalStorageSessionKey] = useState('');
  const [txError, setTxError] = useState('');

  const wcDisconnect = useCallback(
    async (session: WalletConnect) => {
      try {
        await session.killSession();
      } catch (error) {
        console.error('Error trying to close WC session: ', error);
      } finally {
        setConnector(undefined);
        setWcClientData(undefined);
        localStorage.removeItem(localStorageSessionKey);
        setLocalStorageSessionKey('');
        setTxError('');
      }
    },
    [localStorageSessionKey]
  );

  const wcConnect = useCallback(
    async ({ chainId, safeAddress, session, uri }: WCParams) => {
      const connector = new WalletConnect({
        uri,
        session,
        storageId: `session_${safeAddress}`,
      });
      setConnector(connector);
      setWcClientData(connector.peerMeta || undefined);
      setLocalStorageSessionKey(`session_${safeAddress}`);

      connector.on('session_request', (error, payload) => {
        if (error) {
          setTxError(error.message);
          throw error;
        }

        connector.approveSession({
          accounts: [safeAddress],
          chainId: Number(chainId),
        });

        setWcClientData(payload.params[0].peerMeta);
      });

      connector.on('call_request', async (error, payload) => {
        setTxError('');
        try {
          if (error) {
            setTxError(error.message);
            throw error;
          }
          switch (payload.method) {
            case 'eth_sendTransaction': {
              setTxPayload(payload);
              break;
            }
            case 'personal_sign': {
              const [message] = payload.params;
              if (message.startsWith('0x')) {
                const tx = encodeSafeSignMessage(chainId, message);
                setTxPayload({
                  ...payload,
                  params: [tx],
                });
              } else {
                const errorMsg = 'Tx personal_sign has the wrong format';
                setTxError(errorMsg);
                rejectWithMessage(connector, payload.id, errorMsg);
              }
              break;
            }
            case 'eth_signTypedData':
            case 'eth_signTypedData_v4': {
              const [, typedDataString] = payload.params;
              const typedData = JSON.parse(typedDataString);
              if (isObjectEIP712TypedData(typedData)) {
                const tx = encodeSafeSignMessage(chainId, typedData);
                setTxPayload({
                  ...payload,
                  params: [tx],
                });
              } else {
                const errorMsg = 'Tx eth_signTypedData has the wrong format';
                setTxError(errorMsg);
                rejectWithMessage(connector, payload.id, errorMsg);
              }
              break;
            }
            default: {
              const errorMsg = 'Tx type not supported';
              setTxError(errorMsg);
              rejectWithMessage(connector, payload.id, errorMsg);
              break;
            }
          }
        } catch (exception) {
          const errorMsg = (exception as Error).message;
          setTxError(errorMsg);
          rejectWithMessage(connector, payload.id, errorMsg);
        }
      });

      connector.on('disconnect', (error) => {
        if (error) {
          throw error;
        }
        setTxPayload(undefined);
        if (wcConnector) wcDisconnect(wcConnector);
      });
    },
    [wcConnector, wcDisconnect]
  );

  return {
    wcConnector,
    wcClientData,
    txPayload,
    txError,
    wcConnect,
    wcDisconnect,
  };
};
