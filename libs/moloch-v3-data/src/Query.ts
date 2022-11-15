import {
  addApiKeyToGraphEnpoints,
  DaoTokenBalances,
  ENDPOINTS,
  Keychain,
  KeychainList,
  nowInSeconds,
  TokenBalance,
} from '@daohaus/utils';

import {
  IListQueryArguments,
  IFindQueryResult,
  ITransformedProposalQuery,
  ITransformedProposalListQuery,
  DaoWithTokenDataQuery,
  IListQueryResults,
  ITransformedDaoQuery,
  ITransformedDaoListQuery,
} from './types';
import * as fetch from './utils';
import { graphFetch, graphFetchList } from './utils/requests';
import {
  FindMemberDocument,
  FindMemberQuery,
  FindMemberQueryVariables,
  ListMembersDocument,
  ListMembersQuery,
  ListMembersQueryVariables,
} from './subgraph/queries/members.generated';
import {
  Dao_Filter,
  Dao_OrderBy,
  EventTransaction_Filter,
  EventTransaction_OrderBy,
  Member_Filter,
  Member_OrderBy,
  Proposal_Filter,
  Proposal_OrderBy,
  Vote_Filter,
  Vote_OrderBy,
} from './subgraph/schema.generated';
import {
  FindDaoDocument,
  FindDaoQuery,
  FindDaoQueryVariables,
  ListDaosDocument,
  ListDaosQuery,
  ListDaosQueryVariables,
} from './subgraph/queries/daos.generated';
import {
  FindProposalDocument,
  FindProposalQuery,
  FindProposalQueryVariables,
  ListProposalsDocument,
  ListProposalsQuery,
  ListProposalsQueryVariables,
} from './subgraph/queries/proposals.generated';
import {
  FindVoteDocument,
  FindVoteQuery,
  FindVoteQueryVariables,
  ListVotesDocument,
  ListVotesQuery,
  ListVotesQueryVariables,
} from './subgraph/queries/votes.generated';
import {
  FindTxDocument,
  FindTxQuery,
  FindTxQueryVariables,
  ListTxsDocument,
  ListTxsQuery,
  ListTxsQueryVariables,
} from './subgraph/queries/transactions.generated';
import {
  addDaoProfileFields,
  transformProposal,
  transformTokenBalances,
} from './utils/transformers';
import { ethers } from 'ethers';
import { HausError } from './HausError';
import { createPaging, DEFAULT_RECORDS_PER_PAGE } from './utils';

export default class Query {
  public endpoints: KeychainList;

  constructor(graphApiKeys?: Keychain) {
    this.endpoints = ENDPOINTS;

    if (graphApiKeys) {
      this.endpoints = addApiKeyToGraphEnpoints(graphApiKeys, ENDPOINTS);
    }
  }

  /*
  List queries
*/
  public async listDaos({
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
  }: IListQueryArguments<Dao_OrderBy, Dao_Filter>): Promise<
    IListQueryResults<Dao_OrderBy, Dao_Filter, ITransformedDaoListQuery['daos']>
  > {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      throw new HausError({ type: 'INVALID_NETWORK_ERROR' });
    }

    const res = await graphFetchList<ListDaosQuery, ListDaosQueryVariables>(
      ListDaosDocument,
      url,
      {
        where: { ...filter, id_gt: paging.lastId || '' },
        now: nowInSeconds().toFixed(),
        orderBy: paging.lastId ? 'id' : ordering.orderBy,
        orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
        first: paging.pageSize + 1,
        skip: paging.offset,
      }
    );

    const pagingUpdates = createPaging(res['daos'], paging);

    return {
      networkId,
      filter,
      ordering,
      nextPaging: pagingUpdates.nextPaging,
      previousPaging: pagingUpdates.previousPaging,
      items: pagingUpdates.pageItems.map((item) => {
        return { ...item, ...addDaoProfileFields(item) };
      }),
    };
  }

  public async listProposals({
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
  }: IListQueryArguments<Proposal_OrderBy, Proposal_Filter>): Promise<
    IListQueryResults<
      Proposal_OrderBy,
      Proposal_Filter,
      ITransformedProposalListQuery['proposals']
    >
  > {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      throw new HausError({ type: 'INVALID_NETWORK_ERROR' });
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
  }

  public async listMembers({
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
  }: IListQueryArguments<Member_OrderBy, Member_Filter>): Promise<
    IListQueryResults<
      Member_OrderBy,
      Member_Filter,
      ListMembersQuery['members']
    >
  > {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      throw new HausError({ type: 'INVALID_NETWORK_ERROR' });
    }

    const res = await graphFetchList<
      ListMembersQuery,
      ListMembersQueryVariables
    >(ListMembersDocument, url, {
      where: { ...filter, id_gt: paging.lastId || '' },
      orderBy: paging.lastId ? 'id' : ordering.orderBy,
      orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
      first: paging.pageSize + 1,
      skip: paging.offset,
    });

    const pagingUpdates = createPaging(res['members'], paging);

    return {
      networkId,
      filter,
      ordering,
      nextPaging: pagingUpdates.nextPaging,
      previousPaging: pagingUpdates.previousPaging,
      items: pagingUpdates.pageItems,
    };
  }

  public async listVotes({
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
  }: IListQueryArguments<Vote_OrderBy, Vote_Filter>): Promise<
    IListQueryResults<Vote_OrderBy, Vote_Filter, ListVotesQuery['votes']>
  > {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      throw new HausError({ type: 'INVALID_NETWORK_ERROR' });
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
  }

  public async listTransactions({
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
  }: IListQueryArguments<
    EventTransaction_OrderBy,
    EventTransaction_Filter
  >): Promise<
    IListQueryResults<
      EventTransaction_OrderBy,
      EventTransaction_Filter,
      ListTxsQuery['transactions']
    >
  > {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      throw new HausError({ type: 'INVALID_NETWORK_ERROR' });
    }

    const res = await graphFetchList<ListTxsQuery, ListTxsQueryVariables>(
      ListTxsDocument,
      url,
      {
        where: { ...filter, id_gt: paging.lastId || '' },
        orderBy: paging.lastId ? 'id' : ordering.orderBy,
        orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
        first: paging.pageSize + 1,
        skip: paging.offset,
      }
    );

    const pagingUpdates = createPaging(res['transactions'], paging);

    return {
      networkId,
      filter,
      ordering,
      nextPaging: pagingUpdates.nextPaging,
      previousPaging: pagingUpdates.previousPaging,
      items: pagingUpdates.pageItems,
    };
  }

  /*
  Find queries
*/
  public async findDao({
    networkId,
    dao,
    includeTokens = false,
  }: {
    networkId: keyof Keychain;
    dao: string;
    includeTokens?: boolean;
  }): Promise<
    IFindQueryResult<
      ITransformedDaoQuery | DaoWithTokenDataQuery | FindDaoQuery
    >
  > {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      const daoRes = await graphFetch<FindDaoQuery, FindDaoQueryVariables>(
        FindDaoDocument,
        url,
        networkId,
        {
          id: dao.toLowerCase(),
          now: nowInSeconds().toFixed(),
        }
      );

      const gnosisUrl = this.endpoints['GNOSIS_API'][networkId];

      if (includeTokens && daoRes?.data?.dao && gnosisUrl) {
        try {
          const tokenPromises: Promise<IFindQueryResult<DaoTokenBalances>>[] =
            [];

          daoRes.data.dao.vaults.forEach((vault) => {
            tokenPromises.push(
              this.listTokenBalances({
                networkId,
                safeAddress: vault.safeAddress,
              })
            );
          });

          const tokenData = await Promise.all(tokenPromises);

          const hydratedVaults = daoRes.data.dao.vaults.map((vault) => {
            const vaultResMatch = tokenData.find(
              (tokenRes) =>
                tokenRes.data?.safeAddress.toLowerCase() ===
                vault.safeAddress.toLowerCase()
            );

            return {
              ...vault,
              fiatTotal: vaultResMatch?.data?.fiatTotal,
              tokenBalances: vaultResMatch?.data?.tokenBalances,
            };
          });

          return {
            data: {
              dao: {
                ...daoRes.data.dao,
                ...addDaoProfileFields(daoRes.data.dao),
                vaults: hydratedVaults,
                fiatTotal: tokenData.reduce((sum, vault) => {
                  sum += Number(vault.data?.fiatTotal);
                  return sum;
                }, 0),
              },
            },
          };
        } catch (err) {
          console.error('gnosis api fetch error', err);
        }
      }
      if (daoRes.data?.dao) {
        return {
          data: {
            dao: {
              ...daoRes.data.dao,
              ...addDaoProfileFields(daoRes.data.dao),
            },
          },
        };
      } else {
        return daoRes;
      }
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
    }
  }

  public async findMember({
    networkId,
    dao,
    memberAddress,
  }: {
    networkId: keyof Keychain;
    dao: string;
    memberAddress: string;
  }): Promise<IFindQueryResult<FindMemberQuery>> {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      return await graphFetch<FindMemberQuery, FindMemberQueryVariables>(
        FindMemberDocument,
        url,
        networkId,
        {
          id: `${dao}-member-${memberAddress}`,
        }
      );
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
    }
  }

  public async findVote({
    networkId,
    voteId,
  }: {
    networkId: keyof Keychain;
    voteId: string;
  }): Promise<IFindQueryResult<FindVoteQuery>> {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      return await graphFetch<FindVoteQuery, FindVoteQueryVariables>(
        FindVoteDocument,
        url,
        networkId,
        {
          id: voteId,
        }
      );
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
    }
  }

  public async findProposal({
    networkId,
    dao,
    proposalId,
    connectedAddress,
  }: {
    networkId: keyof Keychain;
    dao: string;
    proposalId: string;
    connectedAddress?: string | null;
  }): Promise<IFindQueryResult<ITransformedProposalQuery>> {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
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
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
    }
  }

  public async findTransaction({
    networkId,
    txHash,
  }: {
    networkId: keyof Keychain;
    txHash: string;
  }): Promise<IFindQueryResult<FindTxQuery>> {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      return await graphFetch<FindTxQuery, FindTxQueryVariables>(
        FindTxDocument,
        url,
        networkId,
        {
          id: txHash,
        }
      );
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
    }
  }

  /**
   * Token queries
   */

  public async listTokenBalances({
    networkId,
    safeAddress,
  }: {
    networkId: keyof Keychain;
    safeAddress: string;
  }): Promise<IFindQueryResult<DaoTokenBalances>> {
    const url = this.endpoints['GNOSIS_API'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      const res = await fetch.get<TokenBalance[]>(
        `${url}/safes/${ethers.utils.getAddress(safeAddress)}/balances/usd/`
      );

      return { data: transformTokenBalances(res, safeAddress) };
    } catch (err) {
      return {
        error: new HausError({ type: 'GNOSIS_ERROR', errorObject: err }),
      };
    }
  }
}
