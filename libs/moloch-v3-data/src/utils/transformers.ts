import { IFindQueryResult } from '@daohaus/data-fetch-utils';
import {
  DaoTokenBalances,
  MolochV3Membership,
  votingPowerPercentage,
} from '@daohaus/utils';
import {
  QueryProposal,
  ListMembershipsQuery,
  DaoProfile,
  ListDaosQuery,
  MolochV3Proposal,
  FindRecordQuery,
} from '../types';
import { MolochV3Record } from '../types/record.types';
import { getProposalStatus } from './proposalsStatus';

export const transformProposal = (
  proposal: QueryProposal
): MolochV3Proposal => {
  return {
    ...proposal,
    status: getProposalStatus(proposal),
  };
};

export const transformMembershipList = (
  memberships: IFindQueryResult<ListMembershipsQuery>[]
): MolochV3Membership[] => {
  return memberships.reduce((list: MolochV3Membership[], network) => {
    if (network?.data?.daos) {
      const daos: MolochV3Membership[] = network?.data?.daos.map(
        (dao: ListMembershipsQuery['daos'][number]) => {
          return {
            dao: dao.id,
            daoAvatarImg: getDaoAvatarImg(dao),
            name: dao.name,
            safeAddress: dao.safeAddress,
            activeProposalCount: dao.activeProposals?.length || 0,
            totalProposalCount: dao.proposalCount,
            activeMemberCount: dao.activeMemberCount,
            votingPower: votingPowerPercentage(
              dao.totalShares,
              dao.members[0].delegateShares
            ),
            networkId: network.networkId,
            delegatingTo:
              dao.members[0].delegatingTo !== dao.members[0].memberAddress
                ? dao.members[0].delegatingTo
                : undefined,
            isDelegate: Number(dao.members[0].delegateOfCount) > 0,
            memberAddress: dao.members[0].memberAddress,
            contractType: 'Moloch v3',
          };
        }
      );
      return [...list, ...daos];
    } else {
      return list;
    }
  }, []);
};

export const getDaoAvatarImg = (
  dao: ListDaosQuery['daos'][number]
): string | undefined => {
  if (!dao.profile || !dao.profile.length) return;

  const obj = JSON.parse(dao.profile[0].content);

  const avatarUrl =
    obj.avatarImg && obj.avatarImg.match(/Qm[a-zA-Z0-9/.]+/)
      ? `https://daohaus.mypinata.cloud/ipfs/${obj.avatarImg.match(
          /Qm[a-zA-Z0-9/.]+/
        )}`
      : obj.avatarImg;

  return avatarUrl;
};

export const addDaoProfileFields = (
  dao: ListDaosQuery['daos'][number]
): DaoProfile | undefined => {
  if (!dao.profile || !dao.profile.length) return;

  try {
    const obj = JSON.parse(dao.profile[0].content);
    const links =
      obj.links &&
      obj.links.map((linkObj: string) => {
        return typeof linkObj === 'string' ? JSON.parse(linkObj) : {};
      });

    const avatarUrl = getDaoAvatarImg(dao);

    return {
      description: obj.description,
      longDescription: obj.longDescription,
      avatarImg: avatarUrl,
      tags: obj.tags,
      links,
    };
  } catch (e) {
    console.log('daoprofile parsing error', e);
    return;
  }
};

export const addParsedContent = (
  record?: FindRecordQuery['record']
): MolochV3Record | undefined => {
  if (record?.contentType === 'json') {
    try {
      const obj = JSON.parse(record.content);
      return { ...record, parsedContent: obj };
    } catch (e) {
      console.log('err', e);
      return;
    }
  }
  return record;
};
