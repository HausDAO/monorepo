import { ReactNode, useState } from 'react';
import { isValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import {
  ActionError,
  DeepDecodedMultiTX as DecodedMultiTX,
  DeepDecodedAction,
  isActionError,
} from '@daohaus/tx-builder';
import {
  AddressDisplay,
  Bold,
  DataSm,
  Divider,
  H4,
  ParMd,
  Loading,
  useBreakpoint,
  widthQuery,
  ParLg,
} from '@daohaus/ui';
import {
  DAO_METHOD_TO_PROPOSAL_TYPE,
  MulticallAction,
  PROPOSAL_TYPE_WARNINGS,
  SENSITIVE_PROPOSAL_TYPES,
} from '@daohaus/utils';

import { ActionAlert } from './ActionAlert';
import {
  DisplayContainer,
  LoadingContainer,
  MainContainer,
  StyledDownArrow,
  StyledUpArrow,
  TitleContainer,
} from './ProposalActionData.styles';
import { ProposalWarning } from './ProposalWarning';
import { ValueDisplay } from './ValueDisplay';

export type ProposalActionConfig = {
  sensitiveProposalTypes?: Record<string, boolean>;
  actionToProposalType?: Record<string, string>;
  proposalTypeWarning?: Record<string, string>;
};

type ProposalActionDataProps = {
  daoChain: string;
  daoId: string;
  proposal: MolochV3Proposal;
  proposalActionConfig?: ProposalActionConfig;
  actionData?: DecodedMultiTX | null;
  actionsMeta?: MulticallAction[];
  decodeError: boolean;
};

export const ProposalActionData = ({
  daoChain,
  daoId,
  proposal,
  proposalActionConfig = {
    sensitiveProposalTypes: SENSITIVE_PROPOSAL_TYPES,
    actionToProposalType: DAO_METHOD_TO_PROPOSAL_TYPE,
    proposalTypeWarning: PROPOSAL_TYPE_WARNINGS,
  },
  actionData,
  decodeError = false,
}: ProposalActionDataProps) => {
  return (
    <MainContainer>
      <DisplayContainer>
        <TitleContainer>
          <ParMd>
            <Bold>All Actions</Bold>
          </ParMd>

          {!actionData && (
            <LoadingContainer>
              <Loading size={20} />
            </LoadingContainer>
          )}
        </TitleContainer>
        {actionData?.map((action, index) => {
          return (
            <div key={index}>
              <ActionSection
                index={index}
                action={action}
                daoId={daoId}
                daoChain={daoChain}
                proposal={proposal}
                proposalActionConfig={proposalActionConfig}
                actionHeader={`${index + 1}.`}
              />

              <SubActions
                daoChain={daoChain}
                daoId={daoId}
                proposal={proposal}
                proposalActionConfig={proposalActionConfig}
                action={action}
                index={index}
                actionHeader={`-`}
              />
            </div>
          );
        })}
      </DisplayContainer>
      {decodeError && (
        <ProposalWarning
          proposalType={proposal.proposalType}
          decodeError={decodeError}
          txHash={proposal.txHash}
          proposalActionConfig={proposalActionConfig}
          daoChain={daoChain}
        />
      )}
    </MainContainer>
  );
};

const SubActions = ({
  action,
  index,
  actionHeader,
  daoChain,
  daoId,
  proposal,
  proposalActionConfig,
}: {
  action: DeepDecodedAction | ActionError;
  index: number;
  actionHeader: string;
  daoChain: string;
  daoId: string;
  proposal: MolochV3Proposal;
  proposalActionConfig?: ProposalActionConfig;
}) => {
  if (
    isActionError(action) ||
    !action.decodedActions ||
    action.decodedActions.length === 0
  ) {
    return null;
  }

  return (
    <>
      {action.decodedActions.map((subAction, i) => (
        <div key={i}>
          <ActionSection
            daoChain={daoChain}
            daoId={daoId}
            proposal={proposal}
            proposalActionConfig={proposalActionConfig}
            action={subAction}
            index={index}
            actionHeader={`-`}
          />

          <SubActions
            daoChain={daoChain}
            daoId={daoId}
            proposal={proposal}
            proposalActionConfig={proposalActionConfig}
            action={subAction}
            index={index}
            actionHeader={actionHeader}
          />
        </div>
      ))}
    </>
  );
};

const ActionToggle = ({
  action,
  actionHeader,
  children,
}: {
  action: DeepDecodedAction | ActionError;
  actionHeader: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <>
      <TitleContainer>
        <ParLg className="space">
          {actionHeader} {'name' in action ? action.name : 'Decoding Error'}
        </ParLg>
        {open && (
          <div onClick={handleToggle}>
            <StyledUpArrow />
          </div>
        )}
        {!open && (
          <div onClick={handleToggle}>
            <StyledDownArrow />
          </div>
        )}
      </TitleContainer>
      {open && <div className="data">{children}</div>}
    </>
  );
};

const ActionSectionError = ({
  action,
  index,
}: {
  action: ActionError;
  index: number;
}) => {
  return (
    <div className="display-segment data" key={`${action.message}-${index}`}>
      <H4 className="space">Action {index + 1}: Error</H4>
      <DataSm className="space">{action.message}</DataSm>
      <Divider className="space" />
      <DataSm className="space">
        <Bold>HEX DATA:</Bold>
      </DataSm>
      <DataSm className="space">{action.data}</DataSm>
    </div>
  );
};

const ActionSection = ({
  action,
  index,
  actionHeader,
  daoChain,
  daoId,
  proposal,
  proposalActionConfig,
}: {
  action: DeepDecodedAction | ActionError;
  index: number;
  actionHeader: string;
  daoChain: string;
  daoId: string;
  proposal: MolochV3Proposal;
  proposalActionConfig?: ProposalActionConfig;
}) => {
  const network = isValidNetwork(daoChain) ? daoChain : undefined;
  const isMobile = useBreakpoint(widthQuery.sm);

  if (isActionError(action)) {
    return <ActionSectionError index={index} action={action} />;
  }

  return (
    <div className="display-segment" key={`action_${index}`}>
      <ActionToggle actionHeader={actionHeader} action={action}>
        <>
          <ActionAlert
            action={action}
            daoId={daoId}
            daoChain={daoChain}
            proposalType={proposal.proposalType}
            proposalActionConfig={proposalActionConfig}
          />
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
        </>
      </ActionToggle>
    </div>
  );
};
