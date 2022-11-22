import {
  formatFetchError,
  graphFetch,
  graphFetchList,
  IFindQueryResult,
  IListQueryArguments,
  IListQueryResults,
} from '@daohaus/data-fetch-utils';
import { getGraphUrl, Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import {
  ListVotesDocument,
  ListVotesQuery,
  ListVotesQueryVariables,
} from './subgraph/queries/votes.generated';
import {
  FindProposalDocument,
  FindProposalQuery,
  FindProposalQueryVariables,
  ITransformedProposalListQuery,
  ITransformedProposalQuery,
  ListProposalsDocument,
  ListProposalsQuery,
  ListProposalsQueryVariables,
  Proposal_Filter,
  Proposal_OrderBy,
  Vote_Filter,
  Vote_OrderBy,
} from './types';
import {
  createPaging,
  DEFAULT_RECORDS_PER_PAGE,
  transformProposal,
} from './utils';

export const findProposal = async ({
  networkId,
  dao,
  proposalId,
  connectedAddress,
  graphApiKeys,
}: {
  networkId: ValidNetwork;
  dao: string;
  proposalId: string;
  connectedAddress?: string | null;
  graphApiKeys?: Keychain;
}): Promise<IFindQueryResult<ITransformedProposalQuery>> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    return {
      error: formatFetchError({ type: 'INVALID_NETWORK_ERROR' }),
    };
  }

  try {
    const queryResult = await graphFetch<
      FindProposalQuery,
      FindProposalQueryVariables
    >(FindProposalDocument, url, networkId, {
      id: `${dao}-proposal-${proposalId}`,
      connectedAddress,
    });

    return {
      ...queryResult,
      data: {
        proposal:
          queryResult?.data?.proposal &&
          transformProposal(queryResult.data.proposal),
      },
    };
  } catch (err) {
    return {
      error: formatFetchError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
    };
  }
};

export const listProposals = async ({
  networkId,
  filter,
  ordering = {
    orderBy: 'createdAt',
    orderDirection: 'desc',
  },
  paging = {
    pageSize: DEFAULT_RECORDS_PER_PAGE,
    offset: 0,
  },
  graphApiKeys,
}: IListQueryArguments<Proposal_OrderBy, Proposal_Filter>): Promise<
  IListQueryResults<
    Proposal_OrderBy,
    Proposal_Filter,
    ITransformedProposalListQuery['proposals']
  >
> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    throw formatFetchError({ type: 'INVALID_NETWORK_ERROR' });
  }

  const res = await graphFetchList<
    ListProposalsQuery,
    ListProposalsQueryVariables
  >(ListProposalsDocument, url, {
    where: { ...filter, id_gt: paging.lastId || '' },
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
    items: pagingUpdates.pageItems.map((prop) => transformProposal(prop)),
  };
};

export const listVotes = async ({
  networkId,
  filter,
  ordering = {
    orderBy: 'createdAt',
    orderDirection: 'desc',
  },
  paging = {
    pageSize: DEFAULT_RECORDS_PER_PAGE,
    offset: 0,
  },
  graphApiKeys,
}: IListQueryArguments<Vote_OrderBy, Vote_Filter>): Promise<
  IListQueryResults<Vote_OrderBy, Vote_Filter, ListVotesQuery['votes']>
> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    throw formatFetchError({ type: 'INVALID_NETWORK_ERROR' });
  }

  const res = await graphFetchList<ListVotesQuery, ListVotesQueryVariables>(
    ListVotesDocument,
    url,
    {
      where: { ...filter, id_gt: paging.lastId || '' },
      orderBy: paging.lastId ? 'id' : ordering.orderBy,
      orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
      first: paging.pageSize + 1,
      skip: paging.offset,
    }
  );

  const pagingUpdates = createPaging(res['votes'], paging);

  return {
    networkId,
    filter,
    ordering,
    nextPaging: pagingUpdates.nextPaging,
    previousPaging: pagingUpdates.previousPaging,
    items: pagingUpdates.pageItems,
  };
};
