import {
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';
import { findProposal } from '@daohaus/moloch-v3-data';
import { useQuery } from 'react-query';
import { useCurrentDao } from '../contexts';
import { DaoQueryKeys, daoScopedQueryId } from '../utils';

const fetchProposal = async ({
  daoId,
  daoChain,
  proposalId,
  graphApiKeys,
}: {
  daoId?: string;
  daoChain?: ValidNetwork;
  proposalId?: string;
  graphApiKeys?: Keychain;
}) => {
  if (!daoChain || !daoId || !proposalId) return;

  try {
    const res = await findProposal({
      dao: daoId,
      proposalId,
      networkId: daoChain,
      graphApiKeys,
    });

    return res?.data?.proposal;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching proposal');
  }
};

export const useDaoProposal = (props?: {
  daoChain: ValidNetwork;
  daoId: string;
  proposalId: string;
  graphApiKeys?: Keychain;
}) => {
  const {
    daoChain: daoChainOverride,
    daoId: daoIdOverride,
    proposalId: proposalIdOverride,
    graphApiKeys = GRAPH_API_KEYS,
  } = props || {};

  const {
    proposalId: propIdFromRouter,
    daoChain: networkFromRouter,
    daoId: daoIdFromRouter,
  } = useCurrentDao();

  const daoId = daoIdOverride || daoIdFromRouter;
  const daoChain = daoChainOverride || networkFromRouter;
  const proposalId = proposalIdOverride || propIdFromRouter;

  const { data, error, ...rest } = useQuery(
    [
      daoScopedQueryId({
        daoId,
        daoChain,
        domain: DaoQueryKeys.SingleProposal,
      }),
      {
        daoChain,
        daoId,
        proposalId,
      },
    ],
    () =>
      fetchProposal({
        daoId,
        daoChain,
        proposalId,
        graphApiKeys,
      }),
    {
      enabled: !!daoId && !!daoChain && !!proposalId,
    }
  );

  return { proposal: data, error, ...rest };
};
