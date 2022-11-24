import { Keychain } from '@daohaus/keychain-utils';
import {
  FindProposalQuery,
  ListProposalsQuery,
} from '../subgraph/queries/proposals.generated';
import { Ordering } from '@daohaus/data-fetch-utils';

export interface ICrossNetworkMemberListArguments<
  TOrderBy extends string,
  DaoVariables,
  MemberVariables
> {
  networkIds: Array<keyof Keychain>;
  memberAddress: string;
  daoFilter?: DaoVariables;
  memberFilter?: MemberVariables;
  ordering?: Ordering<TOrderBy>;
  graphApiKeys: Keychain;
}

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
