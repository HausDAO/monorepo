import React from 'react';

import {
  Buildable,
  WrappedInput,
  Field,
  ParMd,
  DataMd,
  ParSm,
  Theme,
  Tooltip,
} from '@daohaus/ui';
import { useConnectedMembership, useDao } from '@daohaus/dao-context';
import {
  formatValueTo,
  fromWei,
  votingPowerPercentage,
} from '@daohaus/common-utilities';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

const RemoveDelegate = styled(ParSm)`
  margin-top: 3rem;
  :hover {
    cursor: pointer;
    color: ${({ theme }: { theme: Theme }) => theme.primary.step10};
  }
`;

export const DelegateInput = (props: Buildable<Field>) => {
  const { connectedMembership } = useConnectedMembership();
  const { dao } = useDao();
  const { setValue } = useFormContext();

  const hasCurrentDelegate =
    connectedMembership?.delegatingTo !== connectedMembership?.memberAddress;

  const handleRemoveDelegate = () => {
    setValue(props.id, connectedMembership?.memberAddress);
  };

  const votingPowerMessage = `${formatValueTo({
    value: fromWei(connectedMembership?.shares || '0'),
    decimals: 2,
    format: 'number',
  })} ${dao?.shareTokenName} (${votingPowerPercentage(
    dao?.totalShares || '0',
    connectedMembership?.shares || '0'
  )}% voting power) `;

  return (
    <>
      <WrappedInput {...props} />
      <ParMd>Voting token to delegate</ParMd>
      <DataMd>{votingPowerMessage}</DataMd>
      {hasCurrentDelegate && (
        <RemoveDelegate onClick={handleRemoveDelegate}>
          Remove Existing Delegate
          <Tooltip content="Will reset the delegate address to your own. Then you can submit the transaction to update." />
        </RemoveDelegate>
      )}
    </>
  );
};
