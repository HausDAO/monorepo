import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  handleErrorMessage,
  isGovernor,
  PROPOSAL_STATUS,
  TXLego,
} from '@daohaus/utils';
import { ITransformedProposal } from '@daohaus/moloch-v3-data';
import { useHausConnect } from '@daohaus/connect';
import { useTxBuilder } from '@daohaus/tx-builder';
import { Spinner, useToast } from '@daohaus/ui';
import { useDao } from '@daohaus/moloch-v3-context';

import { ACTION_TX } from '../legos/tx';
import { GatedButton } from './proposalCards/GatedButton';

export const CancelProposal = ({
  proposal,
  onSuccess,
}: {
  proposal: ITransformedProposal;
  onSuccess: () => void;
}) => {
  const { daochain } = useParams();
  const { fireTransaction } = useTxBuilder();
  const { chainId, address } = useHausConnect();
  const { errorToast, defaultToast, successToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { dao, refreshAll } = useDao();

  const handleCancel = () => {
    const { proposalId } = proposal;

    if (!proposalId) return;
    setIsLoading(true);
    fireTransaction({
      tx: { ...ACTION_TX.CANCEL, staticArgs: [proposalId] } as TXLego,
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Cancel Failed', description: errMsg });
          setIsLoading(false);
        },
        onTxSuccess: () => {
          defaultToast({
            title: 'Cancel Success',
            description: 'Please wait for subgraph to sync',
          });
        },
        onPollError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Poll Error', description: errMsg });
          setIsLoading(false);
        },
        onPollSuccess: () => {
          successToast({
            title: 'Cancel Success',
            description: 'Proposal cancelled',
          });
          setIsLoading(false);
          refreshAll();
          onSuccess();
        },
      },
    });
  };

  const isConnectedToDao =
    chainId === daochain
      ? true
      : 'You are not connected to the same network as the DAO';

  const addressCanCancel = useMemo(() => {
    const isProposer =
      proposal.createdBy.toLowerCase() === address?.toLowerCase();

    const sponsorBelowThreshold =
      Number(proposal.sponsorMembership?.shares) <
      Number(dao?.sponsorThreshold);

    const isGovernorShaman = dao?.shamen?.some((shaman) => {
      return (
        shaman.shamanAddress.toLowerCase() === address?.toLowerCase() &&
        isGovernor(shaman.permissions)
      );
    });

    return isProposer || sponsorBelowThreshold || isGovernorShaman
      ? true
      : `Proposal can only be cancelled by the proposer, by a governance shaman or if the sponsor's voting token balance has fallen below the sponsor threshold`;
  }, [proposal, address, dao]);

  if (proposal.status !== PROPOSAL_STATUS.voting) {
    return null;
  }

  return (
    <GatedButton
      color="secondary"
      rules={[isConnectedToDao, addressCanCancel]}
      onClick={handleCancel}
      // centerAlign
    >
      {isLoading ? <Spinner size="2rem" strokeWidth=".2rem" /> : 'Cancel'}
    </GatedButton>
  );
};
