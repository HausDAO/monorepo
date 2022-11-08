import { useContext } from 'react';
import { MolochV3Context } from '../MolochV3Context';
import { MolochV3ContextConnectedMembershipType } from '../utils/types';

export const useConnectedMembership =
  (): MolochV3ContextConnectedMembershipType => {
    const {
      connectedMembership,
      isConnectedMembershipLoading,
      refreshConnectedMembership,
      connectedMembershipProposalVotes,
      isConnectedMembershipProposalVotesLoading,
      refreshConnectedMembershipProposalVotes,
    } = useContext(MolochV3Context);
    return {
      connectedMembership,
      isConnectedMembershipLoading,
      refreshConnectedMembership,
      connectedMembershipProposalVotes,
      isConnectedMembershipProposalVotesLoading,
      refreshConnectedMembershipProposalVotes,
    };
  };
