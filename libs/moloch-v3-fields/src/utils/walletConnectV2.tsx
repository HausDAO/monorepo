import { useState, useCallback, useEffect } from 'react';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { Core } from '@walletconnect/core';
import { SignClientTypes, SessionTypes } from '@walletconnect/types';
import Web3WalletType, { Web3Wallet } from '@walletconnect/web3wallet';

import {
  WCParams,
  WCPayload,
  encodeSafeSignMessage,
  isObjectEIP712TypedData,
} from './walletConnect';

if (!process.env['NX_WALLET_CONNECT_ID']) {
  throw new Error('You need to provide NX_WALLET_CONNECT_ID env variable');
}

const WALLETCONNECT_V2_PROJECT_ID = process.env['NX_WALLET_CONNECT_ID'];

const WALLET_METADATA = {
  name: 'DAOHaus Admin',
  description: 'Interact with external contracts and applications',
  url: 'https://admin.daohaus.club',
  icons: [],
};

const EVMBasedNamespaces = 'eip155';

// see full list here: https://github.com/safe-global/safe-apps-sdk/blob/main/packages/safe-apps-provider/src/provider.ts#L35
export const compatibleSafeMethods: string[] = [
  'eth_accounts',
  'net_version',
  'eth_chainId',
  'personal_sign',
  'eth_sign',
  'eth_signTypedData',
  'eth_signTypedData_v4',
  'eth_sendTransaction',
  'eth_blockNumber',
  'eth_getBalance',
  'eth_getCode',
  'eth_getTransactionCount',
  'eth_getStorageAt',
  'eth_getBlockByNumber',
  'eth_getBlockByHash',
  'eth_getTransactionByHash',
  'eth_getTransactionReceipt',
  'eth_estimateGas',
  'eth_call',
  'eth_getLogs',
  'eth_gasPrice',
  'wallet_getPermissions',
  'wallet_requestPermissions',
  'safe_setSettings',
];

// see https://docs.walletconnect.com/2.0/specs/sign/error-codes
const UNSUPPORTED_CHAIN_ERROR_CODE = 5100;
const INVALID_METHOD_ERROR_CODE = 1001;
const USER_REJECTED_REQUEST_CODE = 4001;
const USER_DISCONNECTED_CODE = 6000;

export type wcConnectType = (params: WCParams) => Promise<void>;
export type wcDisconnectType = () => Promise<void>;

type useWalletConnectType = {
  wcClientData?: SignClientTypes.Metadata;
  wcConnect: wcConnectType;
  wcDisconnect: wcDisconnectType;
  isWallectConnectInitialized: boolean;
  txPayload?: WCPayload;
  error?: string;
};

const rejectResponse = (id: number, code: number, message: string) => {
  return {
    id,
    jsonrpc: '2.0',
    error: {
      code,
      message,
    },
  };
};

const useWalletConnectV2 = (): useWalletConnectType => {
  const [web3wallet, setWeb3wallet] = useState<Web3WalletType>();

  const [wcSession, setWcSession] = useState<SessionTypes.Struct>();
  const [isWallectConnectInitialized, setIsWallectConnectInitialized] =
    useState<boolean>(false);
  const [chainId, setChainId] = useState<number>();
  const [safeAddress, setSafeAddress] = useState<string>();
  const [txPayload, setTxPayload] = useState<WCPayload>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const initializeWalletConnectV2Client = async () => {
      const core = new Core({
        projectId: WALLETCONNECT_V2_PROJECT_ID,
        // logger: 'debug', // disabled on production
      });

      const web3wallet = await Web3Wallet.init({
        core,
        metadata: WALLET_METADATA,
      });

      setWeb3wallet(web3wallet);
    };

    try {
      initializeWalletConnectV2Client();
    } catch (error) {
      console.log('Error on walletconnect version 2 initialization: ', error);
      setIsWallectConnectInitialized(true);
    }
  }, []);

  useEffect(() => {
    // session_request needs to be a separate Effect because a valid wcSession should be present
    if (isWallectConnectInitialized && web3wallet && wcSession) {
      web3wallet.on('session_request', async (event) => {
        const { topic, id } = event;
        const { request, chainId: transactionChainId } = event.params;
        const { method, params } = request;

        const isSafeChainId =
          transactionChainId === `${EVMBasedNamespaces}:${chainId}`;

        // we only accept transactions from the Safe chain
        if (!isSafeChainId) {
          const errorMessage = `Transaction rejected: the connected Dapp is not set to the correct chain.`;
          setError(errorMessage);
          await web3wallet.respondSessionRequest({
            topic,
            response: rejectResponse(
              id,
              UNSUPPORTED_CHAIN_ERROR_CODE,
              errorMessage
            ),
          });
          return;
        }

        try {
          setError(undefined);
          switch (method) {
            case 'eth_sendTransaction': {
              setTxPayload({
                id,
                jsonrpc: '2.0',
                method,
                params,
              });
              break;
            }
            case 'personal_sign': {
              const [message] = params;
              if (message.startsWith('0x')) {
                const tx = encodeSafeSignMessage(
                  `0x${chainId?.toString(16)}` as ValidNetwork,
                  message
                );
                if (tx) {
                  setTxPayload({
                    id,
                    jsonrpc: '2.0',
                    method,
                    params: [tx],
                  });
                  break;
                }
              }
              const errorMsg = 'Tx personal_sign has the wrong format';
              setError(errorMsg);
              await web3wallet.respondSessionRequest({
                topic,
                response: rejectResponse(
                  id,
                  INVALID_METHOD_ERROR_CODE,
                  errorMsg
                ),
              });
              break;
            }
            case 'eth_signTypedData':
            case 'eth_signTypedData_v4': {
              const [, typedDataString] = params;
              const typedData = JSON.parse(typedDataString);
              if (isObjectEIP712TypedData(typedData)) {
                const tx = encodeSafeSignMessage(
                  `0x${chainId?.toString(16)}` as ValidNetwork,
                  typedData
                );
                if (tx) {
                  setTxPayload({
                    id,
                    jsonrpc: '2.0',
                    method,
                    params: [tx],
                  });
                  break;
                }
              }
              const errorMsg = 'Tx eth_signTypedData has the wrong format';
              setError(errorMsg);
              await web3wallet.respondSessionRequest({
                topic,
                response: rejectResponse(
                  id,
                  INVALID_METHOD_ERROR_CODE,
                  errorMsg
                ),
              });
              break;
            }
            default: {
              const errorMsg = 'Tx type not supported';
              setError(errorMsg);
              await web3wallet.respondSessionRequest({
                topic,
                response: rejectResponse(
                  id,
                  INVALID_METHOD_ERROR_CODE,
                  errorMsg
                ),
              });
              break;
            }
          }
        } catch (error) {
          const errorMsg = (error as Error)?.message;
          setError(errorMsg);
          const isUserRejection = errorMsg?.includes?.(
            'Transaction was rejected'
          );
          const code = isUserRejection
            ? USER_REJECTED_REQUEST_CODE
            : INVALID_METHOD_ERROR_CODE;
          await web3wallet.respondSessionRequest({
            topic,
            response: rejectResponse(id, code, errorMsg),
          });
        }
      });
    }
  }, [chainId, wcSession, isWallectConnectInitialized, web3wallet]);

  useEffect(() => {
    if (!isWallectConnectInitialized && web3wallet && chainId && safeAddress) {
      const activeSessions = web3wallet.getActiveSessions();
      const compatibleSession = Object.keys(activeSessions)
        .map((topic) => activeSessions[topic])
        .find(
          (session) =>
            session.namespaces[EVMBasedNamespaces].accounts[0] ===
            `${EVMBasedNamespaces}:${chainId}:${safeAddress}` // Safe Account
        );

      // restore an active previous session
      if (compatibleSession) {
        setWcSession(compatibleSession);
        setIsWallectConnectInitialized(true); // custom added
      }
    }
  }, [chainId, safeAddress, web3wallet, isWallectConnectInitialized]);

  const wcConnect = useCallback<wcConnectType>(
    async ({ chainId, safeAddress, uri }: WCParams) => {
      if (web3wallet) {
        setChainId(Number(chainId));
        setSafeAddress(safeAddress);
        // events
        web3wallet.on('session_proposal', async (proposal) => {
          const { id, params } = proposal;
          const { requiredNamespaces } = params;

          const safeAccount = `${EVMBasedNamespaces}:${Number(
            chainId
          )}:${safeAddress}`;
          const safeChain = `${EVMBasedNamespaces}:${Number(chainId)}`;
          // accept all events like chainChanged & accountsChanged (even if they are not compatible with the Safe)
          const safeEvents =
            requiredNamespaces[EVMBasedNamespaces]?.events || [];

          try {
            const wcSession = await web3wallet.approveSession({
              id,
              namespaces: {
                eip155: {
                  accounts: [safeAccount], // only the Safe account
                  chains: [safeChain], // only the Safe chain
                  methods: compatibleSafeMethods, // only the Safe methods
                  events: safeEvents,
                },
              },
            });

            setWcSession(wcSession);
            setError(undefined);
          } catch (error) {
            console.log('session_proposal error: ', error);
            setError((error as Error).message);

            // TODO:
            const errorMessage = `Connection refused: This Safe Account is in chain ${chainId} but the Wallet Connect session proposal is invalid as it required different chain`;
            await web3wallet.rejectSession({
              id: proposal.id,
              reason: {
                code: UNSUPPORTED_CHAIN_ERROR_CODE,
                message: errorMessage,
              },
            });
          }
        });

        web3wallet.on('session_delete', async () => {
          setWcSession(undefined);
          setError(undefined);
        });

        setIsWallectConnectInitialized(true);
        // Pairing session starts
        await web3wallet.core.pairing.pair({ uri });
      }
    },
    [web3wallet]
  );

  const wcDisconnect = useCallback<wcDisconnectType>(async () => {
    if (wcSession && web3wallet) {
      await web3wallet.disconnectSession({
        topic: wcSession.topic,
        reason: {
          code: USER_DISCONNECTED_CODE,
          message: 'User disconnected. Safe Wallet Session ended by the user',
        },
      });
      setWcSession(undefined);
      setError(undefined);
    }
  }, [web3wallet, wcSession]);

  const wcClientData = wcSession?.peer.metadata;

  return {
    wcConnect,
    wcClientData,
    wcDisconnect,
    txPayload,
    isWallectConnectInitialized,
    error,
  };
};

export default useWalletConnectV2;
