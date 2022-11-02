import 'cross-fetch/polyfill';

import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { DocumentNode } from 'graphql';
import { Keychain } from '@daohaus/utils';
import { request } from 'graphql-request';

import { IFindQueryResult, QueryVariables } from '..';
import { HausError } from '../HausError';

type RequestDocument = string | DocumentNode;

export const graphFetch = async <T = unknown, V = QueryVariables>(
  document: RequestDocument | TypedDocumentNode<T, V>,
  url: string,
  networkId: keyof Keychain,
  variables?: V
): Promise<IFindQueryResult<T>> => {
  const res = await request<T, V>(url, document, cleanVariables(variables));
  return { data: res, networkId };
};

export const graphFetchList = async <T = unknown, V = QueryVariables>(
  document: RequestDocument | TypedDocumentNode<T, V>,
  url: string,
  variables?: V
): Promise<T> => {
  try {
    return await request<T, V>(url, document, cleanVariables(variables));
  } catch (err) {
    throw new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err });
  }
};

const cleanVariables = <V = QueryVariables>(variables: V): V => {
  return Object.fromEntries(
    Object.entries(variables as Record<string, unknown>)
      .filter(
        ([, value]) => value !== '' && value !== null && value !== undefined
      )
      .map(([key, value]) => [
        key,
        value === Object(value) && !Array.isArray(value)
          ? cleanVariables(value)
          : value,
      ])
  ) as unknown as V;
};
