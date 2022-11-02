import { Member_OrderBy } from '@daohaus/dao-data';
import { useContext } from 'react';
import { DaoContext, defaultDaoData } from '../DaoContext';
import { DaoConnectMembersType } from '../utils/types';

type MembersHookTypes = {
  loadMoreMembers: () => Promise<void>;
  sortMembers: (
    orderBy: Member_OrderBy,
    orderDirection: 'asc' | 'desc'
  ) => Promise<void>;
};

export const useMembers = (): DaoConnectMembersType & MembersHookTypes => {
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
  } = useContext(DaoContext);

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
