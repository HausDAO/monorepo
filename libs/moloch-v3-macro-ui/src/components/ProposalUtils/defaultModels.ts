export const PROPOSAL_TYPE_LABELS: Record<string, string> = {
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
export const SENSITIVE_PROPOSAL_TYPES: { [key: string]: boolean } = {
  ADD_SHAMAN: true,
};
