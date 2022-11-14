import {
  AccountProfile,
  DaoTokenBalances,
  ITransformedMembership,
  TokenBalance,
  votingPowerPercentage,
} from '@daohaus/utils';
import {
  ITransformedProposal,
  IFindQueryResult,
  QueryProposal,
  ListMembershipsQuery,
  DaoProfile,
  ListDaosQuery,
  LensProfile,
  ENSDomain,
} from '../types';
import { getProposalStatus } from './proposalsStatus';

export const transformProposal = (
  proposal: QueryProposal
): ITransformedProposal => {
  return {
    ...proposal,
    status: getProposalStatus(proposal),
  };
};

export const transformProfile = ({
  address,
  lensProfile,
  ensDomain,
}: {
  address: string;
  lensProfile?: LensProfile;
  ensDomain?: ENSDomain;
}): AccountProfile => {
  return {
    address,
    name: lensProfile?.name,
    ens: ensDomain?.domain?.name || lensProfile?.onChainIdentity?.ens?.name,
    image:
      lensProfile?.picture?.__typename === 'MediaSet'
        ? `https://daohaus.mypinata.cloud/ipfs/${lensProfile.picture.original.url.match(
            /Qm[a-zA-Z0-9/.]+/
          )}`
        : '',
    description: lensProfile?.bio,
    lensHandle: lensProfile?.handle,
    lensId: lensProfile?.id,
  };
};

export const transformTokenBalances = (
  tokenBalanceRes: TokenBalance[],
  safeAddress: string
): DaoTokenBalances => {
  // total all vaults + hydrate vault with thier token balances
  const fiatTotal = tokenBalanceRes.reduce(
    (sum: number, balance: TokenBalance): number => {
      sum += Number(balance.fiatBalance);
      return sum;
    },
    0
  );

  return { safeAddress, tokenBalances: tokenBalanceRes, fiatTotal };
};

export const transformMembershipList = (
  memberships: IFindQueryResult<ListMembershipsQuery>[]
): ITransformedMembership[] => {
  return memberships.reduce((list: ITransformedMembership[], network) => {
    if (network?.data?.daos) {
      const daos: ITransformedMembership[] = network?.data?.daos.map(
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
