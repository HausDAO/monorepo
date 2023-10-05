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

export const PROPOSAL_TYPE_WARNINGS: Record<ProposalTypeIds | string, string> =
  {
    SIGNAL: 'Proposal for DAO voting signal. No transactions are executed.',
    ISSUE: 'Proposal issues voting or non-voting tokens from the DAO.',
    TRANSFER_ERC20: 'Proposal transfers ERC-20 tokens from a DAO safe.',
    TRANSFER_NETWORK_TOKEN: 'Proposal transfers native tokens from a DAO safe.',
    ADD_SHAMAN: 'Proposal grants DAO permissions to an external contract.',
    UPDATE_GOV_SETTINGS:
      'Proposal updates DAO proposal timing or advanced governance settings.',
    TOKEN_SETTINGS:
      'Proposal updates DAO voting or non-voting token transferability settings.',
    TOKENS_FOR_SHARES:
      'Proposal issues voting or non-voting tokens from the DAO.',
    GUILDKICK: 'Proposal transfers DAO voting tokens into non-voting tokens.',
    WALLETCONNECT:
      'Proposal interacts with external contracts and applications.',
    ADD_SIGNER:
      'Proposal adds a signer to one of the DAO non-ragequittable safes',
    MULTICALL: 'Proposal bundles a multiple actions to be executed in batch',
    ERROR_CANNOT_DECODE:
      'Cannot decode contract details for this proposal. Please proceed with extreme caution!',
    ERROR_UNKOWN:
      'Cannot verify contract details for this proposal. Please proceed with extreme caution!',
  };

export const SENSITIVE_PROPOSAL_TYPES: Partial<
  Record<ProposalTypeIds, boolean>
> = {
  ADD_SHAMAN: true,
};

export const DAO_METHOD_TO_PROPOSAL_TYPE: Record<string, ProposalTypeIds> = {
  setShamans: ProposalTypeIds.AddShaman,
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

export const GAS_BUFFER_MULTIPLIER = 5;
// Adding to the gas limit to account for cost of processProposal
export const PROCESS_PROPOSAL_GAS_LIMIT_ADDITION = 150000;
export const L2_ADDITIONAL_GAS = 5000000;