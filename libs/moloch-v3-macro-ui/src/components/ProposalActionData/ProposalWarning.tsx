import { useMemo } from 'react';
import { ExplorerLink } from '@daohaus/connect';
import { Icon } from '@daohaus/ui';
import { PROPOSAL_TYPE_WARNINGS } from '@daohaus/utils';

import {
  IconContainer,
  MessageContainer,
  Spacer,
  StyledParXs,
  WarningContainer,
  WarningIcon,
} from './ProposalActionData.styles';
import { ProposalActionConfig } from './ProposalActionData';
import { ValidNetwork } from '@daohaus/keychain-utils';

type ProposalWarningProps = {
  proposalType?: string;
  decodeError?: boolean;
  txHash: string;
  proposalActionConfig?: ProposalActionConfig;
  daoChain: string;
};

export const ProposalWarning = ({
  proposalType,
  decodeError = false,
  txHash,
  proposalActionConfig,
  daoChain,
}: ProposalWarningProps) => {
  const warningMessage: string | undefined = useMemo(() => {
    if (decodeError) {
      return PROPOSAL_TYPE_WARNINGS.ERROR_CANNOT_DECODE;
    } else {
      return (
        proposalType &&
        proposalActionConfig?.proposalTypeWarning?.[proposalType]
      );
    }
    return;
  }, [proposalType, decodeError, proposalActionConfig]);

  const hasWarning =
    decodeError ||
    (proposalType &&
      proposalActionConfig?.sensitiveProposalTypes?.[proposalType]) ||
    warningMessage === PROPOSAL_TYPE_WARNINGS.ERROR_UNKOWN;

  // TODO: activate this feature when errors use cases arise
  const hasError = false;

  if (!hasWarning) return null;

  return (
    <WarningContainer
      className="container"
      $error={hasError}
      $warning={hasWarning}
    >
      <IconContainer>
        <Icon label="Warning">
          <WarningIcon />
        </Icon>
      </IconContainer>
      <MessageContainer>
        <StyledParXs $error={hasError} $warning={hasWarning}>
          {warningMessage}
        </StyledParXs>
        {decodeError ||
          (hasError && (
            <>
              <Spacer />
              <ExplorerLink
                address={txHash}
                type="tx"
                chainId={daoChain as ValidNetwork}
              >
                View Details
              </ExplorerLink>
            </>
          ))}
      </MessageContainer>
    </WarningContainer>
  );
};
