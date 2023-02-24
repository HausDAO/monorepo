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

export enum ProposalTypeIds {
  Signal = 'SIGNAL',
  IssueSharesLoot = 'ISSUE',
  AddShaman = 'ADD_SHAMAN',
  TransferErc20 = 'TRANSFER_ERC20',
  TransferNetworkToken = 'TRANSFER_NETWORK_TOKEN',
  UpdateGovSettings = 'UPDATE_GOV_SETTINGS',
  UpdateTokenSettings = 'TOKEN_SETTINGS',
  TokensForShares = 'TOKENS_FOR_SHARES',
  GuildKick = 'GUILDKICK',
  WalletConnect = 'WALLETCONNECT',
  Multicall = 'MULTICALL',
  AddSigner = 'ADD_SIGNER',
}

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
export const PROPOSAL_TYPE_LABELS: Record<ProposalTypeIds, string> = {
  SIGNAL: 'Signal Proposal',
  ISSUE: 'Token Proposal',
  ADD_SHAMAN: 'Shaman Proposal',
  TRANSFER_ERC20: 'Funding Proposal',
  TRANSFER_NETWORK_TOKEN: 'Funding Proposal',
  UPDATE_GOV_SETTINGS: 'Governance Proposal',
  TOKEN_SETTINGS: 'Token Proposal',
  TOKENS_FOR_SHARES: 'Token Proposal',
  GUILDKICK: 'Token Proposal',
  WALLETCONNECT: 'WalletConnect Proposal',
  MULTICALL: 'Multicall Proposal',
  ADD_SIGNER: 'Add Safe Signer Proposal',
};
export const SENSITIVE_PROPOSAL_TYPES: Partial<
  Record<ProposalTypeIds, boolean>
> = {
  ADD_SHAMAN: true,
};
export const PROP_CARD_HELP = {
  UNSPONSORED: 'A member of the DAO can sponsor this proposal.',
};
export const PROPOSAL_FILTERS: Record<string, string> = {
  unsponsored: 'Unsponsored',
  voting: 'In Voting',
  grace: 'In Grace',
  needsProcessing: 'Ready to Execute',
  passed: 'Passed',
  actionFailed: 'Action Failed',
  failed: 'Defeated',
  expired: 'Expired',
};
