// Slimmed WalletConnect shared helpers (v1 client removed)
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

// NOTE: v1 client removed. If a wc: URI with @1 is supplied downstream code should surface an error.

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

// Removed hooks and types tied to v1 sessions.
// Lightweight shared types still required by the WalletConnect v2 implementation.

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

export type WCParams = {
  chainId: ValidNetwork;
  safeAddress: string;
  uri: string;
};
