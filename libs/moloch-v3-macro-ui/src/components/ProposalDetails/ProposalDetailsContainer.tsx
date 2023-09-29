import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { useEffect, useState } from 'react';

import { ProposalDetails } from './ProposalDetails';
import {
  ProposalActionConfig,
  ProposalActionData,
} from '../ProposalActionData';
import { TX } from '@daohaus/moloch-v3-legos';
import {
  DAO_METHOD_TO_PROPOSAL_TYPE,
  MulticallAction,
  MulticallArg,
  PROPOSAL_TYPE_WARNINGS,
  SENSITIVE_PROPOSAL_TYPES,
  TXLego,
} from '@daohaus/utils';
import {
  DeepDecodedMultiTX as DecodedMultiTX,
  deepDecodeProposalActions as decodeProposalActions,
  isActionError,
} from '@daohaus/tx-builder';
import { ValidNetwork, isValidNetwork } from '@daohaus/keychain-utils';

type ProposalDetailsContainerProps = {
  daoChain: string;
  daoId: string;
  proposal: MolochV3Proposal;
  includeLinks: boolean;
  proposalActionConfig?: ProposalActionConfig;
  txLegos?: Record<string, TXLego>;
};

export const ProposalDetailsContainer = ({
  daoChain,
  daoId,
  proposal,
  includeLinks = false,
  proposalActionConfig = {
    sensitiveProposalTypes: SENSITIVE_PROPOSAL_TYPES,
    actionToProposalType: DAO_METHOD_TO_PROPOSAL_TYPE,
    proposalTypeWarning: PROPOSAL_TYPE_WARNINGS,
  },
  txLegos = TX,
}: ProposalDetailsContainerProps) => {
  const [decodeError, setDecodeError] = useState<boolean>(false);
  const [actionData, setActionData] = useState<DecodedMultiTX | null>();
  const [actionsMeta, setActionsMeta] = useState<MulticallAction[]>();

  useEffect(() => {
    if (proposal?.proposalType) {
      const txLego = txLegos[proposal.proposalType]?.args?.find(
        (tx) => (tx as MulticallArg).type === 'multicall'
      );
      setActionsMeta(txLego && (txLego as MulticallArg).actions);
    }
  }, [proposal?.proposalType, txLegos]);

  useEffect(() => {
    let shouldUpdate = true;
    const fetchPropActions = async (
      chainId: ValidNetwork,
      actionData: string,
      _actionMeta?: MulticallAction[]
    ) => {
      const proposalActions = await decodeProposalActions({
        chainId,
        actionData,
      });
      if (shouldUpdate) {
        setActionData(proposalActions);
        setDecodeError(
          proposalActions.length === 0 ||
            proposalActions.some((action) => isActionError(action))
        );
      }
    };

    if (!isValidNetwork(daoChain) || !proposal) return;
    fetchPropActions(daoChain, proposal.proposalData, actionsMeta);

    return () => {
      shouldUpdate = false;
    };
  }, [daoChain, proposal, actionsMeta]);
  return (
    <>
      <ProposalDetails
        daoChain={daoChain}
        daoId={daoId}
        proposal={proposal}
        actionData={actionData}
        decodeError={decodeError}
        includeLinks={includeLinks}
        proposalActionConfig={proposalActionConfig}
      />
      <ProposalActionData
        daoChain={daoChain}
        daoId={daoId}
        proposal={proposal}
        actionData={actionData}
        actionsMeta={actionsMeta}
        decodeError={decodeError}
        proposalActionConfig={proposalActionConfig}
      />
    </>
  );
};
