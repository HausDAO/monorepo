import { ReactSetter } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';

import {
  MolochV3Dao,
  findDao,
  findMember,
  FindMemberQuery,
  findProposal,
  MolochV3ProposalListQuery,
  MolochV3ProposalQuery,
  ListConnectedMemberProposalsQuery,
  listMembers,
  ListMembersQuery,
  listProposals,
  listProposalVotesByMember,
  Member_Filter,
  Member_OrderBy,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/moloch-v3-data';
import deepEqual from 'deep-eql';
import { Ordering, Paging } from '@daohaus/data-fetch-utils';

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
  setProposal: ReactSetter<MolochV3ProposalQuery['proposal'] | undefined>;
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
  setData: ReactSetter<MolochV3ProposalListQuery['proposals'] | undefined>;
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
