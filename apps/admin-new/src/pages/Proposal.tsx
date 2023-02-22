import { useEffect, useState } from 'react';
import { useCurrentDao, useDaoProposal } from '@daohaus/moloch-v3-hooks';
import {
  ProposalActionData,
  ProposalHistory,
} from '@daohaus/moloch-v3-macro-ui';
import { ParLg, SingleColumnLayout } from '@daohaus/ui';
import { MulticallArg, TXLego, ValidArgType } from '@daohaus/utils';

import { JSONDisplay } from '../components/JSONDisplay';

// TODO: Import TxLegos
const TX: Record<string, TXLego> = {};

export const Proposal = () => {
  const { proposal } = useDaoProposal();
  const { daoChain, daoId } = useCurrentDao();
  const [proposalMeta, setProposalMeta] = useState<ValidArgType>();

  useEffect(() => {
    if (proposal?.proposalType) {
      setProposalMeta(
        TX[proposal.proposalType]?.args?.find(
          (tx) => (tx as MulticallArg).type === 'multicall'
        )
      );
    }
  }, [proposal?.proposalType]);

  return (
    <SingleColumnLayout>
      <ParLg>{proposal?.title}</ParLg>
      <JSONDisplay data={proposal} />

      {daoChain && daoId && proposal && (
        <ProposalActionData
          daoChain={daoChain}
          daoId={daoId}
          actionsMeta={proposalMeta && (proposalMeta as MulticallArg).actions}
          proposal={proposal}
        />
      )}

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
