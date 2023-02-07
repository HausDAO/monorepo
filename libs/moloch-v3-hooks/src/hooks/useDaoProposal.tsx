import { ValidNetwork } from '@daohaus/keychain-utils';
import { useQuery } from 'react-query';
import { useCurrentDao } from '../rage';
import { DaoQueryKeys, daoScopedQueryId } from '../utils';

export const useDaoProposal = ({
  daoChain: daoChainOverride,
  daoId: daoIdOverride,
  proposalId: proposalIdOverride,
}: {
  daoChain: ValidNetwork;
  daoId: string;
  proposalId: string;
}) => {
  const {
    proposalId: propIdFromRouter,
    daoChain: networkFromRouter,
    daoId: daoIdFromRouter,
  } = useCurrentDao();
  const {} = useQuery([
    daoScopedQueryId({
      daoId,
      daoChain,
      domain: DaoQueryKeys.SingleProposal,
    }),
    { daoChain, daoId, proposalId },
  ]);
};
