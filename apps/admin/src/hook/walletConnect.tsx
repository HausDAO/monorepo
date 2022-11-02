import { useState, useCallback } from 'react';
import { BigNumberish, BytesLike } from 'ethers';
import { hashMessage, _TypedDataEncoder } from 'ethers/lib/utils'
import { LOCAL_ABI } from '@daohaus/abi-utilities';
import { CONTRACTS, encodeFunction, ValidNetwork } from '@daohaus/common-utilities';
import WalletConnect from '@walletconnect/client';
import { IClientMeta } from '@walletconnect/types';

type EIP712TypedData = {
  domain: {
    name?: string;
    version?: string;
    chainId?: BigNumberish;
    verifyingContract?: string;
    salt?: BytesLike;
  };
  types: { 
    [key: string]: {
      name: string;
      type: string;
    }[]
  };
  message: Record<string, unknown>;
};

const isObjectEIP712TypedData = (obj?: unknown): obj is EIP712TypedData => {
  return typeof obj === 'object' && obj != null && 'domain' in obj && 'types' in obj && 'message' in obj;
};

export const encodeSafeSignMessage = (chainId: ValidNetwork, message: string | EIP712TypedData) => {
  const signLibAddress = CONTRACTS.GNOSIS_SIGNLIB[chainId];
  const msgHash = isObjectEIP712TypedData(message)
    ? _TypedDataEncoder.hash(message.domain, message.types, message.message)
    : hashMessage(message);
  const data = encodeFunction(LOCAL_ABI.GNOSIS_SIGNLIB, 'signMessage', [msgHash]);
  if (signLibAddress && typeof data === 'string') {
    return {
      to: signLibAddress,
      data,
      value: '0',
      operation: '1',
    };
  }
};

const rejectWithMessage = (connector: WalletConnect, id: number, message: string) => {
  connector.rejectRequest({ id, error: { message } });
};

type WCParams = {
  chainId: ValidNetwork;
  safeAddress: string;
  session?: WalletConnect;
  uri: string;
};

type Tx = {
  data: string;
  from: string;
  gas: string;
  to: string;
  value: string;
  operation?: string;
};

type WCPayload = {
  id: number;
  jsonrpc: string;
  method: string;
  params: Array<Tx>;
};

export const useWalletConnect = (): {
  wcConnector?: WalletConnect;
  wcClientData?: IClientMeta;
  txPayload?: WCPayload,
  txError?: string;
  wcConnect: (params: WCParams) => Promise<void>,
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
    [localStorageSessionKey],
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

      connector.on('disconnect', error => {
        if (error) {
          throw error;
        }
        setTxPayload(undefined);
        if (wcConnector) wcDisconnect(wcConnector);
      });
    },
    [wcConnector, wcDisconnect],
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
