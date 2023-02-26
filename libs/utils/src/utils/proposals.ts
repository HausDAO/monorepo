import { PROPOSAL_TYPE_LABELS } from '../constants';

export const getProposalTypeLabel = (
  proposalType: string,
  proposalTypes: Record<string, string> = PROPOSAL_TYPE_LABELS
) => proposalTypes?.[proposalType] || 'Unknown Proposal Type';
