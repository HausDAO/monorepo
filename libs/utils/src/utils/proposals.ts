import {
  DAO_METHOD_TO_PROPOSAL_TYPE,
  PROPOSAL_TYPE_WARNINGS,
  SENSITIVE_PROPOSAL_TYPES,
} from '../constants';

export const getSensitiveProposalTypes = (
  proposalTypesOverride?: Record<string, boolean>
): Record<string, boolean> => {
  return {
    ...SENSITIVE_PROPOSAL_TYPES,
    ...proposalTypesOverride,
  };
};

export const getActionToProposalTypeMapping = (
  actionToProposalTypeOverride?: Record<string, string>
) => {
  return {
    ...DAO_METHOD_TO_PROPOSAL_TYPE,
    ...actionToProposalTypeOverride,
  };
};

export const getProposalTypeWarningMapping = (
  proposalTypeWarningOverride?: Record<string, string>
) => {
  return {
    ...PROPOSAL_TYPE_WARNINGS,
    ...proposalTypeWarningOverride,
  };
};
