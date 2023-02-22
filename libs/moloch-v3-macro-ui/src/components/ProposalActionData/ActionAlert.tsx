import {
  getSensitiveProposalTypes,
  getActionToProposalTypeMapping,
} from '@daohaus/moloch-v3-data';
import { DecodedAction } from '@daohaus/tx-builder';

import { AlertContainer } from './ProposalActionData.styles';
import { ProposalActionConfig } from './ProposalActionData';
import { ProposalWarning } from './ProposalWarning';

export const ActionAlert = ({
  action,
  daoId,
  proposalType,
  proposalActionConfig,
}: {
  action: DecodedAction;
  daoId?: string;
  proposalType?: string;
  proposalActionConfig?: ProposalActionConfig;
}) => {
  const actionType = getActionToProposalTypeMapping(
    proposalActionConfig?.actionToProposalType
  )[action.name];
  // Show Action Warning IFF action.to === daoId || actionType != proposal.proposalType
  // e.g. calling sensitive dao methods through tx builder proposal
  if (
    proposalType &&
    (action.to === daoId || proposalType !== actionType) &&
    getSensitiveProposalTypes(proposalActionConfig?.sensitiveProposalTypes)[
      actionType
    ]
  ) {
    return (
      <AlertContainer>
        <ProposalWarning
          proposalType={proposalType}
          decodeError={false}
          txHash={''}
        />
      </AlertContainer>
    );
  }
  return null;
};
