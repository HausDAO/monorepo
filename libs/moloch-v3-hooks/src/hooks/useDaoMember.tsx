import {
  getGraphUrl,
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';

import { graphFetch } from '@daohaus/data-fetch-utils';
import {
  FindMemberDocument,
  FindMemberQuery,
  FindMemberQueryVariables,
} from '@daohaus/moloch-v3-data';
import { useQuery } from 'react-query';
import { handleErrorMessage } from '@daohaus/utils';

const findUserMember = async ({
  chainId,
  daoId,
  memberAddress,
  graphApiKeys,
}: {
  chainId: ValidNetwork;
  daoId: string;
  memberAddress: string;
  graphApiKeys: Keychain;
}) => {
  const url = getGraphUrl(chainId, graphApiKeys);

  if (!url) throw new Error('No graph url found for network: ' + chainId);

  try {
    const res = await graphFetch<FindMemberQuery, FindMemberQueryVariables>(
      FindMemberDocument,
      url,
      chainId,
      {
        id: `${daoId}-member-${memberAddress.toLowerCase()}`,
      }
    );

    return res?.data?.member;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ fallback: 'Error fetching user member', error })
    );
  }
};

export const useUserMember = ({
  chainId,
  daoId,
  memberAddress,
  graphApiKeys = GRAPH_API_KEYS,
}: {
  chainId: ValidNetwork;
  daoId: string;
  memberAddress?: string | null;
  graphApiKeys?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    [`MolochV3User/${memberAddress}`, { chainId, daoId, memberAddress }],
    () =>
      findUserMember({
        chainId,
        daoId,
        memberAddress: memberAddress as string,
        graphApiKeys,
      }),
    { enabled: !!chainId && !!daoId && !!memberAddress }
  );

  return { user: data, error: error as Error, ...rest, isMember: !!data };
};
