import { ArgType, isEthAddress, isNumberish } from '@daohaus/utils';

import { isValidNetwork, ValidNetwork } from '@daohaus/keychain-utils';
import {
  DecodedAction,
  DecodedMultiTX,
  isActionError,
} from '@daohaus/tx-builder';
import {
  AddressDisplay,
  Bold,
  DataSm,
  Divider,
  H4,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ProposalWarning } from './ProposalWarning';
import {
  DAO_METHOD_TO_PROPOSAL_TYPE,
  SENSITIVE_PROPOSAL_TYPES,
} from '../utils/constants';

const DisplayContainer = styled.div`
  margin-top: 2rem;

  .display-segment {
    display: flex;
    flex-direction: column;
  }

  .data {
    word-break: break-all;
    margin-bottom: 2rem;
    .space,
    .address-display {
      margin-bottom: 2rem;
    }
  }
  .value-box {
    display: flex;
  }
`;

const WarningContainer = styled.div`
  margin-bottom: 2rem;
`;

export const ActionDisplay = ({
  actions,
  proposalType,
}: {
  actions: DecodedMultiTX;
  proposalType?: string;
}) => {
  const { daochain, daoid } = useParams();
  const network = isValidNetwork(daochain) ? daochain : undefined;
  const isMobile = useBreakpoint(widthQuery.sm);

  const ActionAlert = ({ action }: { action: DecodedAction }) => {
    const actionType = DAO_METHOD_TO_PROPOSAL_TYPE[action.name];
    // Show Action Warning IFF actionType != proposal.proposalType
    // e.g. calling sensitive dao methods through tx builder proposal
    if (
      proposalType &&
      action.to === daoid &&
      proposalType !== actionType &&
      SENSITIVE_PROPOSAL_TYPES[actionType]
    ) {
      return (
        <WarningContainer>
          <ProposalWarning
            proposalType={proposalType}
            decodeError={false}
            txHash={''}
          />
        </WarningContainer>
      );
    }
    return null;
  };

  return (
    <DisplayContainer>
      {actions.map((action, index) => {
        if (isActionError(action)) {
          return (
            <div
              className="display-segment data"
              key={`${action.message}-${index}`}
            >
              <H4 className="space">Action {index + 1}: Error</H4>
              <DataSm className="space">{action.message}</DataSm>
              <Divider className="space" />
              <DataSm className="space">
                <Bold>HEX DATA:</Bold>
              </DataSm>
              <DataSm className="space">{action.data}</DataSm>
            </div>
          );
        }
        return (
          <div className="display-segment" key={`action_${index}`}>
            <div className="data">
              <H4 className="space">
                Action {index + 1}: {action.name}
              </H4>
              <ActionAlert action={action} />
              <DataSm className="space">
                <Bold>TARGET</Bold>
              </DataSm>
              <AddressDisplay
                className="space"
                address={action.to}
                copy
                explorerNetworkId={network}
                truncate={isMobile}
              />
              <DataSm className="space">
                <Bold>VALUE</Bold>
              </DataSm>
              <DataSm className="space">{action.value}</DataSm>
              <Divider className="spaced-divider" />
            </div>
            {action.params?.map((arg, index) => {
              return (
                <div className="data" key={`${arg.name}-${index}`}>
                  <DataSm className="space">
                    <Bold>
                      PARAM
                      {index + 1}:{' '}
                    </Bold>
                    {arg.name}
                  </DataSm>
                  <DataSm className="space">
                    <Bold>TYPE: </Bold>
                    {arg.type}
                  </DataSm>

                  <DataSm className="space">
                    <Bold>VALUE: </Bold>
                  </DataSm>
                  <ValueDisplay
                    argValue={arg.value}
                    argType={arg.type}
                    network={network}
                    isMobile={isMobile}
                  />
                  <Divider />
                </div>
              );
            })}
          </div>
        );
      })}
    </DisplayContainer>
  );
};

const ValueDisplay = ({
  argValue,
  argType,
  network,
  isMobile,
}: {
  argValue: ArgType;
  argType?: string;
  network?: ValidNetwork;
  isMobile?: boolean;
}) => {
  if (Array.isArray(argValue)) {
    const displayValue =
      argType === 'tuple'
        ? Object.entries(Object.assign({}, argValue)).filter(
            (entry) => !isNumberish(entry[0])
          )
        : argValue;
    return (
      <>
        {displayValue.map((value, index) => {
          return (
            <div className="space" key={`argValue${index}`}>
              <ValueDisplay
                argValue={
                  Array.isArray(value) ? `${value[0]}: ${value[1]}` : value
                }
                argType={argType}
                network={network}
              />
              {index + 1 < argValue?.length && <Divider />}
            </div>
          );
        })}
      </>
    );
  }
  if (isEthAddress(argValue)) {
    return (
      <AddressDisplay
        address={argValue}
        copy
        explorerNetworkId={network}
        className="space"
        truncate={isMobile}
      />
    );
  }
  if (typeof argValue === 'boolean') {
    return <DataSm className="space">{`${argValue}`}</DataSm>;
  }
  if (typeof argValue === 'string' || typeof argValue === 'number') {
    return <DataSm className="space">{argValue}</DataSm>;
  }

  return <DataSm className="space">{argValue.toString()}</DataSm>;
};
