import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

import { graphFetchList } from '@daohaus/data-fetch-utils';
import { AccountProfile } from '@daohaus/utils';
import {
  ListActiveDomainsDocument,
  ListActiveDomainsQuery,
  ListActiveDomainsQueryVariables,
} from './subgraph/queries-ens/account.generated';
import {
  ListProfileDocument,
  ListProfileQuery,
  ListProfileQueryVariables,
} from './subgraph/queries-lens/profiles.generated';
import { ENSDomain, LensProfile } from './types';
import { transformProfile } from './utils';

export const getProfileForAddress = async (
  address: string,
  rpcUri?: string
): Promise<AccountProfile> => {
  const reverseEnsRecord =
    rpcUri && (await getENSReverseResolver({ address, rpcUri }));
  const ensDomain = reverseEnsRecord
    ? reverseEnsRecord
    : await getENSDomain({
        address,
      });
  const lensProfile = await getLensProfile({
    memberAddress: address,
  } as ListProfileQueryVariables);

  return transformProfile({ address, lensProfile, ensDomain });
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
      return {
        domain: {
          name: ensName,
        },
      };
    }
  } catch (error) {
    console.error('Unable to fetch ENS reverse record', error);
  }
};

const getENSDomain = async ({
  address,
  now = (new Date().getTime() / 1000).toFixed(0),
}: ListActiveDomainsQueryVariables): Promise<ENSDomain> => {
  const endpoint = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';

  const res = await graphFetchList<
    ListActiveDomainsQuery,
    ListActiveDomainsQueryVariables
  >(ListActiveDomainsDocument, endpoint, {
    address: address.toLowerCase(),
    now,
  });

  return res.account?.activeDomains?.[0];
};

const getLensProfile = async ({
  memberAddress,
}: {
  memberAddress: ListProfileQueryVariables;
}): Promise<LensProfile> => {
  const url = 'https://api.lens.dev';

  const res = await graphFetchList<ListProfileQuery, ListProfileQueryVariables>(
    ListProfileDocument,
    url,
    {
      memberAddress,
    }
  );

  return res.profiles.items[0];
};
