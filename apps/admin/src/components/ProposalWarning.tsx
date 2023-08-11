import { useMemo } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri/index.js';
import styled from 'styled-components';
import { ExplorerLink } from '@daohaus/connect';
import { Card, Icon, ParXs } from '@daohaus/ui';

import {
  PROPOSAL_TYPE_WARNINGS,
  SENSITIVE_PROPOSAL_TYPES,
} from '../utils/constants';
import { useParams } from 'react-router-dom';
import { ValidNetwork } from '@daohaus/keychain-utils';

const WarningContainer = styled(Card)<{ error: boolean; warning: boolean }>`
  display: flex;
  width: 100%;
  background-color: ${({ theme, error, warning }) =>
    (error && theme.danger.step3) || (warning && theme.warning.step3)};
  border-color: ${({ theme, error, warning }) =>
    (error && theme.danger.step7) || (warning && theme.warning.step7)};
`;

const StyledParXs = styled(ParXs)<{ error: boolean; warning: boolean }>`
  color: ${({ theme, error, warning }) =>
    (error && theme.danger.step12) || (warning && theme.warning.step12)};
`;

const Spacer = styled.div`
  margin-top: 2rem;
`;

const WarningIcon = styled(RiErrorWarningLine)`
  color: ${({ theme }) => theme.warning.step9};
  height: 2.5rem;
  width: 2.5rem;
`;

const IconContainer = styled.div`
  margin-right: 1rem;
`;

const MessageContainer = styled.div``;

type ProposalWarningProps = {
  proposalType: string | undefined;
  decodeError: boolean;
  txHash: string;
};

export const ProposalWarning = ({
  proposalType,
  decodeError,
  txHash,
}: ProposalWarningProps) => {
  const { daochain } = useParams();
  const warningMessage: string = useMemo(() => {
    if (decodeError) {
      return PROPOSAL_TYPE_WARNINGS.ERROR_CANNOT_DECODE;
    } else {
      return (
        (proposalType && PROPOSAL_TYPE_WARNINGS[proposalType]) ||
        PROPOSAL_TYPE_WARNINGS.ERROR_UNKOWN
      );
    }
  }, [proposalType, decodeError]);

  const hasWarning =
    decodeError ||
    (proposalType && SENSITIVE_PROPOSAL_TYPES[proposalType]) ||
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
              <ExplorerLink
                address={txHash}
                type="tx"
                chainId={daochain as ValidNetwork}
              >
                View Details
              </ExplorerLink>
            </>
          ))}
      </MessageContainer>
    </WarningContainer>
  );
};
