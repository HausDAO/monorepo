import {
  FindMemberQuery,
  ListMembersQuery,
} from '../subgraph/queries/members.generated';

export type MolochV3Members = ListMembersQuery['members'];
export type MolochV3Member = FindMemberQuery['member'];
