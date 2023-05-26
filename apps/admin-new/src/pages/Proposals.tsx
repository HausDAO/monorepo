import { useCurrentDao } from '@daohaus/moloch-v3-hooks';
import { ProposalList } from '@daohaus/moloch-v3-macro-ui';
import { ButtonRouterLink } from '../components/ButtonRouterLink';

export const CUSTOM_APP_PROPOSAL_TYPE_LABELS: Record<string, string> = {
  INIT_VOTE: 'Initiate Vote',
};

export const Proposals = () => {
  const { daoId, daoChain } = useCurrentDao();

  return (
    <ProposalList
      header="Proposals"
      allowLinks={true}
      customProposalTypeLabels={CUSTOM_APP_PROPOSAL_TYPE_LABELS}
      rightActionEl={
        <ButtonRouterLink to={`/molochv3/${daoChain}/${daoId}/formtest`}>
          New Proposal
        </ButtonRouterLink>
      }
    />
  );
};
