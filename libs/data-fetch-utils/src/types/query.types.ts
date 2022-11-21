import { Keychain } from '@daohaus/keychain-utils';

export type FetchError = {
  type: string;
  message: string;
  errorObject?: unknown;
};

export interface IListQueryArguments<TOrderBy extends string, Variables> {
  networkId: keyof Keychain;
  filter?: Variables;
  ordering?: Ordering<TOrderBy>;
  paging?: Paging;
}

export type QueryVariables = {
  [field: string]: string;
};

export type OrderDirection = 'asc' | 'desc';

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
  error?: FetchError;
  networkId?: keyof Keychain;
  filter?: Variables;
  ordering?: Ordering<TOrderBy>;
  nextPaging?: Paging;
  previousPaging?: Paging;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IFindQueryResult<Data = any> {
  data?: Data;
  error?: FetchError;
  networkId?: keyof Keychain;
}
