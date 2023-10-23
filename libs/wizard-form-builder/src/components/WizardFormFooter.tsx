import { Dispatch, SetStateAction } from 'react';
import styled, { useTheme } from 'styled-components';
import { RiCheckLine, RiErrorWarningLine } from 'react-icons/ri/index.js';

import { ExplorerLink } from '@daohaus/connect';
import { useFormBuilder } from '@daohaus/form-builder-base';
import { Button, ParSm, Loading, Theme } from '@daohaus/ui';

enum StatusMsg {
  Compile = 'Compiling Transaction Data',
  Request = 'Requesting Signature',
  Await = 'Transaction Submitted',
  TxErr = 'Transaction Error',
  TxSuccess = 'Transaction Success',
  PollStart = 'Syncing TX (Subgraph)',
  PollSuccess = 'Success: TX Confirmed!',
  PollError = 'Sync Error (Subgraph)',
  NoContext = 'Missing TXBuilder Context',
}

const FooterBox = styled.div`
  a {
    margin-bottom: 1.6rem;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 2rem;
`;

export const WizardFormFooter = ({
  status,
  txHash,
  setCurrentStepIndex,
  currentStepIndex,
  stepCount,
}: {
  submitDisabled?: boolean;
  status: StatusMsg | null;
  txHash: string | null;
  setCurrentStepIndex: Dispatch<SetStateAction<number>>;
  currentStepIndex: number;
  stepCount: number;
}) => {
  /*Form Alert Component goes here*/
  const { submitDisabled } = useFormBuilder() || {};

  return (
    <FooterBox>
      {txHash && (
        <ExplorerLink type="tx" address={txHash}>
          See Transaction Here
        </ExplorerLink>
      )}
      {status && <FormStatusDisplay status={status} />}

      <ButtonRow>
        {currentStepIndex > 0 && (
          <Button
            onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
            color="secondary"
          >
            Previous
          </Button>
        )}

        {currentStepIndex < stepCount - 1 && (
          <Button
            onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
            disabled={submitDisabled}
            color="primary"
          >
            Next
          </Button>
        )}

        {currentStepIndex === stepCount - 1 && (
          <Button type="submit" disabled={submitDisabled} color="primary">
            Next
          </Button>
        )}
      </ButtonRow>
    </FooterBox>
  );
};

const getStatusColor = (status: StatusMsg, theme: Theme) => {
  if (status === StatusMsg.PollSuccess) {
    return theme.success.step9;
  }
  if (
    status === StatusMsg.PollError ||
    status === StatusMsg.TxErr ||
    status === StatusMsg.NoContext
  ) {
    return theme.danger.step9;
  } else {
    return theme.secondary.step9;
  }
};
const getStatusElement = (status: StatusMsg, theme: Theme) => {
  if (status === StatusMsg.PollSuccess) {
    return <RiCheckLine color={theme.success.step9} size="2.25rem" />;
  }
  if (
    status === StatusMsg.PollError ||
    status === StatusMsg.TxErr ||
    status === StatusMsg.NoContext
  ) {
    return <RiErrorWarningLine color={theme.danger.step9} size="2.25rem" />;
  } else return <Loading size={2.25} />;
};

const StatusBox = styled.div<{ status: StatusMsg }>`
  border-radius: ${({ theme }) => theme['card'].radius};
  border: 1px ${({ theme, status }) => getStatusColor(status, theme as Theme)}
    solid;
  padding: 1.5rem;
  margin-bottom: 2rem;
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      color: ${({ theme, status }) => getStatusColor(status, theme as Theme)};
      margin-right: auto;
    }
  }
`;

const FormStatusDisplay = ({ status }: { status: StatusMsg }) => {
  const theme = useTheme();
  return (
    <StatusBox status={status}>
      <div className="inner">
        <ParSm>{status}</ParSm>
        {getStatusElement(status, theme as Theme)}
      </div>
    </StatusBox>
  );
};
