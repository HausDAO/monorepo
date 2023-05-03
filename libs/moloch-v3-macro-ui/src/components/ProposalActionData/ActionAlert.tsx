import { DecodedAction } from '@daohaus/tx-builder';

import { AlertContainer } from './ProposalActionData.styles';
import { ProposalActionConfig } from './ProposalActionData';
import { ProposalWarning } from './ProposalWarning';

export const ActionAlert = ({
  action,
  daoId,
  proposalType,
  proposalActionConfig,
  daoChain,
}: {
  action: DecodedAction;
  daoId?: string;
  proposalType?: string;
  proposalActionConfig?: ProposalActionConfig;
  daoChain: string;
}) => {
  const actionType = proposalActionConfig?.actionToProposalType?.[action.name];
  // Show Action Warning IFF action.to === daoId || actionType != proposal.proposalType
  // e.g. calling sensitive dao methods through tx builder proposal
  if (
    actionType &&
    proposalType &&
    (action.to === daoId || proposalType !== actionType) &&
    proposalActionConfig?.sensitiveProposalTypes?.[actionType]
  ) {
    return (
      <AlertContainer>
        <ProposalWarning
          proposalActionConfig={proposalActionConfig}
          proposalType={actionType}
          txHash={''}
          daoChain={daoChain}
        />
      </AlertContainer>
    );
  }
  return null;
};
