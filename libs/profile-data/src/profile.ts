import { createPublicClient, http } from 'viem';
import { normalize } from 'viem/ens';
import { mainnet } from 'viem/chains';

import { AccountProfile } from '@daohaus/utils';

import { transformProfile } from './utils';

export const getProfileForAddress = async ({
  address,
  rpcUri,
}: {
  address: string;
  rpcUri?: string;
}): Promise<AccountProfile> => {
  const reverseEnsRecord =
    rpcUri && (await getENSReverseResolver({ address, rpcUri }));

  return transformProfile({
    address,
    ensDomain: reverseEnsRecord,
  });
};

const getENSReverseResolver = async ({
  address,
  rpcUri,
}: {
  address: string;
  rpcUri: string;
}) => {
  try {
    const client = createPublicClient({
      chain: mainnet,
      transport: http(rpcUri),
    });

    const ensName = await client.getEnsName({
      address: address as `0x${string}`,
    });

    if (ensName) {
      const ensText = await client.getEnsAvatar({
        name: normalize(ensName),
      });
      return {
        domain: {
          name: ensName,
          avatar: ensText,
        },
      };
    }
  } catch (error) {
    console.error('Unable to fetch ENS reverse record', error);
  }
};
