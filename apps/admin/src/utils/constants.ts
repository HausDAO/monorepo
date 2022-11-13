export const PROPOSAL_FILTERS: { [key: string]: string } = {
  unsponsored: 'Unsponsored',
  voting: 'In Voting',
  grace: 'In Grace',
  needsProcessing: 'Ready to Execute',
  passed: 'Passed',
  actionFailed: 'Action Failed',
  failed: 'Defeated',
  expired: 'Expired',
};

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
}

export const PROPOSAL_TYPE_LABELS: { [key: string]: string } = {
  SIGNAL: 'Signal Proposal',
  ISSUE: 'Issue Tokens Proposal',
  ADD_SHAMAN: 'Manage Shaman Proposal',
  TRANSFER_ERC20: 'Issue ERC20 Token Funding Proposal',
  TRANSFER_NETWORK_TOKEN: 'Issue Network Token Funding Proposal',
  UPDATE_GOV_SETTINGS: 'Governance Settings Proposal',
  TOKEN_SETTINGS: 'Token Settings Proposal',
  TOKENS_FOR_SHARES: 'Shares for Tokens Proposal',
  GUILDKICK: 'Guildkick Proposal',
  WALLETCONNECT: 'WalletConnect Proposal',
};

export const PROPOSAL_TYPE_WARNINGS: { [key: string]: string } = {
  SIGNAL:
    'This proposal is to signal consent/dissent only. No actions will be executed.',
  ISSUE:
    'This proposal mints or removes tokens for DAO membership. Be sure to look at the contract details for more information.',
  TRANSFER_ERC20:
    'This proposal will transfer funds from the Main Treasury, be sure to look at the contract details for more information.',
  TRANSFER_NETWORK_TOKEN:
    'This proposal will transfer funds from the Main Treasury, be sure to look at the contract details for more information.',
  ADD_SHAMAN:
    'This proposal is adding a Shaman with Share Management permissions to the DAO. Be sure to look at the contract details for more information.',
  UPDATE_GOV_SETTINGS:
    'This proposal will adjust the governance settings for the DAO. Be sure to look at the contract details for more information.',
  TOKEN_SETTINGS:
    'This proposal will adjust the token transferability settings for the DAO. Be sure to look at the contract details for more information.',
  TOKENS_FOR_SHARES:
    'This proposal mints or removes tokens for DAO membership. Be sure to look at the contract details for more information.',
  GUILDKICK:
    'This proposal mints or removes tokens for DAO membership. Be sure to look at the contract details for more information.',
  WALLETCONNECT:
    'This proposal connect your DAO Safe to a dApp via WalletConnect and trigger transactions. Be sure to look at the contract details for more information.',
  ERROR_CANNOT_DECODE:
    'We cannot decode the contract details for this proposal. Please proceed with extreme caution!',
  ERROR_UNKOWN:
    'We can’t verify the contract details for this proposal. Please proceed with extreme caution!',
};

export const SENSITIVE_PROPOSAL_TYPES: { [key: string]: boolean } = {
  ADD_SHAMAN: true,
};

export const DAO_METHOD_TO_PROPOSAL_TYPE: { [key: string]: string } = {
  setShamans: ProposalTypeIds.AddShaman,
};

// CONNECT REBUILD
export const RPC_ENDPOINTS = {
  '0x1': `https://${process.env['NX_RIVET_KEY']}.eth.rpc.rivet.cloud/`,
  '0x5': `https://${process.env['NX_RIVET_KEY']}.goerli.rpc.rivet.cloud/`,
  '0x64': 'https://rpc.gnosischain.com/',
  '0xa': '',
  '0x89': '',
  '0xa4b1': '',
  '0xa4ec': '',
};
