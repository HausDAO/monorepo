import { ReactSetter } from '@daohaus/utils';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';

import {
  MolochV3Dao,
  findDao,
  findMember,
  listMembers,
  listProposals,
  Member_Filter,
  Member_OrderBy,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/moloch-v3-data';
import { Ordering, Paging } from '@daohaus/data-fetch-utils';

export const fetchDao = async ({
  daoid,
  daochain,
  graphApiKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  graphApiKeys?: Keychain;
}) => {
  try {
    const daoRes = await findDao({
      networkId: daochain,
      dao: daoid,
      includeTokens: true,
      graphApiKeys,
    });

    if (daoRes?.data?.dao) {
      return daoRes.data.dao as MolochV3Dao;
    } else {
      console.error('no dao found');
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchMember = async ({
  daoid,
  daochain,
  address,
  graphApiKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  address: string;
  graphApiKeys?: Keychain;
}) => {
  try {
    const res = await findMember({
      networkId: daochain,
      dao: daoid,
      memberAddress: address.toLowerCase(),
      graphApiKeys,
    });

    if (res?.data?.member) {
      return res.data.member;
    } else {
      console.error('no member found');
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchProposalsList = async ({
  filter,
  ordering,
  paging,
  daochain,
  graphApiKeys,
}: {
  filter: Proposal_Filter;
  ordering?: Ordering<Proposal_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  graphApiKeys?: Keychain;
}) => {
  try {
    const res = await listProposals({
      networkId: daochain,
      filter,
      ordering,
      paging,
      graphApiKeys,
    });
    if (!res) {
      console.error('no proposals found');
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMembersList = async ({
  filter,
  ordering,
  paging,
  daochain,
  graphApiKeys,
}: {
  filter: Member_Filter;
  ordering?: Ordering<Member_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  graphApiKeys?: Keychain;
}) => {
  try {
    const res = await listMembers({
      networkId: daochain,
      filter,
      ordering,
      paging,
      graphApiKeys,
    });
    if (!res) {
      console.error('no members found');
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllDaoData = async ({
  daoid,
  daochain,
  graphApiKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  graphApiKeys?: Keychain;
}) => {
  const daoRes = await fetchDao({
    daoid,
    daochain: daochain as ValidNetwork,
    graphApiKeys,
  });

  const proposalsRes = await fetchProposalsList({
    filter: { dao: daoid },
    daochain: daochain as ValidNetwork,
    graphApiKeys,
  });

  const membersRes = await fetchMembersList({
    filter: { dao: daoid },
    daochain: daochain as ValidNetwork,
    graphApiKeys,
  });

  return {
    dao: daoRes,
    proposals: proposalsRes,
    members: membersRes,
  };
};

export const fetchAllMemberData = async ({
  daoid,
  daochain,
  address,
  graphApiKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  address: string;
  graphApiKeys?: Keychain;
}) => {
  const memberRes = await fetchMember({
    daoid,
    daochain,
    address,
    graphApiKeys,
  });

  return {
    connectedMember: memberRes,
  };
};

export const fetchGeneric = async ({
  daoid,
  daochain,
  graphApiKeys,
  entityName,
}: {
  daoid: string;
  daochain: keyof Keychain;
  graphApiKeys?: Keychain;
  entityName: 'dao' | 'proposals';
}) => {
  if (entityName === 'dao') {
    return fetchDao({ daoid, daochain, graphApiKeys });
  }
};
