import React, { useMemo } from 'react';
import { useDaoProposal } from '@daohaus/moloch-v3-hooks';
import { buildProposalHistory, ProposalHistoryElement } from '../../utils';
import { getNetwork, Keychain } from '@daohaus/keychain-utils';
import { ProposalHistoryCard } from './ProposalHistoryCard';
import { HistoryListContainer } from './ProposalHistory.styles';

type ProposalHistoryProps = {
  proposalId: string;
  daoChain: string;
  daoId: string;
  includeLinks?: boolean;
  graphApiKeys?: Keychain;
};

export const ProposalHistory = ({
  proposalId,
  daoChain,
  daoId,
  includeLinks = false,
  graphApiKeys,
}: ProposalHistoryProps) => {
  // 1. react icons - manually add as assets?
  // 2. member card profile fetch from jord's next pr

  const { proposal } = useDaoProposal({
    proposalId,
    daoChain: daoChain as keyof Keychain,
    daoId,
    graphApiKeys,
  });

  const historyData: ProposalHistoryElement[] | null = useMemo(() => {
    if (!proposal || !daoChain) return null;
    return buildProposalHistory({
      proposal,
      networkData: getNetwork(daoChain),
    });
  }, [proposal, daoChain]);

  if (!proposal || !daoChain || !daoId || !historyData) return null;

  return (
    <HistoryListContainer>
      {historyData.map((element) => {
        return (
          <ProposalHistoryCard
            proposal={proposal}
            element={element}
            key={element.title}
            daoChain={daoChain}
            daoId={daoId}
            includeLinks={includeLinks}
          />
        );
      })}
    </HistoryListContainer>
  );
};
