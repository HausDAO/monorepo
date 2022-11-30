import { useContext } from 'react';
import { MolochV3DaoContext } from '../MolochV3DaoContext';
import {
  Member_Filter,
  Member_OrderBy,
  MolochV3Members,
} from '@daohaus/moloch-v3-data';
import { fetchMembersList } from '../utils';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { Ordering, Paging } from '@daohaus/data-fetch-utils';

type MolochV3DaoContextMembersType = {
  members: MolochV3Members | undefined;
  filter: Member_Filter | undefined;
  filterMembers: (filter: Member_Filter) => Promise<void>;
  sort: Ordering<Member_OrderBy> | undefined;
  sortMembers: (ordering: Ordering<Member_OrderBy>) => Promise<void>;
  paging: { current: Paging | undefined; next: Paging | undefined };
  loadNextPage: () => Promise<void>;
  refreshMembers: () => Promise<void>;
};

export const useMembers = (): MolochV3DaoContextMembersType => {
  const { daoData, daoid, daochain, graphApiKeys, setDaoData } =
    useContext(MolochV3DaoContext);

  const filterMembers = async (filter: Member_Filter) => {
    if (daoid && daochain) {
      const res = await fetchMembersList({
        filter: { dao: daoid, ...filter },
        ordering: daoData?.members?.ordering,
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      setDaoData((prevState) => {
        return { ...prevState, members: res };
      });
    }
  };

  const sortMembers = async (ordering: Ordering<Member_OrderBy>) => {
    if (daoid && daochain) {
      console.log('ordering', ordering);
      const res = await fetchMembersList({
        filter: daoData?.members?.filter || { dao: daoid },
        ordering: ordering,
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      setDaoData((prevState) => {
        return { ...prevState, members: res };
      });
    }
  };

  const loadNextPage = async () => {
    if (daoid && daochain) {
      const res = await fetchMembersList({
        filter: daoData?.members?.filter || { dao: daoid },
        ordering: daoData?.members?.ordering,
        paging: daoData?.members?.nextPaging,
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      setDaoData((prevState) => {
        const prevItems = prevState.members ? [...prevState.members.items] : [];

        return {
          ...prevState,
          members: {
            ...res,
            items: res ? [...prevItems, ...res.items] : [],
          },
        };
      });
    }
  };

  const refreshMembers = async () => {
    if (daoid && daochain) {
      const res = await fetchMembersList({
        filter: { dao: daoid },
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      setDaoData((prevState) => {
        return { ...prevState, members: res };
      });
    }
  };

  return {
    members: daoData?.members?.items,
    filter: daoData?.members?.filter,
    filterMembers,
    sort: daoData?.members?.ordering,
    sortMembers,
    paging: {
      current: daoData?.members?.previousPaging,
      next: daoData?.members?.nextPaging,
    },
    loadNextPage,
    refreshMembers,
  };
};
