import { useCurrentDao, useDaoProposal } from '@daohaus/moloch-v3-hooks';
import { ParLg, SingleColumnLayout } from '@daohaus/ui';
import { ProposalHistory } from '@daohaus/moloch-v3-macro-ui';

import { JSONDisplay } from '../components/JSONDisplay';

export const Proposal = () => {
  const { proposal } = useDaoProposal();
  const { daoChain, daoId } = useCurrentDao();

  return (
    <SingleColumnLayout>
      <ParLg>{proposal?.title}</ParLg>
      <JSONDisplay data={proposal} />

      {daoChain && daoId && proposal && (
        <div>
          <ProposalHistory
            proposalId={proposal.proposalId}
            daoChain={daoChain}
            daoId={daoId}
            includeLinks={true}
          />
        </div>
      )}
    </SingleColumnLayout>
  );
};
