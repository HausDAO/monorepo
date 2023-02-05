import { Ordering, Paging } from '@daohaus/data-fetch-utils';
import {
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';
import {
  listProposals,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/moloch-v3-data';
import { EthAddress } from '@daohaus/utils';
import React from 'react';
import { useQuery } from 'react-query';
import { DaoQueryKeys, daoScopedQueryId, useCurrentDao } from '../rage';

const fetchProposals = async ({
  daoId,
  daoChain,
  graphApiKeys,
  filter,
  ordering,
  paging,
}: {
  daoId?: string;
  daoChain?: ValidNetwork;
  graphApiKeys: Keychain;
  filter: Proposal_Filter;
  ordering: Ordering<Proposal_OrderBy>;
  paging: Paging;
}) => {
  if (!daoChain || !daoId) return;

  const res = await listProposals({
    filter,
    networkId: daoChain,
    ordering,
    paging,
    graphApiKeys,
  });

  console.log('res', res);
};

type DaoProposalsProps =
  | {
      daoId?: string;
      daoChain?: ValidNetwork;
      graphApiKeys?: Keychain;
      filter?: Proposal_Filter;
      ordering?: Ordering<Proposal_OrderBy>;
      paging: Paging;
    }
  | undefined;

export const useDaoProposals = (props?: DaoProposalsProps) => {
  const {
    daoId: daoIdOverride,
    daoChain: daoChainOverride,
    graphApiKeys = GRAPH_API_KEYS,
    filter,
    ordering = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    },
    paging = {
      pageSize: 5,
      offset: 0,
    },
  } = props || {};

  const { daoId: idFromRouter, daoChain: networkFromRouter } =
    useCurrentDao?.() || {};
  const daoId = daoIdOverride || idFromRouter;
  const daoChain = daoChainOverride || networkFromRouter;
  const { data, error, ...rest } = useQuery(
    [
      daoScopedQueryId({
        daoChain,
        daoId,
        domain: DaoQueryKeys.Dao,
      }),
      { daoId, daoChain, filter, ordering, paging },
    ],
    () =>
      fetchProposals({
        daoId,
        daoChain,
        graphApiKeys,
        filter: filter || { dao: daoId },
        ordering,
        paging,
      }),
    {
      enabled: !!daoId && !!daoChain && !!filter && !!paging,
    }
  );
  return {
    data,
    error,
    ...rest,
  };
};
