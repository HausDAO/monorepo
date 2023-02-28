import { useMemo, useState } from 'react';

import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { ACTION_TX } from '@daohaus/moloch-v3-legos';
import { useDHConnect } from '@daohaus/connect';
import { useTxBuilder } from '@daohaus/tx-builder';
import {
  handleErrorMessage,
  isGovernor,
  PROPOSAL_STATUS,
  TXLego,
} from '@daohaus/utils';
import { GatedButton, Spinner, useToast } from '@daohaus/ui';

export const CancelProposal = ({
  proposal,
  onSuccess,
}: {
  proposal: MolochV3Proposal;
  onSuccess: () => void;
}) => {
  const { daoChain } = useCurrentDao();
  const { dao, isLoading: isLoadingDao, refetch } = useDaoData();
  const { chainId, address } = useDHConnect();
  const { fireTransaction } = useTxBuilder();
  const { errorToast, defaultToast, successToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
          refetch();
          onSuccess();
        },
      },
    });
  };

  const daoExists = !dao && !isLoadingDao ? 'DAO does not exist' : true;

  const isConnectedToDao =
    chainId === daoChain
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
      rules={[daoExists, isConnectedToDao, addressCanCancel]}
      onClick={handleCancel}
      // centerAlign
    >
      {isLoading ? <Spinner size="2rem" strokeWidth=".2rem" /> : 'Cancel'}
    </GatedButton>
  );
};
