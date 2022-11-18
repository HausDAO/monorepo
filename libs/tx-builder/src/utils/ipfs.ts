import {
  ABI,
  ArbitraryState,
  IPFSPinata,
  pinataPostJSON,
} from '@daohaus/utils';
import { ValidNetwork } from '@daohaus/keychain-utils';

import { processArg } from './args';

export const handleIPFSPinata = async ({
  arg,
  chainId,
  safeId,
  localABIs,
  appState,
}: {
  arg: IPFSPinata;
  chainId: ValidNetwork;
  safeId?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
}) => {
  const processedContent = await processArg({
    arg: arg?.content,
    chainId,
    safeId,
    localABIs,
    appState,
  });

  const pinata_api_key = process.env['NX_PINATA_API_KEY'];
  const pinata_api_secret = process.env['NX_PINATA_API_SECRET'];

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
