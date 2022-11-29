import {
  FindMemberQuery,
  ListMembersQuery,
} from '../subgraph/queries/members.generated';

export type MolochV3Member =
  | ListMembersQuery['members']
  | FindMemberQuery['member'];
