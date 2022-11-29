import { ReactSetter } from '@daohaus/utils';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';

import {
  MolochV3Dao,
  findDao,
  findMember,
  FindMemberQuery,
  findProposal,
  ListConnectedMemberProposalsQuery,
  listMembers,
  ListMembersQuery,
  listProposals,
  listProposalVotesByMember,
  Member_Filter,
  Member_OrderBy,
  Proposal_Filter,
  Proposal_OrderBy,
  MolochV3Proposal,
} from '@daohaus/moloch-v3-data';
import deepEqual from 'deep-eql';
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
  //need some proposal info here... or can we use default?

  const memberRes = await fetchMember({
    daoid,
    daochain,
    address,
    graphApiKeys,
  });

  return {
    connectedMembership: memberRes,
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

// pre 11/28

export const loadDao = async ({
  daoid,
  daochain,
  setDao,
  setDaoLoading,
  shouldUpdate,
  graphApiKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  setDao: ReactSetter<MolochV3Dao | undefined>;
  setDaoLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
  graphApiKeys?: Keychain;
}) => {
  try {
    setDaoLoading(true);
    const daoRes = await findDao({
      networkId: daochain,
      dao: daoid,
      includeTokens: true,
      graphApiKeys,
    });

    if (daoRes?.data?.dao && shouldUpdate) {
      setDao(daoRes.data.dao as MolochV3Dao);
    }
  } catch (error) {
    console.error(error);
    setDao(undefined);
  } finally {
    if (shouldUpdate) {
      setDaoLoading(false);
    }
  }
};

export const loadMember = async ({
  daoid,
  daochain,
  address,
  setMember,
  setMemberLoading,
  shouldUpdate,
  graphApiKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  address: string;
  setMember: ReactSetter<FindMemberQuery['member'] | undefined>;
  setMemberLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
  graphApiKeys?: Keychain;
}) => {
  try {
    setMemberLoading(true);
    const memberRes = await findMember({
      networkId: daochain,
      dao: daoid,
      memberAddress: address.toLowerCase(),
      graphApiKeys,
    });

    if (memberRes?.data?.member && shouldUpdate) {
      setMember(memberRes.data.member);
    } else if (shouldUpdate) {
      setMember(undefined);
    }
  } catch (error) {
    console.error(error);
    setMember(undefined);
  } finally {
    if (shouldUpdate) {
      setMemberLoading(false);
    }
  }
};

export const loadProposal = async ({
  daoid,
  daochain,
  proposalId,
  setProposal,
  setProposalLoading,
  shouldUpdate,
  connectedAddress,
  graphApiKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  proposalId: string;
  setProposal: ReactSetter<MolochV3Proposal | undefined>;
  setProposalLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
  connectedAddress?: string | null;
  graphApiKeys?: Keychain;
}) => {
  try {
    setProposalLoading(true);
    const res = await findProposal({
      networkId: daochain,
      dao: daoid,
      proposalId: proposalId.toLowerCase(),
      connectedAddress,
      graphApiKeys,
    });

    if (res?.data?.proposal && shouldUpdate) {
      setProposal(res.data.proposal);
    } else if (shouldUpdate) {
      setProposal(undefined);
    }
  } catch (error) {
    console.error(error);
    setProposal(undefined);
  } finally {
    if (shouldUpdate) {
      setProposalLoading(false);
    }
  }
};

export const loadMembersList = async ({
  filter,
  ordering,
  paging,
  daochain,
  setData,
  setLoading,
  setNextPaging,
  shouldUpdate,
  graphApiKeys,
}: {
  filter: Member_Filter;
  ordering?: Ordering<Member_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  setData: ReactSetter<ListMembersQuery['members'] | undefined>;
  setLoading: ReactSetter<boolean>;
  setNextPaging: ReactSetter<Paging | undefined>;
  shouldUpdate: boolean;
  graphApiKeys?: Keychain;
}) => {
  try {
    setLoading(true);
    const res = await listMembers({
      networkId: daochain,
      filter,
      ordering,
      paging,
      graphApiKeys,
    });

    if (shouldUpdate) {
      setNextPaging(res.nextPaging);

      setData((prevState) => {
        if (deepEqual(prevState, res.items)) return res.items;
        if (prevState) {
          return [...prevState, ...res.items];
        } else {
          return res.items;
        }
      });
    }
  } catch (error) {
    console.error(error);
    setData(undefined);
  } finally {
    if (shouldUpdate) {
      setLoading(false);
    }
  }
};

export const loadProposalsList = async ({
  filter,
  ordering,
  paging,
  daochain,
  setData,
  setLoading,
  setNextPaging,
  shouldUpdate,
  graphApiKeys,
}: {
  filter: Proposal_Filter;
  ordering?: Ordering<Proposal_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  setData: ReactSetter<MolochV3Proposal[] | undefined>;
  setLoading: ReactSetter<boolean>;
  setNextPaging: ReactSetter<Paging | undefined>;
  shouldUpdate: boolean;
  graphApiKeys?: Keychain;
}) => {
  try {
    setLoading(true);
    const res = await listProposals({
      networkId: daochain,
      filter,
      ordering,
      paging,
      graphApiKeys,
    });

    if (shouldUpdate) {
      setNextPaging(res.nextPaging);

      setData((prevState) => {
        if (deepEqual(prevState, res.items)) return res.items;
        if (prevState) {
          return [...prevState, ...res.items];
        } else {
          return res.items;
        }
      });
    }
  } catch (error) {
    console.error(error);
    setData(undefined);
  } finally {
    if (shouldUpdate) {
      setLoading(false);
    }
  }
};

export const loadConnectedMemberVotesList = async ({
  filter,
  ordering,
  paging,
  daochain,
  setData,
  setLoading,
  shouldUpdate,
  memberAddress,
  graphApiKeys,
}: {
  filter: Proposal_Filter;
  ordering?: Ordering<Proposal_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  setData: ReactSetter<
    ListConnectedMemberProposalsQuery['proposals'] | undefined
  >;
  setLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
  memberAddress: string;
  graphApiKeys?: Keychain;
}) => {
  try {
    setLoading(true);
    const res = await listProposalVotesByMember({
      networkId: daochain,
      filter,
      ordering,
      paging,
      memberAddress,
      graphApiKeys,
    });
    if (shouldUpdate) {
      setData((prevState) => {
        if (deepEqual(prevState, res.items)) return res.items;
        if (prevState) {
          return [...prevState, ...res.items];
        } else {
          return res.items;
        }
      });
    }
  } catch (error) {
    console.error(error);
    setData(undefined);
  } finally {
    if (shouldUpdate) {
      setLoading(false);
    }
  }
};
