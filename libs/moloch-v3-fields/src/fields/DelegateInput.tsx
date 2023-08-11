import {
  Buildable,
  WrappedInput,
  Field,
  ParMd,
  DataMd,
  ParSm,
  Tooltip,
} from '@daohaus/ui';
import { useConnectedMember, useDaoData } from '@daohaus/moloch-v3-hooks';
import { formatValueTo, fromWei, votingPowerPercentage } from '@daohaus/utils';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

const RemoveDelegate = styled(ParSm)`
  margin-top: 3rem;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.primary.step10};
  }
`;

export const DelegateInput = (props: Buildable<Field>) => {
  const { connectedMember } = useConnectedMember();
  const { dao } = useDaoData();
  const { setValue } = useFormContext();

  const hasCurrentDelegate =
    connectedMember?.delegatingTo !== connectedMember?.memberAddress;

  const handleRemoveDelegate = () => {
    setValue(props.id, connectedMember?.memberAddress);
  };

  const votingPowerMessage = `${formatValueTo({
    value: fromWei(connectedMember?.shares || '0'),
    decimals: 2,
    format: 'number',
  })} ${dao?.shareTokenName} (${votingPowerPercentage(
    dao?.totalShares || '0',
    connectedMember?.shares || '0'
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
