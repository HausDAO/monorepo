import { ReactSetter } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';

import {
  FindMemberQuery,
  findMember,
  MolochV3Proposal,
  findProposal,
} from '@daohaus/moloch-v3-data';
import { ErrorMessage } from '@daohaus/ui';

export const loadMember = async ({
  daoid,
  daochain,
  address,
  setMember,
  setMemberLoading,
  shouldUpdate,
}: {
  daoid: string;
  daochain: keyof Keychain;
  address: string;
  setMember: ReactSetter<FindMemberQuery['member'] | undefined>;
  setMemberLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
}) => {
  try {
    setMemberLoading(true);
    const memberRes = await findMember({
      networkId: daochain,
      dao: daoid,
      memberAddress: address.toLowerCase(),
      graphApiKeys: {
        '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'],
        '0x64': process.env['NX_GRAPH_API_KEY_MAINNET'],
      },
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
}: {
  daoid: string;
  daochain: keyof Keychain;
  proposalId: string;
  setProposal: ReactSetter<MolochV3Proposal | undefined>;
  setProposalLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
  connectedAddress?: string | null;
}) => {
  try {
    setProposalLoading(true);
    const res = await findProposal({
      networkId: daochain,
      dao: daoid,
      proposalId: proposalId.toLowerCase(),
      connectedAddress,
      graphApiKeys: {
        '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'],
        '0x64': process.env['NX_GRAPH_API_KEY_MAINNET'],
      },
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

export const isActiveMember = async ({
  daoid,
  daochain,
  address,
  setMemberLoading,
}: {
  daoid: string;
  daochain: keyof Keychain;
  address: string;
  setMemberLoading: ReactSetter<boolean>;
}): Promise<{ member?: FindMemberQuery['member']; error?: ErrorMessage }> => {
  try {
    setMemberLoading(true);
    const memberRes = await findMember({
      networkId: daochain,
      dao: daoid,
      memberAddress: address.toLowerCase(),
      graphApiKeys: {
        '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'],
        '0x64': process.env['NX_GRAPH_API_KEY_MAINNET'],
      },
    });

    if (
      memberRes?.data?.member &&
      Number(memberRes?.data?.member?.shares) > 0
    ) {
      return {
        member: memberRes.data.member,
      };
    }
    if (memberRes?.data?.member && Number(memberRes?.data?.member?.loot) > 0) {
      return {
        member: memberRes.data.member,
        error: {
          type: 'error',
          message: `Member doesn't own any shares`,
        },
      };
    }
    return {
      error: {
        type: 'error',
        message: `Member not found`,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: {
        type: 'error',
        message: `${error}`,
      },
    };
  } finally {
    setMemberLoading(false);
  }
};
