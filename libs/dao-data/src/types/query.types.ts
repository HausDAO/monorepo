import { Keychain, TokenBalance } from '@daohaus/utils';
import { HausError } from '../HausError';
import { ListDaosQuery } from '../subgraph/queries/daos.generated';
import { ListProposalsQuery } from '../subgraph/queries/proposals.generated';
import { OrderDirection } from '../subgraph/schema.generated';

/**
 * Query related types
 */
export interface IListQueryArguments<TOrderBy extends string, Variables> {
  networkId: keyof Keychain;
  filter?: Variables;
  ordering?: Ordering<TOrderBy>;
  paging?: Paging;
}

export interface ICrossNetworkMemberListArguments<
  TOrderBy extends string,
  DaoVariables,
  MemberVariables
> {
  networkIds: Array<keyof Keychain>;
  memberAddress: string;
  daoFilter?: DaoVariables;
  memberFilter?: MemberVariables;
  ordering?: Ordering<TOrderBy>;
  includeTokens?: boolean;
}

export type QueryVariables = {
  [field: string]: string;
};

export type Ordering<TOrderBy extends string> = {
  orderBy: TOrderBy;
  orderDirection: OrderDirection;
};

export type Paging = {
  pageSize: number;
  offset?: number;
  lastId?: string;
  previousPageLastId?: string;
};

export interface IListQueryResults<
  TOrderBy extends string,
  Variables,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data = any
> {
  items: Data;
  error?: HausError;
  networkId?: keyof Keychain;
  filter?: Variables;
  ordering?: Ordering<TOrderBy>;
  nextPaging?: Paging;
  previousPaging?: Paging;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IFindQueryResult<Data = any> {
  data?: Data;
  error?: HausError;
  networkId?: keyof Keychain;
}

export type QueryProposal = ListProposalsQuery['proposals'][number];
export interface ITransformedProposal extends QueryProposal {
  status?: string;
}

// copied files start here  in @daohaus/dao-data
// moving this to common-utilities allows the UI to remove dao-data
// from its dependencies
export interface ITransformedProposalQuery {
  proposal: ITransformedProposal | undefined;
}
export interface ITransformedProposalListQuery {
  proposals: ITransformedProposal[];
}

export type DaoProfile = {
  description?: string;
  longDescription?: string;
  avatarImg?: string;
  tags?: string[];
  links?: string;
};

export type ITransformedDao = ListDaosQuery['daos'][number] & DaoProfile;

export interface ITransformedDaoQuery {
  dao: ITransformedDao | undefined;
}
export interface ITransformedDaoListQuery {
  daos: ITransformedDao[];
}
export type DaoWithTokenData = {
  fiatTotal: number;
  tokenBalances: TokenBalance[];
} & ITransformedDao;

export type DaoWithTokenDataQuery = {
  dao: DaoWithTokenData;
};
