import React, { useMemo } from 'react';
import { MolochV3Proposal } from '@daohaus/moloch-v3-data';
import { useDaoProposal, useCurrentDao } from '@daohaus/moloch-v3-hooks';
import { buildProposalHistory, ProposalHistoryElement } from '../../utils';
import { getNetwork } from '@daohaus/keychain-utils';
import { ProposalHistoryCard } from './ProposalHistoryCard';
import { HistoryListContainer } from './ProposalHistory.styles';

type ProposalHistoryProps = {
  proposal?: MolochV3Proposal;
  daoId?: string;
  daoChain?: string;
};

export const ProposalHistory = ({
  proposal,
  daoId,
  daoChain,
}: ProposalHistoryProps) => {
  // need to discuss

  // 1. when/why to use these vs. props
  // const { proposal } = useDaoProposal();
  // const { daoChain } = useCurrentDao();

  // 2. react icons - manually add as assets?

  // 3. member card profile fetch from jord's next pr

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
          />
        );
      })}
    </HistoryListContainer>
  );
};
