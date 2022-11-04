export type ProposalStatus =
  | 'Unsponsored'
  | 'Voting'
  | 'Grace'
  | 'Expired'
  | 'Cancelled'
  | 'Ready for Execution'
  | 'Failed'
  | 'Passed'
  | 'Execution Failed'
  | 'Unknown';

export const PROPOSAL_STATUS: { [index: string]: ProposalStatus } = {
  unsponsored: 'Unsponsored',
  voting: 'Voting',
  grace: 'Grace',
  expired: 'Expired',
  cancelled: 'Cancelled',
  needsProcessing: 'Ready for Execution',
  failed: 'Failed',
  passed: 'Passed',
  actionFailed: 'Execution Failed',
  unknown: 'Unknown',
};

export const ENCODED_0X0_DATA =
  '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
