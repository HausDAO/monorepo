import { useMemo } from 'react';
import { ExplorerLink } from '@daohaus/connect';
import { getProposalTypeWarningMapping, getSensitiveProposalTypes, PROPOSAL_TYPE_WARNINGS } from '@daohaus/moloch-v3-data';
import { Icon } from '@daohaus/ui';

import { IconContainer, MessageContainer, Spacer, StyledParXs, WarningContainer, WarningIcon } from './ProposalActionData.styles';
import { ProposalActionConfig } from './ProposalActionData';

type ProposalWarningProps = {
  proposalType: string | undefined;
  decodeError: boolean;
  txHash: string;
  proposalActionConfig?: ProposalActionConfig;
};

export const ProposalWarning = ({
  proposalType,
  decodeError,
  txHash,
  proposalActionConfig,
}: ProposalWarningProps) => {
  const warningMessage: string = useMemo(() => {
    if (decodeError) {
      return PROPOSAL_TYPE_WARNINGS.ERROR_CANNOT_DECODE;
    } else {
      return (
        (proposalType && getProposalTypeWarningMapping(proposalActionConfig?.proposalTypeWarning)[proposalType]) ||
        PROPOSAL_TYPE_WARNINGS.ERROR_UNKOWN
      );
    }
  }, [proposalType, decodeError]);

  const hasWarning =
    decodeError ||
    (proposalType && getSensitiveProposalTypes(proposalActionConfig?.sensitiveProposalTypes)[proposalType]) ||
    warningMessage === PROPOSAL_TYPE_WARNINGS.ERROR_UNKOWN;

  // TODO: activate this feature when errors use cases arise
  const hasError = false;

  return (
    <WarningContainer
      className="container"
      error={hasError}
      warning={hasWarning}
    >
      {hasWarning && (
        <IconContainer>
          <Icon label="Warning">
            <WarningIcon />
          </Icon>
        </IconContainer>
      )}
      <MessageContainer>
        <StyledParXs error={hasError} warning={hasWarning}>
          {warningMessage}
        </StyledParXs>
        {decodeError ||
          (hasError && (
            <>
              <Spacer />
              <ExplorerLink address={txHash} type="tx">
                View Details
              </ExplorerLink>
            </>
          ))}
      </MessageContainer>
    </WarningContainer>
  );
};
