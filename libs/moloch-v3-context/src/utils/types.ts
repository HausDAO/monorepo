import {
  DaoWithTokenDataQuery,
  FindMemberQuery,
  ITransformedProposalListQuery,
  ListConnectedMemberProposalsQuery,
  ListMembersQuery,
  Member_Filter,
  Member_OrderBy,
  Ordering,
  Paging,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/moloch-v3-data';
import { Dispatch, SetStateAction } from 'react';

export type TDao = DaoWithTokenDataQuery['dao'];
export type TMembers = ListMembersQuery['members'];
export type TProposals = ITransformedProposalListQuery['proposals'];
export type TMembership = FindMemberQuery['member'];

export type DaoConnectDaoType = {
  dao: DaoWithTokenDataQuery['dao'] | null | undefined;
  isDaoLoading: boolean;
  refreshDao: () => Promise<void>;
  refreshAll: () => Promise<void>;
};

export type DaoConnectConnectedMembershipType = {
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

export type DaoConnectMembersType = {
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

export type DaoConnectProposalsType = {
  proposals: ITransformedProposalListQuery['proposals'] | null | undefined;
  setProposals: Dispatch<
    SetStateAction<ITransformedProposalListQuery['proposals'] | undefined>
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

export interface DaoConnectType
  extends DaoConnectDaoType,
    DaoConnectConnectedMembershipType,
    DaoConnectMembersType,
    DaoConnectProposalsType {}
