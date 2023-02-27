import { useCurrentDao } from '@daohaus/moloch-v3-hooks';
import { ProposalList } from '@daohaus/moloch-v3-macro-ui';
import { ButtonRouterLink } from '../components/ButtonRouterLink';

export const Proposals = () => {
  const { daoId, daoChain } = useCurrentDao();

  return (
    <ProposalList
      header="Proposals"
      allowLinks={true}
      rightActionEl={
        <ButtonRouterLink to={`/molochv3/${daoChain}/${daoId}/formtest`}>
          New Proposal
        </ButtonRouterLink>
      }
    />
  );
};
