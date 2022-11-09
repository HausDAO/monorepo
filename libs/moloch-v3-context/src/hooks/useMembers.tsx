import { Member_OrderBy } from '@daohaus/moloch-v3-data';
import { useContext } from 'react';
import { MolochV3Context, defaultDaoData } from '../MolochV3Context';
import { MolochV3ContextMembersType } from '../utils/types';

type MembersHookTypes = {
  loadMoreMembers: () => Promise<void>;
  sortMembers: (
    orderBy: Member_OrderBy,
    orderDirection: 'asc' | 'desc'
  ) => Promise<void>;
};

export const useMembers = (): MolochV3ContextMembersType & MembersHookTypes => {
  const {
    members,
    setMembers,
    isMembersLoading,
    refreshMembers,
    membersFilter,
    setMembersFilter,
    membersSort,
    setMembersSort,
    membersPaging,
    setMembersPaging,
    membersNextPaging,
    getNextPage,
  } = useContext(MolochV3Context);

  const loadMoreMembers = async () => {
    setMembersPaging(membersNextPaging);
  };

  const sortMembers = async (
    orderBy: Member_OrderBy,
    orderDirection: 'asc' | 'desc'
  ) => {
    setMembersSort({ orderBy, orderDirection });
    setMembersPaging(defaultDaoData.membersPaging);
    setMembers(undefined);
  };

  return {
    members,
    setMembers,
    isMembersLoading,
    refreshMembers,
    membersFilter,
    setMembersFilter,
    membersSort,
    setMembersSort,
    membersPaging,
    setMembersPaging,
    membersNextPaging,
    getNextPage,
    loadMoreMembers,
    sortMembers,
  };
};
