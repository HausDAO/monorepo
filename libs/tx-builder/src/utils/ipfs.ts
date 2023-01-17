import { ABI, ArbitraryState, IPFSPinata } from '@daohaus/utils';
import { pinataPostJSON } from '@daohaus/data-fetch-utils';
import { Keychain, PinataApiKeys, ValidNetwork } from '@daohaus/keychain-utils';

import { processArg } from './args';

export const handleIPFSPinata = async ({
  arg,
  chainId,
  safeId,
  localABIs,
  appState,
  rpcs,
  pinataApiKeys,
  explorerKeys,
}: {
  arg: IPFSPinata;
  chainId: ValidNetwork;
  safeId?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
  rpcs: Keychain;
  pinataApiKeys: PinataApiKeys;
  explorerKeys: Keychain;
}) => {
  const processedContent = await processArg({
    arg: arg?.content,
    chainId,
    safeId,
    localABIs,
    appState,
    rpcs,
    pinataApiKeys,
    explorerKeys,
  });

  const pinata_api_key = pinataApiKeys.pinata_api_key;
  const pinata_api_secret = pinataApiKeys.pinata_api_secret;

  if (!pinata_api_key || !pinata_api_secret) {
    throw new Error(
      'PINATA_API_KEY and PINATA_API_SECRET must be set in the environment'
    );
  }

  const res = await pinataPostJSON({
    creds: {
      pinata_api_key,
      pinata_api_secret,
    },
    jsonString: JSON.stringify({ data: processedContent }),
  });

  const IPFSpin = res.IpfsHash;
  console.log('***IPFSpin***', IPFSpin);
  if (IPFSpin) {
    return IPFSpin;
  }
  throw new Error(`IPFS Pin failed.`);
};
