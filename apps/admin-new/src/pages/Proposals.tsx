import { useCurrentDao } from '@daohaus/moloch-v3-hooks';
import { ProposalList } from '@daohaus/moloch-v3-macro-ui';
import { Button } from '@daohaus/ui';
import { ButtonRouterLink } from '../components/ButtonRouterLink';

export const Proposals = () => {
  const { daoId, daoChain } = useCurrentDao();

  return (
    <ProposalList
      header="Proposals"
      rightActionEl={
        <ButtonRouterLink to={`/molochv3/${daoChain}/${daoId}/formtest`}>
          New Proposal
        </ButtonRouterLink>
      }
    />
  );
};
