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
import { transformProfile } from './utils/transformers';

export const getProfileForAddress = async (
  address: string
): Promise<AccountProfile> => {
  const ensDomain = await getENSDomain({
    address,
  });
  const lensProfile = await getLensProfile({
    memberAddress: address,
  } as ListProfileQueryVariables);

  return transformProfile({ address, lensProfile, ensDomain });
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
