import {
  formatFetchError,
  graphFetch,
  graphFetchList,
  IFindQueryResult,
  IListQueryArguments,
  IListQueryResults,
} from '@daohaus/data-fetch-utils';
import { getGraphUrl, Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { nowInSeconds, MolochV3MembershipQuery } from '@daohaus/utils';
import {
  Dao_Filter,
  Dao_OrderBy,
  FindMemberDocument,
  FindMemberQuery,
  FindMemberQueryVariables,
  ICrossNetworkMemberListArguments,
  ListConnectedMemberProposalsDocument,
  ListConnectedMemberProposalsQuery,
  ListConnectedMemberProposalsQueryVariables,
  ListMembersDocument,
  ListMembershipsDocument,
  ListMembershipsQuery,
  ListMembershipsQueryVariables,
  ListMembersQuery,
  ListMembersQueryVariables,
  Member_Filter,
  Member_OrderBy,
  Proposal_Filter,
  Proposal_OrderBy,
} from './types';
import {
  createPaging,
  DEFAULT_RECORDS_PER_PAGE,
  transformMembershipList,
} from './utils';

export const findMember = async ({
  networkId,
  dao,
  memberAddress,
  graphApiKeys,
}: {
  networkId: ValidNetwork;
  dao: string;
  memberAddress: string;
  graphApiKeys?: Keychain;
}): Promise<IFindQueryResult<FindMemberQuery>> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    return {
      error: formatFetchError({ type: 'INVALID_NETWORK_ERROR' }),
    };
  }

  try {
    return await graphFetch<FindMemberQuery, FindMemberQueryVariables>(
      FindMemberDocument,
      url,
      networkId,
      {
        id: `${dao.toLowerCase()}-member-${memberAddress.toLowerCase()}`,
      }
    );
  } catch (err) {
    return {
      error: formatFetchError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
    };
  }
};

export const listMembers = async ({
  networkId,
  filter,
  ordering = {
    orderBy: 'id',
    orderDirection: 'desc',
  },
  paging = {
    pageSize: DEFAULT_RECORDS_PER_PAGE,
    offset: 0,
  },
  graphApiKeys,
}: IListQueryArguments<Member_OrderBy, Member_Filter>): Promise<
  IListQueryResults<Member_OrderBy, Member_Filter, ListMembersQuery['members']>
> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    throw formatFetchError({ type: 'INVALID_NETWORK_ERROR' });
  }

  console.log('filter', filter)
  const res = await graphFetchList<ListMembersQuery, ListMembersQueryVariables>(
    ListMembersDocument,
    url,
    {
      where: { ...filter, id_gt: paging.lastId || '' },
      orderBy: paging.lastId ? 'id' : ordering.orderBy,
      orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
      first: paging.pageSize + 1,
      skip: paging.offset,
    }
  );

  const pagingUpdates = createPaging(res['members'], paging);

  return {
    networkId,
    filter,
    ordering,
    nextPaging: pagingUpdates.nextPaging,
    previousPaging: pagingUpdates.previousPaging,
    items: pagingUpdates.pageItems,
  };
};

export const listDaosByMember = async ({
  memberAddress,
  daoFilter,
  memberFilter,
  ordering = {
    orderBy: 'createdAt',
    orderDirection: 'desc',
  },
  networkIds,
  graphApiKeys,
}: ICrossNetworkMemberListArguments<
  Dao_OrderBy,
  Dao_Filter,
  Member_Filter
>): Promise<IFindQueryResult<MolochV3MembershipQuery>> => {
  const promises: Promise<IFindQueryResult<ListMembershipsQuery>>[] = [];

  networkIds.forEach((networkId: ValidNetwork) => {
    const url = getGraphUrl(networkId, graphApiKeys);
    if (url) {
      promises.push(
        graphFetch<ListMembershipsQuery, ListMembershipsQueryVariables>(
          ListMembershipsDocument,
          url,
          networkId,
          {
            where: {
              members_: { memberAddress: memberAddress, ...memberFilter },
              ...daoFilter,
            },
            memberWhere: { memberAddress },
            now: nowInSeconds().toFixed(),
            orderBy: ordering.orderBy,
            orderDirection: ordering.orderDirection,
          }
        )
      );
    }
  });

  const memberData = await Promise.all(promises);

  return { data: { daos: transformMembershipList(memberData) } };
};

export const listProposalVotesByMember = async ({
  networkId,
  filter,
  memberAddress,
  ordering = {
    orderBy: 'createdAt',
    orderDirection: 'desc',
  },
  paging = {
    pageSize: DEFAULT_RECORDS_PER_PAGE,
    offset: 0,
  },
  graphApiKeys,
}: IListQueryArguments<Proposal_OrderBy, Proposal_Filter> & {
  memberAddress: string;
}): Promise<
  IListQueryResults<
    Proposal_OrderBy,
    Proposal_Filter,
    ListConnectedMemberProposalsQuery['proposals']
  >
> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    throw formatFetchError({ type: 'INVALID_NETWORK_ERROR' });
  }

  const res = await graphFetchList<
    ListConnectedMemberProposalsQuery,
    ListConnectedMemberProposalsQueryVariables
  >(ListConnectedMemberProposalsDocument, url, {
    where: { ...filter, id_gt: paging.lastId || '' },
    memberWhere: { memberAddress },
    orderBy: paging.lastId ? 'id' : ordering.orderBy,
    orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
    first: paging.pageSize + 1,
    skip: paging.offset,
  });

  const pagingUpdates = createPaging(res['proposals'], paging);

  return {
    networkId,
    filter,
    ordering,
    nextPaging: pagingUpdates.nextPaging,
    previousPaging: pagingUpdates.previousPaging,
    items: pagingUpdates.pageItems,
  };
};
