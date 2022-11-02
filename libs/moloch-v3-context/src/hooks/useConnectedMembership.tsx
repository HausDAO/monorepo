import { useContext } from 'react';
import { DaoContext } from '../DaoContext';
import { DaoConnectConnectedMembershipType } from '../utils/types';

export const useConnectedMembership = (): DaoConnectConnectedMembershipType => {
  const {
    connectedMembership,
    isConnectedMembershipLoading,
    refreshConnectedMembership,
    connectedMembershipProposalVotes,
    isConnectedMembershipProposalVotesLoading,
    refreshConnectedMembershipProposalVotes,
  } = useContext(DaoContext);
  return {
    connectedMembership,
    isConnectedMembershipLoading,
    refreshConnectedMembership,
    connectedMembershipProposalVotes,
    isConnectedMembershipProposalVotesLoading,
    refreshConnectedMembershipProposalVotes,
  };
};
