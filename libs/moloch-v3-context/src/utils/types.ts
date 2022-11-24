import { Ordering, Paging } from '@daohaus/data-fetch-utils';
import {
  MolochV3Dao,
  FindMemberQuery,
  MolochV3ProposalListQuery,
  ListConnectedMemberProposalsQuery,
  ListMembersQuery,
  Member_Filter,
  Member_OrderBy,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/moloch-v3-data';
import { Dispatch, SetStateAction } from 'react';

export type TMembers = ListMembersQuery['members'];
export type TProposals = MolochV3ProposalListQuery['proposals'];
export type TMembership = FindMemberQuery['member'];

export type MolochV3ContextDaoType = {
  dao: MolochV3Dao | null | undefined;
  isDaoLoading: boolean;
  refreshDao: () => Promise<void>;
  refreshAll: () => Promise<void>;
};

export type MolochV3ContextConnectedMembershipType = {
  connectedMembership: FindMemberQuery['member'] | null | undefined;
  isConnectedMembershipLoading: boolean;
  refreshConnectedMembership: () => Promise<void>;
  connectedMembershipProposalVotes:
    | ListConnectedMemberProposalsQuery['proposals']
    | null
    | undefined;
  isConnectedMembershipProposalVotesLoading: boolean;
  refreshConnectedMembershipProposalVotes: () => Promise<void>;
};

export type MolochV3ContextMembersType = {
  members: ListMembersQuery['members'] | null | undefined;
  setMembers: Dispatch<SetStateAction<ListMembersQuery['members'] | undefined>>;
  isMembersLoading: boolean;
  refreshMembers: () => Promise<void>;
  membersFilter: Member_Filter | undefined;
  setMembersFilter: Dispatch<SetStateAction<Member_Filter | undefined>>;
  membersSort: Ordering<Member_OrderBy> | undefined;
  setMembersSort: Dispatch<
    SetStateAction<Ordering<Member_OrderBy> | undefined>
  >;
  membersPaging: Paging | undefined;
  membersNextPaging: Paging | undefined;
  setMembersPaging: Dispatch<SetStateAction<Paging | undefined>>;
  getNextPage: (entity: string) => Promise<void>;
  // loadMoreMembers: () => Promise<void>;
};

export type MolochV3ContextProposalsType = {
  proposals: MolochV3ProposalListQuery['proposals'] | null | undefined;
  setProposals: Dispatch<
    SetStateAction<MolochV3ProposalListQuery['proposals'] | undefined>
  >;
  isProposalsLoading: boolean;
  refreshProposals: () => Promise<void>;
  proposalsFilter: Proposal_Filter | undefined;
  setProposalsFilter: Dispatch<SetStateAction<Proposal_Filter | undefined>>;
  proposalsSort: Ordering<Proposal_OrderBy> | undefined;
  setProposalsSort: Dispatch<
    SetStateAction<Ordering<Proposal_OrderBy> | undefined>
  >;
  proposalsPaging: Paging | undefined;
  proposalsNextPaging: Paging | undefined;
  setProposalsPaging: Dispatch<SetStateAction<Paging | undefined>>;
  getNextPage: (entity: string) => Promise<void>;
};

export interface MolochV3ContextType
  extends MolochV3ContextDaoType,
    MolochV3ContextConnectedMembershipType,
    MolochV3ContextMembersType,
    MolochV3ContextProposalsType {}
