import { ExplorerLink } from '@daohaus/connect';
import { border, Button, ParSm, Spinner, Theme } from '@daohaus/ui';

import React from 'react';
import { RiCheckLine, RiErrorWarningLine } from 'react-icons/ri';
import styled, { useTheme } from 'styled-components';
import { StatusMsg } from './FormBuilder';

const FooterBox = styled.div`
  a {
    margin-bottom: 1.6rem;
  }
`;

export const FormFooter = ({
  submitDisabled,
  submitButtonText,
  status,
  txHash,
}: {
  submitDisabled?: boolean;
  submitButtonText?: string;
  status: StatusMsg | null;
  txHash: string | null;
}) => {
  /*Form Alert Component goes here*/
  return (
    <FooterBox>
      {txHash && (
        <ExplorerLink type="tx" address={txHash}>
          See Transaction Here
        </ExplorerLink>
      )}
      {status && <FormStatusDisplay status={status} />}
      <Button fullWidth type="submit" disabled={submitDisabled}>
        {submitButtonText || 'Submit'}
      </Button>
    </FooterBox>
  );
};

const getStatusColor = (status: StatusMsg, theme: Theme) => {
  if (status === StatusMsg.PollSuccess) {
    return theme.success.step9;
  }
  if (status === StatusMsg.PollError || status === StatusMsg.TxErr) {
    return theme.danger.step9;
  } else {
    return theme.secondary.step9;
  }
};
const getStatusElement = (status: StatusMsg, theme: Theme) => {
  if (status === StatusMsg.PollSuccess) {
    return <RiCheckLine color={theme.success.step9} size="2.25rem" />;
  }
  if (status === StatusMsg.PollError || status === StatusMsg.TxErr) {
    return <RiErrorWarningLine color={theme.danger.step9} size="2.25rem" />;
  } else return <Spinner size="2.25rem" strokeWidth=".25rem" />;
};

const StatusBox = styled.div`
  border-radius: ${border.radius};
  border: 1px
    ${({ theme, status }: { theme: Theme; status: StatusMsg }) =>
      getStatusColor(status, theme)}
    solid;
  padding: 1.5rem;
  margin-bottom: 2rem;
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      color: ${({ theme, status }: { theme: Theme; status: StatusMsg }) =>
        getStatusColor(status, theme)};
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
        {getStatusElement(status, theme)}
      </div>
    </StatusBox>
  );
};
