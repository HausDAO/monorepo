import { ListProposalsQuery } from '../subgraph/queries/proposals.generated';

export type QueryProposal = ListProposalsQuery['proposals'][number];
export type MolochV3Proposal = QueryProposal & {
  status?: string;
};

export type FindProposalQueryRes = {
  proposal: MolochV3Proposal | undefined;
};
export type ListProposalQueryRes = {
  proposals: MolochV3Proposal[];
};
