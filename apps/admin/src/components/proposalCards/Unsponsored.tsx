import {
  fromWei,
  handleErrorMessage,
  isNumberish,
  TXLego,
} from '@daohaus/utils';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { useDHConnect } from '@daohaus/connect';
import { useTxBuilder } from '@daohaus/tx-builder';
import {
  Italic,
  ParSm,
  Spinner,
  useBreakpoint,
  useToast,
  widthQuery,
} from '@daohaus/ui';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useConnectedMembership, useDao } from '@daohaus/moloch-v3-context';
import { PROP_CARD_HELP } from '../../data/copy';
import { ACTION_TX } from '../../legos/tx';
import { VotingBar } from '../VotingBar';
import { ActionTemplate } from './ActionPrimitives';
import { GatedButton } from './GatedButton';
import { ActionLifeCycleFns } from '../../utils/general';

export const Unsponsored = ({
  lifeCycleFnsOverride,
  proposal,
}: {
  lifeCycleFnsOverride?: ActionLifeCycleFns;
  proposal: MolochV3Proposal;
}) => {
  const { daochain } = useParams();
  const { fireTransaction } = useTxBuilder();
  const { connectedMembership } = useConnectedMembership();
  const { chainId } = useDHConnect();
  const { errorToast, defaultToast, successToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { dao, refreshAll } = useDao();
  const isMobile = useBreakpoint(widthQuery.sm);

  const theme = useTheme();

  const handleSponsor = () => {
    const { proposalId } = proposal;

    if (!proposalId) return;
    setIsLoading(true);
    lifeCycleFnsOverride?.onActionTriggered?.();
    fireTransaction({
      tx: { ...ACTION_TX.SPONSOR, staticArgs: [proposalId] } as TXLego,
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Sponsor Failed', description: errMsg });
          lifeCycleFnsOverride?.onTxError?.(error);
          setIsLoading(false);
        },
        onTxSuccess: (txHash: string) => {
          defaultToast({
            title: 'Sponsor Success',
            description: 'Please wait for subgraph to sync',
          });
          lifeCycleFnsOverride?.onTxSuccess?.(txHash);
        },
        onPollError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: 'Poll Error', description: errMsg });
          lifeCycleFnsOverride?.onPollError?.(error);
          setIsLoading(false);
        },
        onPollSuccess: () => {
          successToast({
            title: 'Sponsor Success',
            description: 'Proposal sponsored',
          });
          refreshAll();
          lifeCycleFnsOverride?.onPollSuccess?.(undefined);
          setIsLoading(false);
        },
      },
    });
  };

  const hasShares = useMemo(() => {
    if (
      dao &&
      isNumberish(connectedMembership?.shares) &&
      isNumberish(dao.sponsorThreshold)
    ) {
      return Number(connectedMembership?.shares) >=
        Number(dao?.sponsorThreshold)
        ? true
        : `${fromWei(
            dao.sponsorThreshold
          )} voting stake tokens are required to sponsor this proposal.`;
    }
    return 'Subgraph data not loading or is not in sync';
  }, [dao, connectedMembership]);

  const isConnectedToDao =
    chainId === daochain
      ? true
      : 'You are not connected to the same network as the DAO';

  return (
    <ActionTemplate
      statusDisplay="Needs a Sponsor"
      proposal={proposal}
      main={
        <>
          <VotingBar proposal={proposal} />
          <GatedButton
            size="sm"
            rules={[hasShares, isConnectedToDao]}
            onClick={handleSponsor}
            fullWidth={isMobile}
          >
            {isLoading ? (
              <Spinner size="2rem" strokeWidth=".2rem" />
            ) : (
              'Sponsor Proposal'
            )}
          </GatedButton>
        </>
      }
      helperDisplay={
        <ParSm color={theme.secondary.step11}>
          <Italic>{PROP_CARD_HELP.UNSPONSORED}</Italic>
        </ParSm>
      }
    />
  );
};
