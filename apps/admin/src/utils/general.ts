import { TMembers } from '@daohaus/moloch-v3-context';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { TXLifeCycleFns } from '@daohaus/tx-builder';
import { PROPOSAL_TYPE_LABELS } from './constants';

export type ActionLifeCycleFns = TXLifeCycleFns & {
  onActionTriggered?: () => void;
};

export const missingDaoProfileData = (dao: MolochV3Dao): boolean => {
  if (!dao?.profile || !dao.profile.length) return true;
  return dao.description === '' && dao.avatarImg === '';
};

export const getMemberFromMemberList = (
  members: TMembers,
  memberAddress: string
): TMembers[number] | undefined => {
  const res = members.find(
    (member) =>
      member.memberAddress.toLowerCase() === memberAddress.toLowerCase()
  );

  return res;
};

export const getProposalTypeLabel = (proposalType: string | undefined) => {
  return (
    (proposalType && PROPOSAL_TYPE_LABELS[proposalType]) ||
    'Unknown Proposal Type'
  );
};

export const sortTokensForRageQuit = (tokens: string[]): string[] => {
  return tokens.sort((a, b) => {
    return parseInt(a.slice(2), 16) - parseInt(b.slice(2), 16);
  });
};
